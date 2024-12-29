'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import googlelogo from '/assets/images/img-google.png';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Cookies from 'js-cookie';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const { setUser } = useUser();
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // Đảm bảo cookies được gửi cùng request
            });

            const data = await response.json();

            if (response.ok) {
                // Giả sử data.accessToken là accessToken và data.data là thông tin người dùng
                console.log('Login response:', data);

                // Cập nhật cookie với thông tin người dùng nếu cần
                Cookies.set('user', JSON.stringify(data.data), {
                    expires: 30, // Thời gian hết hạn cookie (30 ngày)
                    secure: process.env.NODE_ENV === 'production', // Chỉ set cho HTTPS trong môi trường production
                    sameSite: 'Strict', // Bảo vệ chống CSRF
                });

                // Cập nhật context với thông tin người dùng
                setUser(data.data);

                // Điều hướng đến trang chính
                router.push('/');
            } else {
                // Xử lý khi có lỗi
                console.error('Login failed:', data.message);
                alert(data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Đã xảy ra lỗi trong quá trình đăng nhập.');
        }
    };

    return (
        <div className="bg-[#4136c4] w-full h-full flex p-[1.6rem_2.4rem]">
            <div className="bg-[#f7f7f7] m-auto w-[30rem] rounded p-[1.8rem_2.4rem]">
                <h1 className="font-bold text-[#4136c4] text-center text-[1.4rem]">
                    Đăng nhập tài khoản
                </h1>
                <div className="pt-8">
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-5"
                    >
                        <div className="">
                            <span className="block text-[1rem] text-[#4136c4] mb-1 font-[400]">
                                Email
                            </span>
                            <TextField
                                size="small"
                                placeholder="example@gmail.com"
                                className="bg-[#e7eaf7] w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <span className="block text-[1rem] text-[#4136c4] mb-1 font-[400]">
                                Mật khẩu
                            </span>
                            <OutlinedInput
                                className="bg-[#e7eaf7] w-full"
                                placeholder="123456"
                                size="small"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <div className="flex justify-end">
                            <p className="text-[#4136c4] font-[400] hover:text-[#ef9530] hover:underline cursor-pointer">
                                Quên mật khẩu?
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#4136c4] text-white rounded-3xl h-10 hover:opacity-90"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-[#666] text-[1rem] font-[350]">
                            Bạn chưa có tài khoản?
                        </span>
                        <a href="/register" className="text-[#4136c4] ml-1">
                            Đăng ký ngay
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
