
import { Avatar, Button, Menu, MenuHandler, MenuList, Typography } from "@material-tailwind/react"
import logo from "../assets/logo-svd516f114-e-e.png"
import icons from "../Shared/icons"
import { useState } from "react";
import { Link } from "react-router-dom";
export default function HeaderMain({ data }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-full flex justify-between shadow-lg pl-4 pr-4  bg-white">
            <Link to={"/dashboard"}><img src={logo} style={{ scale: '70%' }} /></Link>
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler >
                    <div className="flex justify-center items-center">
                        <label>{data.name}</label>
                        <Button variant="text"
                            color="blue-gray"
                            className="flex items-center justify-center rounded-full"
                        >
                            <Avatar
                                variant="circular"
                                size="sm"
                                alt="tania andrew"
                                className="border border-gray-900 "
                                src={''}
                            />
                        </Button>
                    </div>

                </MenuHandler>
                <MenuList className="p-2">
                    <Typography className="flex justify-start items-center p-2 gap-1 text-black hover:bg-gray-100">
                        {icons.house}
                        <Link to={'/dashboard'}>
                            Trang chủ
                        </Link>
                    </Typography>
                    <Typography className="flex justify-start items-center p-2 gap-1 text-black hover:bg-gray-100">
                        {icons.user}
                        <Link to={'/dashboard/trang-ca-nhan'}>
                            Trang cá nhân
                        </Link>
                    </Typography>
                    <Typography className="flex justify-start items-center p-2 gap-1 text-black hover:bg-gray-100">
                        {icons.calendar}
                        <Link to={'/dashboard/lich-hoc'}>
                            Lịch học
                        </Link>
                    </Typography>
                    <Typography className="flex justify-start items-center p-2 gap-1 text-black hover:bg-gray-100">
                        {icons.chart}
                        <Link to={'/dashboard/ket-qua-hoc-tap'}>
                            Kết quả học tập
                        </Link>
                    </Typography>
                    <Typography className="flex justify-start items-center p-2 gap-1 text-black hover:bg-gray-100">
                        {icons.stack}
                        <Link to={'/dashboard/dang-ky-hoc-phan'}>
                            Đăng ký học phần
                        </Link>
                    </Typography>
                    <Typography className="flex justify-start items-center p-2 gap-1 text-black hover:bg-gray-100">
                        {icons.frame}
                        <Link to={'/dashboard/chuong-trinh-khung'}>
                            Chương trình khung
                        </Link>
                    </Typography>
                    <Typography className="flex justify-start items-center p-2 gap-1 text-red-500 hover:bg-gray-100">
                        {icons.logout}
                        <Link to={'/authentication'}>
                            Đăng xuất
                        </Link>
                    </Typography>
                </MenuList>
            </Menu>
        </div>
    )
}