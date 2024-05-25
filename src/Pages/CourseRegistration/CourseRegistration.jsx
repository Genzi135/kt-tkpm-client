import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderMain from "../../Common/HeaderMain";
import { Link } from "react-router-dom";

export default function CourseRegistration() {
    const [userData, setUserData] = useState(null);
    const [curriculumData, setCurriculumData] = useState(null);
    const [semesterData, setSemesterData] = useState(null);

    const [openClassData, setOpenClassData] = useState(null)

    const [selectedSemester, setSelectedSemester] = useState(null);

    const [selectedClass, setSelectedClass] = useState(null);

    const [selectedWaitingClass, setSelectedWaitingClass] = useState(null);

    const [enrollClassData, setEnrollClassData] = useState(null);

    const [waitingClassData, setWaitingClassData] = useState(null);

    const [selectedClassDetail, setSelectedClassDetail] = useState(null);

    const onViewDetail = (e) => {
        setSelectedClassDetail(e);
        document.getElementById("classDetail").showModal();
    }



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

    const getCurriculumCourse = async () => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/courses/curriculum-courses`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'POST'
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const getListSemester = async () => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/semesters`,
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
                const meData = await getMe();
                const curriculumData = await getCurriculumCourse();
                const semesterData = await getListSemester();

                setUserData(meData);
                setCurriculumData(curriculumData);
                setSemesterData(semesterData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const getRegistrationCourseBySemesterId = async (sId) => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/courses/registration-courses/${sId}`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'GET'
            })
            setOpenClassData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getClassByCourseIdAndSemesterId = async (cId, sId) => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/courses/${cId}/class/semester/${sId}`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'GET'
            })
            setWaitingClassData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getEnrollmentsBySemesterId = async (sId) => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/enrollments/semester/${sId}`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'GET',
            })
            setEnrollClassData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const enrollClassByIdClass = async (classId) => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/enrollments/class/${classId}`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'POST'
            })
            if (response.data.statusCode !== 201) {
                alert(response.data.message)
            } else if (response.data.statusCode === 201) {
                alert("Đăng ký thành công");

                selectedSemester && getRegistrationCourseBySemesterId(selectedSemester.id);
                selectedSemester && getEnrollmentsBySemesterId(selectedSemester.id);

                setSelectedClass(null);
                setWaitingClassData(null);
                setSelectedWaitingClass(null);

            }
        } catch (error) {
            console.log(error);
            error.response.data.message && alert(error.response.data.message)
        }
    }

    const DeleteEnrollClassByIdClass = async (classId) => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/enrollments/class/${classId}`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'DELETE'
            })
            console.log(response.data);
            if (response.data.statusCode !== 200) {
                alert(response.data.message)
            } else if (response.data.statusCode === 200) {
                alert("Hủy đăng ký thành công");

                selectedSemester && getRegistrationCourseBySemesterId(selectedSemester.id);
                selectedSemester && getEnrollmentsBySemesterId(selectedSemester.id);

                setSelectedClass(null);
                setWaitingClassData(null);
                setSelectedWaitingClass(null);

            }
        } catch (error) {
            console.log(error);
            if (error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    }

    const onEnrollClick = async () => {

        if (selectedWaitingClass) {
            enrollClassByIdClass(selectedWaitingClass.id);
        } else {
            alert("Vui lòng chọn lớp học phần để đăng ký")
        }
    }


    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value);
        const selectedSemester = semesterData.find(semester => semester.id === selectedId);
        setSelectedSemester(selectedSemester);
    };

    const onDeleteEnrollmentClick = (classs) => {
        if (confirm("Bạn có muốn hủy học phần này không?") === true) {
            if (classs) {
                if (classs.classData.id) {
                    const id = classs.classData.id;
                    DeleteEnrollClassByIdClass(id);
                }
            }
        }
    }

    useEffect(() => {
        selectedSemester && getRegistrationCourseBySemesterId(selectedSemester.id);
        selectedSemester && getEnrollmentsBySemesterId(selectedSemester.id);
    }, [selectedSemester])

    useEffect(() => {
        selectedClass && selectedSemester && getClassByCourseIdAndSemesterId(selectedClass.id, selectedSemester.id)
        setSelectedWaitingClass(null)
    }, [selectedClass, selectedSemester])



    return (
        <div className="flex-1 justify-center items-center flex-col bg-gray-100 w-[100vw] h-[auto]">
            {userData && <div>
                <HeaderMain data={userData} />
                <div className="p-5 flex flex-col justify-center items-center gap-5">
                    <div className="rounded-md w-[90vw] h-[30vh] flex justify-around items-center gap-5">
                        <div className="bg-white h-[100%] w-[65%] flex flex-col rounded-md shadow-lg">
                            <div className="border-b-2 p-2 text-xl font-semibold">
                                Thông tin sinh viên
                            </div>
                            <div className="p-2 flex justify-around items-center">

                                <div className="flex flex-col bg-blue-400 p-5 justify-start  gap-2 text-white">
                                    <label className="text-xs">Xin chào!</label>
                                    <label className="text-sm"><label className="font-semibold">{userData.name}</label></label>
                                    <label className="text-sm">MSSV: <label className="font-semibold">{userData.id}</label></label>
                                    <label className="text-sm">Email: <label className="font-semibold">{userData.email}</label></label>
                                    <label className="text-sm">Ngày sinh: <label className="font-semibold">{userData.dateOfBirth}</label></label>
                                </div>

                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <Avatar src="" alt="avatar" size="xxl" className="bg-black" />
                                </div>

                                <div className="flex flex-col justify-start  gap-2">
                                    <Link to={'/dashboard/trang-ca-nhan'} className="text-md text-blue-500 font-semibold">THÔNG TIN SINH VIÊN</Link>
                                    <Link to={'/dashboard/dang-ky-hoc-phan'} className="text-md text-blue-500 font-semibold">ĐĂNG KÝ HỌC PHẦN</Link>
                                    <Link to={'/dashboard/chuong-trinh-khung'} className="text-md text-blue-500 font-semibold">CHƯƠNG TRÌNH KHUNG</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="p-4 bg-white rounded-lg mb-5">
                        <h2>Chọn học kỳ:</h2>
                        <select onChange={handleSelectChange} className="border-8 rounded-lg p-2">
                            <option value="" className="p-2">-- Học kỳ --</option>
                            {semesterData.map(semester => (
                                <option className="p-2" key={semester.id} value={semester.id}>{semester.academicYear} - {semester.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="flex flex-col justify-center items-center">

                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <div className="flex justify-center items-center">
                            <label className="text-lg font-semibold">MÔN HỌC ĐANG CHỜ ĐĂNG KÝ</label>
                        </div>
                        <table className="border">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 p-3">STT</th>
                                    <th className="border border-gray-400 p-3">Tên môn học</th>
                                    <th className="border border-gray-400 p-3">Loại môn</th>
                                    <th className="border border-gray-400 p-3">Số tiết lý thuyết</th>
                                    <th className="border border-gray-400 p-3">Số tiết thực hành</th>
                                    <th className="border border-gray-400 p-3">Số tín chỉ</th>
                                    <th className="border border-gray-400 p-3">Học phần tiên quyết</th>


                                    {/* Add more columns if needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {openClassData && openClassData.map(course => (
                                    <tr key={course.id} className={`cursor-pointer ${selectedClass && selectedClass.id === course.id ? 'bg-red-500' : ''}`} onClick={() => setSelectedClass(course)}>
                                        <td className="border border-gray-400 p-3">{course.id}</td>
                                        <td className="border border-gray-400 p-3">{course.name}</td>
                                        <td className="border border-gray-400 p-3">{course.courseType === 'practice' ? 'Thực hành' : 'Lý thuyết'}</td>
                                        <td className="border border-gray-400 p-3">{course.theorySessions}</td>
                                        <td className="border border-gray-400 p-3">{course.practiceSessions}</td>
                                        <td className="border border-gray-400 p-3">{course.maxElectiveCredits}</td>
                                        <td className="border border-gray-400 p-3">{course.prerequisteCourses.map(e => e.name + ",")
                                        }</td>
                                        {/* Add more columns if needed */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-lg mt-5">
                        <div className="flex justify-center items-center">
                            <label className="text-lg font-semibold">LỚP HỌC PHẦN ĐANG CHỜ ĐĂNG KÝ</label>
                        </div>
                        <table className="border">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 p-3">STT</th>
                                    <th className="border border-gray-400 p-3">Tên môn học</th>
                                    <th className="border border-gray-400 p-3">Mã môn học</th>
                                    <th className="border border-gray-400 p-3">Trạng thái</th>
                                    <th className="border border-gray-400 p-3">Giảng viên</th>
                                    <th className="border border-gray-400 p-3">Số lượng tối đa</th>
                                    <th className="border border-gray-400 p-3">Số lượng hiện tại</th>


                                    {/* Add more columns if needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {waitingClassData && waitingClassData.map(course => (
                                    <tr key={course.id} className={`cursor-pointer ${selectedWaitingClass && selectedWaitingClass.id === course.id ? 'bg-red-500' : ''}`} onClick={() => { setSelectedWaitingClass(course); console.log(course) }}>
                                        <td className="border border-gray-400 p-3">{course.id}</td>
                                        <td className="border border-gray-400 p-3">{course.course}</td>
                                        <td className="border border-gray-400 p-3">{course.name}</td>
                                        <td className="border border-gray-400 p-3">{course.status}</td>
                                        <td className="border border-gray-400 p-3">{course.teacher}</td>
                                        <td className="border border-gray-400 p-3">{course.maxStudents}</td>
                                        <td className="border border-gray-400 p-3">{course.currentStudents}</td>

                                        {/* Add more columns if needed */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {selectedWaitingClass && (
                        <div className="bg-white p-5 rounded-lg shadow-lg mt-5">
                            <div className="flex justify-center items-center">
                                <label className="text-lg font-semibold">THÔNG TIN LỚP HỌC PHẦN</label>
                            </div>
                            <table className="border">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 p-3">STT</th>
                                        <th className="border border-gray-400 p-3">Tên môn học</th>
                                        <th className="border border-gray-400 p-3">Lịch học lý thuyết</th>
                                        <th className="border border-gray-400 p-3">Lịch học thực hành</th>
                                        <th className="border border-gray-400 p-3">Phòng học lý thuyết</th>
                                        <th className="border border-gray-400 p-3">Phòng học thực hành</th>
                                        {/* Add more columns if needed */}
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr className={` bg-white`} >
                                        <td className="border border-gray-400 p-3">{selectedWaitingClass.id}</td>
                                        <td className="border border-gray-400 p-3">{selectedWaitingClass.course}</td>
                                        <td className="border border-gray-400 p-3">
                                            {selectedWaitingClass.dayOfWeek ? (
                                                `Thứ ${selectedWaitingClass.dayOfWeek} Tiết: ${selectedWaitingClass.periodStart} - ${selectedWaitingClass.periodEnd}`
                                            ) : (
                                                "Chưa có lịch"
                                            )}
                                        </td>
                                        <td className="border border-gray-400 p-3">
                                            {selectedWaitingClass.dayOfWeekPractice ? (
                                                `Thứ ${selectedWaitingClass.dayOfWeekPractice} Tiết: ${selectedWaitingClass.periodStartPractice} - ${selectedWaitingClass.periodEndPractice}`
                                            ) : (
                                                "Chưa có lịch"
                                            )}
                                        </td>

                                        <td className="border border-gray-400 p-3">{selectedWaitingClass.room ? (selectedWaitingClass.room) : ("Chưa có phòng")}</td>
                                        <td className="border border-gray-400 p-3">{selectedWaitingClass.roomPractice ? (selectedWaitingClass.roomPractice) : "Chưa có phòng"}</td>
                                        {/* Add more columns if needed */}
                                    </tr>

                                </tbody>
                            </table>
                        </div>)}

                    <div className="flex justify-center items-center">
                        <button className="bg-orange-700 text-md text-white font-semibold p-3 pl-5 pr-5 rounded-md mt-5"
                            onClick={() => onEnrollClick()}>Đăng ký</button>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow-lg mt-5">
                        <div className="flex justify-center items-center">
                            <label className="text-lg font-semibold">LỚP HỌC PHẦN ĐÃ ĐĂNG KÝ</label>
                        </div>
                        <table className="border">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 p-3">STT</th>
                                    <th className="border border-gray-400 p-3">Tên lớp</th>
                                    <th className="border border-gray-400 p-3">Tên môn học</th>
                                    <th className="border border-gray-400 p-3">Trạng thái</th>
                                    <th className="border border-gray-400 p-3">Giảng viên</th>
                                    <th className="border border-gray-400 p-3">Học phí</th>
                                    <th className="border border-gray-400 p-3">Số lượng tối đa</th>
                                    <th className="border border-gray-400 p-3">Số lượng hiện tại</th>
                                    <th className="border border-gray-400 p-3"></th>
                                    {/* Add more columns if needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {enrollClassData && enrollClassData.map(course => (
                                    <tr key={course.id} className={` bg-white`} onClick={() => console.log(course)}>
                                        <td className="border border-gray-400 p-3">{course.id}</td>
                                        <td className="border border-gray-400 p-3">{course.className}</td>
                                        <td className="border border-gray-400 p-3">{course.classData.course.name}</td>
                                        <td className="border border-gray-400 p-3">{course.classData.status}</td>
                                        <td className="border border-gray-400 p-3">{course.teacherName}</td>
                                        <td className="border border-gray-400 p-3">{course.isEnrolled ? 'Đã đóng' : 'Chưa đóng học phí'}</td>
                                        <td className="border border-gray-400 p-3">{course.maxStudents}</td>
                                        <td className="border border-gray-400 p-3">{course.currentStudents}</td>
                                        <td className="border border-gray-400 p-3 flex gap-2 flex-col justify-between"><button className="bg-red-500 p-2 text-white" onClick={() => onDeleteEnrollmentClick(course)}>Hủy</button>
                                            <button className="=bg-white p-2 text-black hover:bg-gray-300" onClick={() => { onViewDetail(course) }}>Xem</button></td>
                                        {/* Add more columns if needed */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <dialog id="classDetail" className="modal">
                        <div className="w-72 h-auto bg-white rounded-lg p-5 shadow-lg flex flex-col">
                            <div className="flex items-center justify-between">
                                <label className="font-semibold text-lg">Chi tiết môn học</label>
                                <form method="dialog">
                                    <button className="w-12 h-12 rounded-full hover:bg-gray-300 flex justify-center items-center">x</button>
                                </form>
                            </div>
                            {selectedClassDetail && <div className="flex flex-col gap-2">
                                <label>Tên môn học: {selectedClassDetail.classData.course.name}</label>
                                <label>Tên lớp học: {selectedClassDetail.className}</label>
                                <label>Giảng viên: {selectedClassDetail.teacherName}</label>
                                <label>Loại lớp học: {selectedClassDetail.classData.type}</label>
                                <label>Lịch học lý thuyết: {selectedClassDetail.classData.dayOfWeek ? (
                                    `Thứ ${selectedClassDetail.classData.dayOfWeek} Tiết: ${selectedClassDetail.classData.periodStart} - ${selectedClassDetail.classData.periodEnd}`
                                ) : (
                                    "Chưa có lịch"
                                )}</label>
                                <label>Lịch học thực hành: {selectedClassDetail.classData.dayOfWeekPractice ? (
                                    `Thứ ${selectedClassDetail.classData.dayOfWeekPractice} Tiết: ${selectedClassDetail.classData.periodStartPractice} - ${selectedClassDetail.classData.periodEndPractice}`
                                ) : (
                                    "Chưa có lịch"
                                )}</label>
                                <label>Số lượng tối đa: {selectedClassDetail.maxStudents}</label>
                                <label>Số lượng hiện có: {selectedClassDetail.currentStudents}</label>
                                <label>Trạng thái: {selectedClassDetail.classData.status}</label>
                                <label>Học phí: {selectedClassDetail.isEnroll ? ('Đã đóng học phí') : ('Chưa đóng học phí')}</label>
                            </div>}
                            <div className="flex justify-end items-center p-2 mt-2">
                                <form method="dialog">
                                    <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-400">Xác nhận</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>}
        </div>
    )
}