'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import googlelogo from '/assets/images/img-google.png';

import { useRouter } from 'next/navigation';
import { log } from 'console';

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    //register
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp không
        if (password !== confirmpassword) {
            alert('Mật khẩu và mật khẩu xác nhận không khớp.');
            return;
        }
        const newUser = {
            username,
            password,
            email,
            phone,
        };
        console.log('user', newUser);

        try {
            // Gửi yêu cầu tới API /api/register
            const response = await fetch(
                'http://localhost:3001/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                },
            );

            // Kiểm tra xem yêu cầu có thành công không
            if (response.ok) {
                alert('Đăng ký thành công!');
                router.push('/login'); // Chuyển hướng người dùng tới trang login
            } else {
                const data = await response.json();
                alert(`Lỗi đăng ký: ${data.message || 'Đã xảy ra lỗi'}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối tới API:', error);
            alert('Đã xảy ra lỗi khi đăng ký.');
        }
    };
    return (
        <div className="bg-[#4136c4] w-full h-full flex p-[1.6rem_2.4rem]">
            <div className="bg-[#f7f7f7] m-auto w-[30rem] rounded p-[1.8rem_2.4rem]">
                <h1 className="font-bold text-[#4136c4] text-center text-[1.4rem]">
                    Đăng ký tài khoản
                </h1>
                <div className="pt-8">
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="">
                            <span className="block text-[1rem] text-[#4136c4] mb-1 font-[400]">
                                Tên đăng nhập
                            </span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder="nguyenvana"
                                className="bg-[#e7eaf7] w-full"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <span className="block text-[1rem] text-[#4136c4] mb-1 font-[400]">
                                Email
                            </span>
                            <TextField
                                type="email"
                                size="small"
                                placeholder="example@gmail.com"
                                className="bg-[#e7eaf7] w-full"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <span className="block text-[1rem] text-[#4136c4] mb-1 font-[400]">
                                Số điện thoại
                            </span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder="123456789"
                                className="bg-[#e7eaf7] w-full"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <span className="block text-[1rem] text-[#4136c4] mb-1 font-[400]">
                                Mật khẩu
                            </span>
                            <OutlinedInput
                                className="bg-[#e7eaf7] w-full"
                                placeholder="*******"
                                size="small"
                                type={showPassword ? 'text' : 'password'}
                                required
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

                        <div className="">
                            <span className="block text-[1rem] text-[#4136c4] mb-1 font-[400]">
                                Nhập lại mật khẩu
                            </span>
                            <OutlinedInput
                                className="bg-[#e7eaf7] w-full"
                                placeholder="*******"
                                size="small"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmpassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
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
                        <button className="bg-[#4136c4] text-white rounded-3xl h-10 hover:opacity-90 mt-3">
                            Đăng ký
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-[#666] text-[1rem] font-[350]">
                            Bạn đã có tài khoản?
                        </span>
                        <a href="" className="text-[#4136c4] ml-1">
                            Đăng nhập
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
