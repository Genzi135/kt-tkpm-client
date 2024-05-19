import axios from "axios";
import { useEffect, useState } from "react";
import HeaderMain from "../../Common/HeaderMain";

export default function Grades() {
    const [dataSource, setDataSource] = useState({ me: null, grades: null });

    const userToken = JSON.parse(localStorage.getItem("userToken"));

    const getMe = async () => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/students/getMe`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'GET'
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const getGrades = async () => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/grades`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'GET'
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [meData, gradesData] = await Promise.all([getMe(), getGrades()]);
                setDataSource({ me: meData, grades: gradesData });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const GradeTable = ({ grades }) => {
        return (
            <div className="p-2 mt-2">
                <table className="min-w-full bg-white border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="py-2 border border-gray-400">Tên môn học</th>
                            <th className="py-2 border border-gray-400">Tín chỉ</th>
                            <th className="py-2 border border-gray-400">Điểm lý thuyết 1</th>
                            <th className="py-2 border border-gray-400">Điểm lý thuyết 2</th>
                            <th className="py-2 border border-gray-400">Điểm lý thuyết 3</th>
                            <th className="py-2 border border-gray-400">Điểm lý thuyết 4</th>
                            <th className="py-2 border border-gray-400">Điểm thực hành 1</th>
                            <th className="py-2 border border-gray-400">Điểm thực hành 2</th>
                            <th className="py-2 border border-gray-400">Điểm thực hành 3</th>
                            <th className="py-2 border border-gray-400">Điểm giữa kỳ</th>
                            <th className="py-2 border border-gray-400">Điểm cuối kỳ</th>
                            <th className="py-2 border border-gray-400">Điểm TB</th>
                            <th className="py-2 border border-gray-400">Điểm 4</th>
                            <th className="py-2 border border-gray-400">Điểm chữ</th>
                            <th className="py-2 border border-gray-400">Xếp loại</th>
                            <th className="py-2 border border-gray-400">Kết quả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade, index) => (
                            <tr key={index}>
                                <td className="py-2 border border-gray-400">{grade.courseName || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.courseCredits || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.lethicalGrade1 || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.lethicalGrade2 || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.lethicalGrade3 || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.lethicalGrade4 || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.practicalGrade1 || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.practicalGrade2 || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.practicalGrade3 || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.midTermGrade || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.finalTermGrade || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.averageGrade || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.gpa4 || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.letterGrade || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.classifictaion || ""}</td>
                                <td className="py-2 border border-gray-400">{grade.isPassed ? "Đạt" : "Không đạt"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const SemesterTable = ({ semesters }) => {
        return (
            <div className="mt-2 ml-2">
                {semesters.map((semester, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="text-xl font-bold mb-2 ml-2 mt-2">Học kỳ: {semester.semester}</h2>
                        <GradeTable grades={semester.grades} />
                        <div className="flex flex-col ml-2 p-4 bg-blue-200 gap-2">
                            <label>Điểm trung bình: {semester.accumulatedGrade}</label>
                            <label>Điểm trung bình (thang điểm 4): {semester.accumulatedGpa4}</label>
                            <label>Điểm trung bình học kì: {semester.semesterGrade}</label>
                            <label>Điểm trung bình học kì (thang điểm 4): {semester.semesterGpa4}</label>
                            <label>Xếp loại: {semester.semesterLetterGrade}</label>
                            <label>Số tính chỉ của học kì: {semester.semesterCredits}</label>
                            <label>Tổng số tính chỉ: {semester.totalCredits}</label>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex-1 justify-center items-center flex-col bg-gray-100 w-[100vw] h-[100vh]">
            {dataSource && dataSource.me && dataSource.grades && (
                <div>
                    <HeaderMain data={dataSource.me} />
                    <SemesterTable semesters={dataSource.grades} />

                </div>
            )}
        </div>
    );
}
