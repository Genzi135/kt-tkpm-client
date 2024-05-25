import { Button, Card, CardBody, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onRegisterClick }) {
    const [mssv, setMssv] = useState('');
    const [password, setPassword] = useState('');
    const [report, setReport] = useState('');
    const [isMssvValid, setIsMssvValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const navigate = useNavigate();


    const onMssvChange = (e) => {
        const newMssv = e.target.value;
        const isValid = /^[0-9]{8}$/.test(newMssv);
        setMssv(newMssv);
        setIsMssvValid(isValid);
    };

    const onPasswordChange = (e) => {
        const newPassword = e.target.value;
        const isValid = newPassword.trim() !== '';
        setPassword(newPassword);
        setIsPasswordValid(isValid);
    };

    const handleLogin = async () => {
        if (!isMssvValid) {
            setReport("MSSV không hợp lệ. MSSV phải là chuỗi gồm 8 chữ số.");
            return;
        }
        if (!isPasswordValid) {
            setReport("Mật khẩu không được để trống.");
            return;
        }
        if (isMssvValid && isPasswordValid) {
            try {
                const response = await axios({
                    url: 'http://ec2-18-142-44-82.ap-southeast-1.compute.amazonaws.com:3000/api/v1/auth/login',
                    method: 'POST',
                    data: { username: mssv, password: password }
                })
                console.log(response);
                localStorage.setItem('userToken', JSON.stringify(response.data.token));
                // dispath(setUser(response.data))
                navigate('/dashboard');
            } catch (error) {
                console.log(error);
            }
        }
        console.log(mssv, password);
        setReport('');

    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Card className="w-96 p-5 shadow-lg">
                <CardBody className="flex flex-col gap-2">
                    <Typography variant="h4" className="flex items-center justify-center text-blue-500">Đăng nhập</Typography>
                    <label>MSSV</label>
                    <Input
                        label="Nhập mssv"
                        value={mssv}
                        onChange={onMssvChange}
                        error={!isMssvValid}
                    />
                    <label>Mật khẩu</label>
                    <Input
                        type="password"
                        label="Mật khẩu"
                        value={password}
                        onChange={onPasswordChange}
                        error={!isPasswordValid}
                    />
                    <Typography className="text-red-500 text-sm">{report}</Typography>
                    <div className="flex justify-center items-center">
                        <Button className="w-auto text-base" onClick={handleLogin}>ĐĂNG NHẬP</Button>
                    </div>
                </CardBody>

                {/* <div className="flex items-center gap-1 text-sm">
                    <Typography>Bạn chưa có tài khoản? </Typography>
                    <Typography className="text-blue-500 font-semibold cursor-pointer" onClick={() => onRegisterClick('register')}> Đăng ký</Typography>
                </div> */}
            </Card>
        </div>
    );
}
