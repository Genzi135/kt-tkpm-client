import { Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";

export default function Register({ onLoginClick }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [report, setReport] = useState('');

    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const onUsernameChange = (e) => {
        const newUsername = e.target.value;
        const isValid = newUsername.trim() !== '';
        setUsername(newUsername);
        setIsUsernameValid(isValid);
    };

    const onEmailChange = (e) => {
        const newEmail = e.target.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail); // Kiểm tra định dạng email hợp lệ
        setEmail(newEmail);
        setIsEmailValid(isValid);
    };

    const onPasswordChange = (e) => {
        const newPassword = e.target.value;
        const isValid = newPassword.trim() !== '' && newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[^a-zA-Z0-9]/.test(newPassword); // Kiểm tra độ dài mật khẩu, chứa ký tự đặc biệt và chữ hoa
        setPassword(newPassword);
        setIsPasswordValid(isValid);
    };

    const onConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        const isValid = newConfirmPassword === password;
        setConfirmPassword(newConfirmPassword);
        setIsConfirmPasswordValid(isValid);
    };

    const handleRegister = () => {
        if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            setReport("Vui lòng nhập đầy đủ thông tin và kiểm tra lại.");
            return;
        }

        // Xử lý logic đăng ký tài khoản tại đây
        console.log(username, email, password);
        setReport('');
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Card className="w-96 p-5">
                <CardBody className="flex flex-col gap-2">
                    <Typography variant="h4" className="flex items-center justify-center text-blue-500">Đăng ký tài khoản</Typography>
                    <label>Tên người dùng</label>
                    <Input
                        label="Nhập tên người dùng"
                        value={username}
                        onChange={onUsernameChange}
                        error={!isUsernameValid}
                    />
                    <label>Email</label>
                    <Input
                        label="Nhập email"
                        value={email}
                        onChange={onEmailChange}
                        error={!isEmailValid}
                    />
                    <label>Mật khẩu</label>
                    <Input
                        type="password"
                        label="Nhập mật khẩu"
                        value={password}
                        onChange={onPasswordChange}
                        error={!isPasswordValid}
                    />
                    <label>Xác nhận mật khẩu</label>
                    <Input
                        type="password"
                        label="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={onConfirmPasswordChange}
                        error={!isConfirmPasswordValid}
                    />
                    <Typography className="text-red-500 text-sm">{report}</Typography>
                    <div className="flex justify-center items-center">
                        <Button className="w-auto text-base" onClick={handleRegister}>Đăng ký</Button>
                    </div>
                </CardBody>
                <div className="flex items-center gap-1 text-sm">
                    <Typography>Bạn đã có tài khoản?</Typography>
                    <Typography className="text-blue-500 font-semibold cursor-pointer" onClick={() => onLoginClick('login')}>Đăng nhập</Typography>
                </div>
            </Card>
        </div>
    );
}
