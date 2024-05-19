import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderMain from "../../Common/HeaderMain";

export default function UserProfile() {
    const [dataSource, setDataSource] = useState(null);

    const userToken = JSON.parse(localStorage.getItem("userToken"));

    const getMe = async () => {
        try {
            const response = await axios({
                url: `http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/students/getMe`,
                headers: { Authorization: `Bearer ${userToken}` },
                method: 'GET'
            })
            console.log(response.data);
            setDataSource(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMe();
    }, [])
    return (
        <div className="flex-1 justify-center items-center flex-col bg-gray-100 w-[100vw] h-[100vh]">
            {dataSource && <div>
                <HeaderMain data={dataSource} />
                <div className="p-5 flex flex-col justify-center items-center gap-5">
                    <div className="rounded-md w-[90vw] h-[30vh] flex justify-around items-center gap-5">
                        <div className="bg-white h-[100%] w-[65%] flex flex-col rounded-md shadow-lg">
                            <div className="border-b-2 p-2 text-xl font-semibold">
                                Thông tin sinh viên
                            </div>
                            <div className="p-2 flex justify-around items-center">
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <Avatar src="" alt="avatar" size="xxl" className="bg-black" />
                                </div>
                                <div className="flex flex-col justify-start  gap-2">
                                    <label className="text-sm">MSSV: <label className="font-semibold">{dataSource.id}</label></label>
                                    <label className="text-sm">Họ và tên: <label className="font-semibold">{dataSource.name}</label></label>
                                    <label className="text-sm">Email: <label className="font-semibold">{dataSource.email}</label></label>
                                    <label className="text-sm">Ngày sinh: <label className="font-semibold">{dataSource.dateOfBirth}</label></label>
                                </div>
                                <div className="flex flex-col justify-start  gap-2">
                                    <label className="text-sm">Lớp học: <label className="font-semibold">{dataSource.majorClass.name}</label></label>
                                    <label className="text-sm">Khóa học: <label className="font-semibold">{dataSource.academicYear}</label></label>
                                    <label className="text-sm">Ngành: <label className="font-semibold">{dataSource.major.name}</label></label>
                                    <label className="text-sm">Só điện thoại: <label className="font-semibold">{dataSource.phone}</label></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <label></label>
            </div>}
        </div>
    )
}