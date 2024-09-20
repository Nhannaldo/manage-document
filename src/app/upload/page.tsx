'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import ReactQuill from 'react-quill';
export default function Upload() {
    const [age, setAge] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <div className="max-w-[960px] mx-auto mt-6">
            <div className="p-4 bg-[#fff] rounded-md border border-[#eee]">
                <form action="">
                    <h1 className="text-[24px] font-[600] pb-4">
                        Đăng tài liệu
                    </h1>
                    <ul className="pb-5 border-b border-gray-200">
                        <li className="mb-4">
                            <label className="block">Tên tài liệu</label>
                            <TextField
                                variant="outlined"
                                size="small"
                                className="w-full my-1"
                                placeholder="Nhập tên tài liệu"
                            />
                        </li>
                        <li className="mb-4">
                            <label className="block">Nội dung tài liệu</label>
                            <div className="ckeditor-container">
                                <ReactQuill
                                    value={editorContent}
                                    onChange={setEditorContent}
                                />
                            </div>
                        </li>
                        <li className="mb-4">
                            <label className="block">Hình ảnh</label>
                            <div className="flex gap-4 items-center">
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    className="w-full my-1"
                                    placeholder="Ví dụ: http://domain.com/image/example.jpg"
                                />
                                <button className="bg-[#eb560d] w-[40px] h-[40px] rounded-[50%]">
                                    <UpgradeOutlinedIcon
                                        className="text-[#fff]"
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </button>
                            </div>
                            <div className="w-[96px] h-[96px] bg-[#d1d1d1] rounded mt-3 flex items-center justify-center">
                                <span className="text-[#999] text-[14px]">
                                    300x300
                                </span>
                            </div>
                            <Button
                                className="mt-3"
                                variant="outlined"
                                sx={{ textTransform: 'none' }}
                            >
                                Xóa ảnh
                            </Button>
                        </li>
                        <li className="mb-4">
                            <label className="block">Danh mục tài liệu</label>
                            <Select
                                value={age}
                                onChange={handleChange}
                                size="small"
                                className="w-full my-1"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </li>
                        <li className="mb-4">
                            <label className="block">Thuộc môn</label>
                            <Select
                                value={age}
                                onChange={handleChange}
                                size="small"
                                className="w-full my-1"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </li>
                        <li className="mb-4">
                            <label className="block">File tài liệu</label>
                            <TextField
                                variant="outlined"
                                size="small"
                                className="w-full my-1"
                                type="file"
                            />
                        </li>
                        <li className="mb-4 flex items-center gap-3">
                            <span>Số trang tài liệu</span>
                            <TextField
                                variant="outlined"
                                size="small"
                                className="my-1"
                                type="number"
                                placeholder="0"
                                disabled
                            />
                        </li>
                        <li className="mb-4 flex items-center gap-1">
                            <input type="checkbox" checked disabled />
                            <label className="block">
                                Tôi đồng ý với{' '}
                                <a
                                    href=""
                                    className="text-[blue] hover:text-[#eb560d]"
                                >
                                    Chính sách và điều khoản
                                </a>{' '}
                                sử dụng.
                            </label>
                        </li>
                    </ul>
                    <div className="flex items-center gap-2 my-4 justify-end">
                        <Button
                            variant="outlined"
                            sx={{ textTransform: 'none' }}
                        >
                            <a href="">Trở về</a>
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ textTransform: 'none' }}
                        >
                            Đăng tài liệu
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
