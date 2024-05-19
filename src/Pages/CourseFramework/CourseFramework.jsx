import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderMain from "../../Common/HeaderMain";
import { Link } from "react-router-dom";

export default function CourseFramework() {
    const [userData, setUserData] = useState(null);
    const [curriculumData, setCurriculumData] = useState([]);

    const userToken = JSON.parse(localStorage.getItem("userToken"));

    const getMe = async () => {
        try {
            const response = await axios.get(
                'http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/students/getMe',
                { headers: { Authorization: `Bearer ${userToken}` } }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getCurriculumCourse = async () => {
        try {
            const response = await axios.post(
                'http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/courses/curriculum-courses',
                {},
                { headers: { Authorization: `Bearer ${userToken}` } }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const meData = await getMe();
                const curriculumData = await getCurriculumCourse();

                setUserData(meData);
                setCurriculumData(curriculumData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const groupBySemester = (courses) => {
        return courses.reduce((acc, course) => {
            const semester = course.semester;
            if (!acc[semester]) {
                acc[semester] = [];
            }
            acc[semester].push(course);
            return acc;
        }, {});
    };

    const groupedCourses = groupBySemester(curriculumData);

    return (
        <div className="flex-1 flex-col items-center bg-gray-100 w-full min-h-screen">
            {userData && (
                <div>
                    <HeaderMain data={userData} />
                    <div className="p-5 flex flex-col items-center gap-5">
                        <div className="rounded-md w-11/12 h-1/4 flex justify-around items-center gap-5">
                            <div className="bg-white h-full w-2/3 flex flex-col rounded-md shadow-lg">
                                <div className="border-b-2 p-2 text-xl font-semibold">Thông tin sinh viên</div>
                                <div className="p-2 flex justify-around items-center">
                                    <div className="flex flex-col bg-blue-400 p-5 text-white gap-2">
                                        <label className="text-xs">Xin chào!</label>
                                        <label className="text-sm font-semibold">{userData.name}</label>
                                        <label className="text-sm">MSSV: <span className="font-semibold">{userData.id}</span></label>
                                        <label className="text-sm">Email: <span className="font-semibold">{userData.email}</span></label>
                                        <label className="text-sm">Ngày sinh: <span className="font-semibold">{userData.dateOfBirth}</span></label>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center">
                                        <Avatar src="" alt="avatar" size="xxl" className="bg-black" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Link to="/dashboard/trang-ca-nhan" className="text-md text-blue-500 font-semibold">THÔNG TIN SINH VIÊN</Link>
                                        <Link to="/dashboard/dang-ky-hoc-phan" className="text-md text-blue-500 font-semibold">ĐĂNG KÝ HỌC PHẦN</Link>
                                        <Link to="/dashboard/chuong-trinh-khung" className="text-md text-blue-500 font-semibold">CHƯƠNG TRÌNH KHUNG</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-5 rounded-lg shadow-lg w-11/12">
                            <div className="flex justify-center items-center mb-4">
                                <label className="text-lg font-semibold">CHƯƠNG TRÌNH KHUNG</label>
                            </div>
                            {Object.keys(groupedCourses).length > 0 ? (
                                Object.keys(groupedCourses).map(semester => (
                                    <div key={semester} className="mb-6">
                                        <h2 className="text-xl font-bold mb-4">Học kỳ {semester}</h2>
                                        <table className="w-full border-collapse mb-4">
                                            <thead>
                                                <tr>
                                                    <th className="border border-gray-400 p-3">STT</th>
                                                    <th className="border border-gray-400 p-3">Tên môn học</th>
                                                    <th className="border border-gray-400 p-3">Loại môn</th>
                                                    <th className="border border-gray-400 p-3">Số tiết lý thuyết</th>
                                                    <th className="border border-gray-400 p-3">Số tiết thực hành</th>
                                                    <th className="border border-gray-400 p-3">Số tín chỉ</th>
                                                    <th className="border border-gray-400 p-3">Học phần tiên quyết</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {groupedCourses[semester].map((course, index) => (
                                                    <tr key={course.id}>
                                                        <td className="border border-gray-400 p-3">{index + 1}</td>
                                                        <td className="border border-gray-400 p-3">{course.name}</td>
                                                        <td className="border border-gray-400 p-3">{course.courseType === 'practice' ? 'Thực hành' : 'Lý thuyết'}</td>
                                                        <td className="border border-gray-400 p-3">{course.theorySessions}</td>
                                                        <td className="border border-gray-400 p-3">{course.practiceSessions}</td>
                                                        <td className="border border-gray-400 p-3">{course.credits}</td>
                                                        <td className="border border-gray-400 p-3">{course.prerequisteCourses.map((e, i) => (
                                                            <span key={i}>{e.name}{i < course.prerequisteCourses.length - 1 ? ", " : ""}</span>
                                                        ))}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No curriculum data available.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
