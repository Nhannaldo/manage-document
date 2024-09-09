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

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };
    return (
        <div className="bg-[#4136c4] w-full h-full flex p-[1.6rem_2.4rem]">
            <div className="bg-[#f7f7f7] m-auto w-[30rem] rounded p-[1.8rem_2.4rem]">
                <h1 className="font-bold text-[#4136c4] text-center text-[1.4rem]">
                    Đăng ký tài khoản
                </h1>
                <div className="pt-8">
                    <form action="" className="flex flex-col gap-5">
                        <div className="">
                            <span className="block text-[1rem] text-[#4136c4] mb-1 font-[400]">
                                Tên đăng nhập
                            </span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder="nguyenvana"
                                className="bg-[#e7eaf7] w-full"
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

                    <div>
                        <h3 className="text-[#4136c4] font-[400] text-center mt-4">
                            Hoặc đăng nhập với
                        </h3>
                    </div>
                    <div className="mt-4">
                        <button className="flex items-center gap-[6rem] border-[0.0625rem] border-[#ccc] rounded-lg w-full h-10 hover:bg-[#ddd]">
                            <Image
                                className="ml-4"
                                src={googlelogo}
                                width={24}
                                height={24}
                                alt="ImageGoogle"
                            />
                            <div className="justify-center">
                                <span className="text-[1rem]">
                                    Đăng nhập với Google
                                </span>
                            </div>
                        </button>
                    </div>
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
