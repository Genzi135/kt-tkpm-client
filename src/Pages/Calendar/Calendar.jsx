import axios from "axios";
import { useEffect, useState } from "react";
import HeaderMain from "../../Common/HeaderMain";

export default function Calendar() {
    const [dataSource, setDataSource] = useState(null);
    const [semesters, setSemesters] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [semesterId, setSemesterId] = useState(null);

    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const timeSlots = ["Buổi sáng", "Buổi chiều", "Buổi tối"];

    const getMe = () => {
        return axios({
            url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/students/getMe`,
            headers: { Authorization: `Bearer ${userToken}` },
            method: 'GET'
        });
    };

    const getListSemester = () => {
        return axios({
            url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/semesters`,
            headers: { Authorization: `Bearer ${userToken}` },
            method: 'GET'
        });
    };

    const getEnrollmentsBySemesterId = async (sId) => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/enrollments/semester/${sId}`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'GET',
            });
            console.log('Enrollments:', response.data); // Logging enrollments
            setEnrollments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [meResponse, semesterResponse] = await Promise.all([
                    getMe(),
                    getListSemester()
                ]);

                setDataSource(meResponse.data);
                setSemesters(semesterResponse.data);

                if (semesterResponse.data && semesterResponse.data.length > 0) {
                    const lastSemesterId = semesterResponse.data[semesterResponse.data.length - 1].id;
                    setSemesterId(lastSemesterId);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (semesterId) {
            getEnrollmentsBySemesterId(semesterId);
        }
    }, [semesterId]);

    const getClassTimeSlot = (periodStart) => {
        if (periodStart <= 6) return 0; // Buổi sáng
        if (periodStart <= 12) return 1; // Buổi chiều
        return 2; // Buổi tối
    };

    const renderClassData = (classData, isPractice) => {
        const periodStart = isPractice ? classData.periodStartPractice : classData.periodStart;
        const periodEnd = isPractice ? classData.periodEndPractice : classData.periodEnd;
        const dayOfWeek = isPractice ? classData.dayOfWeekPractice : classData.dayOfWeek;
        const timeSlotIndex = getClassTimeSlot(periodStart);

        return { periodStart, periodEnd, dayOfWeek, timeSlotIndex };
    };

    return (
        <div className="flex-1 justify-center items-center flex-col bg-gray-100 w-[100vw] h-[100vh]">
            {dataSource && (
                <div className="">
                    <HeaderMain data={dataSource} />
                    <div className="mt-4 w-[100vw] h-full flex flex-col justify-center items-center p-5">
                        <h2 className="text-xl font-bold mb-2">Lịch trong tuần</h2>
                        <table className="border-collapse border border-gray-400">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400"></th>
                                    {daysOfWeek.map((day, index) => (
                                        <th key={index} className="border border-gray-400 p-10 text-center">{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map((slot, timeSlotIndex) => (
                                    <tr key={timeSlotIndex}>
                                        <td className="border border-gray-400 p-2 font-bold bg-yellow-200">{slot}</td>
                                        {daysOfWeek.map((day, dayIndex) => (
                                            <td key={dayIndex} className={`border border-gray-400 p-10 bg-blue-100`}>
                                                {enrollments.length > 0 ? enrollments.map((enrollment, idx) => {
                                                    const theoryClass = renderClassData(enrollment.classData, false);
                                                    const practiceClass = renderClassData(enrollment.classData, true);

                                                    return (
                                                        <>
                                                            {theoryClass.timeSlotIndex === timeSlotIndex &&
                                                                theoryClass.dayOfWeek === dayIndex + 1 && (
                                                                    <div key={`${idx}-theory`} className="text-sm font-light">
                                                                        <div className="flex">{enrollment.classData.name}</div>
                                                                        <div className="text-blue-900 text-base font-semibold">{enrollment.classData.course.name}</div>
                                                                        <div>{"Giảng viên: " + enrollment.teacherName}</div>
                                                                        <div>
                                                                            {"Lý thuyết: Thứ " + theoryClass.dayOfWeek + " Tiết: " + theoryClass.periodStart + " - " + theoryClass.periodEnd}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            {practiceClass.timeSlotIndex === timeSlotIndex &&
                                                                practiceClass.dayOfWeek === dayIndex + 1 && (
                                                                    <div key={`${idx}-practice`} className="text-sm font-light">
                                                                        <div className="flex">{enrollment.classData.name}</div>
                                                                        <div className="text-blue-900 text-base font-semibold">{enrollment.classData.course.name}</div>
                                                                        <div>{"Giảng viên: " + enrollment.teacherName}</div>
                                                                        <div>
                                                                            {"Thực hành: Thứ " + practiceClass.dayOfWeek + " Tiết: " + practiceClass.periodStart + " - " + practiceClass.periodEnd}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </>
                                                    );
                                                }) : 'Không có dữ liệu'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
