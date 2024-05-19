import React, { useState, useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderMain from "../../Common/HeaderMain";
import { BsBarChartLineFill, BsFillCalendar2WeekFill, BsStack } from "react-icons/bs";
import BarChart from "../../Common/BarChart";
import PieChart from "../../Common/PieChar";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [gradesData, setGradesData] = useState(null);
    const [semestersData, setSemestersData] = useState(null);
    const [sumCredits, setSumCredits] = useState(0);

    const [selectedSemester1, setSelectedSemester1] = useState(null);
    const [selectedSemester2, setSelectedSemester2] = useState(null);

    const handleSelectChange1 = (event) => {
        const selectedId = parseInt(event.target.value);
        const selectedSemester = gradesData[selectedId];
        setSelectedSemester1(selectedSemester);
    };

    const handleSelectChange2 = (event) => {
        const selectedId = parseInt(event.target.value);
        const selectedSemester = gradesData[selectedId];
        setSelectedSemester2(selectedSemester);
    };

    useEffect(() => {
        if (gradesData) {
            console.log(gradesData);
            if (gradesData.length > 0) {
                let sum = gradesData[gradesData.length - 1].totalCredits;
                setSumCredits(sum);
            }
        }
    }, [gradesData])

    useEffect(() => {
        console.log(selectedSemester1);
    }, [selectedSemester1]);

    useEffect(() => {
        console.log(selectedSemester2);
    }, [selectedSemester2]);

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    useEffect(() => {
        console.log(gradesData);
    }, [gradesData]);

    useEffect(() => {
        console.log(semestersData);
    }, [semestersData]);

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
                const [meData, gradesData, semestersData] = await Promise.all([
                    getMe(),
                    getGrades(),
                    getListSemester()
                ]);

                setUserData(meData);
                setGradesData(gradesData);
                setSemestersData(semestersData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex-1 justify-center items-center flex-col bg-gray-100 w-[100vw] h-[100vh]">
            {userData && <div>
                <HeaderMain data={userData} />
                <div className="p-5 flex flex-col justify-center items-center gap-5">
                    <div className="rounded-md w-[90vw] h-[30vh] flex justify-around items-center gap-5">
                        <div className="bg-white h-[100%] w-[65%] flex flex-col rounded-md shadow-lg">
                            <div className="border-b-2 p-2 text-xl font-semibold">
                                Thông tin sinh viên
                            </div>
                            <div className="p-2 flex justify-around items-center">
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <Avatar src="" alt="avatar" size="xxl" className="bg-black" />
                                    <Link to={"/dashboard/trang-ca-nhan"} className="text-xs text-blue-500 cursor-pointer">Xem chi tiết</Link>
                                </div>
                                <div className="flex flex-col justify-start  gap-2">
                                    <label className="text-sm">MSSV: <label className="font-semibold">{userData.id}</label></label>
                                    <label className="text-sm">Họ và tên: <label className="font-semibold">{userData.name}</label></label>
                                    <label className="text-sm">Email: <label className="font-semibold">{userData.email}</label></label>
                                    <label className="text-sm">Ngày sinh: <label className="font-semibold">{userData.dateOfBirth}</label></label>
                                </div>
                                <div className="flex flex-col justify-start  gap-2">
                                    <label className="text-sm">Lớp học: <label className="font-semibold">{userData.majorClass.name}</label></label>
                                    <label className="text-sm">Khóa học: <label className="font-semibold">{userData.academicYear}</label></label>
                                    <label className="text-sm">Ngành: <label className="font-semibold">{userData.major.name}</label></label>
                                    <label className="text-sm">Số điện thoại: <label className="font-semibold">{userData.phone}</label></label>
                                </div>
                            </div>
                        </div>
                        <div className="h-[100%] w-[35%] flex flex-col gap-5">
                            <Link to={"/dashboard/lich-hoc"} className="flex justify-between p-2 rounded-lg bg-blue-100 w-full h-[50%] cursor-pointer">
                                <div className="flex text-sm flex-col justify-between ">
                                    <label className=" text-blue-600">Lịch học theo tuần</label>
                                    <div className="flex ml-5 items-center">
                                        <BsFillCalendar2WeekFill size={20} color="blue" />
                                    </div>
                                    <label className="text-sm text-blue-600" color="blue">Xem chi tiết</label>
                                </div>
                            </Link>
                            <div className="flex justify-between rounded-lg w-full h-[50%] gap-5 ">
                                <Link to={"/dashboard/ket-qua-hoc-tap"} className="w-[50%] h-[100%] p-2 bg-blue-100 rounded-lg shadow-lg flex flex-col justify-center items-center">
                                    <div className="flex items-center">
                                        <BsBarChartLineFill size={25} color="blue" />
                                    </div>
                                    <label className="text-sm text-blue-600">Kết quả học tập</label>
                                </Link>
                                <Link to={"/dashboard/dang-ky-hoc-phan"} className="w-[50%] h-[100%] p-2 bg-blue-100 rounded-lg shadow-lg flex flex-col justify-center items-center">
                                    <div className="flex items-center">
                                        <BsStack size={25} color="blue" />
                                    </div>
                                    <label className="text-sm text-blue-600">Đăng ký học phần</label>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md w-[90vw] h-[50vh] flex justify-around items-center gap-5">
                        <div className="bg-white h-[100%] w-[35%] flex flex-col rounded-md shadow-lg">
                            <div className="p-4 bg-white rounded-lg mb-5">
                                <h2>Chọn học kỳ:</h2>
                                <select onChange={handleSelectChange1} className="border-8 rounded-lg p-2">
                                    <option value="" className="p-2">-- Học kỳ --</option>
                                    {semestersData && semestersData.map((semester, index) => (
                                        <option className="p-2" key={semester.id} value={index}>{semester.academicYear} - {semester.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <BarChart selectedSemester={selectedSemester1} />
                            </div>
                        </div>

                        <div className="bg-white h-[100%] w-[35%] flex flex-col rounded-md shadow-lg justify-center items-center">
                            <div>
                                <PieChart sumCredits={sumCredits} />
                            </div>
                            <div className="flex justify-center items-center">{sumCredits}/156</div>
                        </div>

                        <div className="bg-white h-[100%] w-[35%] flex flex-col rounded-md shadow-lg">
                            <div className="p-4 bg-white rounded-lg mb-2">
                                <h2>Chọn học kỳ:</h2>
                                <select onChange={handleSelectChange2} className="border-8 rounded-lg p-2">
                                    <option value="" className="p-2">-- Học kỳ --</option>
                                    {semestersData && semestersData.map((semester, index) => (
                                        <option className="p-2" key={semester.id} value={index}>{semester.academicYear} - {semester.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className=" bg-white rounded-lg mb-5 overflow-auto">

                                <ul>
                                    {selectedSemester2 && selectedSemester2.grades.map((grade, index) => (
                                        <li className="p-3 border-b-2" key={index}>{grade.courseName} - Điểm: {grade.averageGrade
                                        }</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}
