'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import { useState, useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { PDFDocument } from 'pdf-lib';

//text editor
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const cloudName = 'drakdfels';
const uploadPreset = 'upload_image';
export default function Upload() {
    const [age, setAge] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const [imageUrl, setImageUrl] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const fileImageInputRef = useRef<HTMLInputElement | null>(null);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const handleFileImageChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            await handleUpload(file);
        }
    };
    // handle upload image
    const handleUpload = async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset); // Thay YOUR_UPLOAD_PRESET bằng preset của bạn

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                {
                    method: 'POST',
                    body: formData,
                },
            );
            const data = await response.json();
            setImageUrl(data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    //handle upload file document
    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);

            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    },
                );
                const data = await response.json();
                setFileUrl(data.secure_url);

                // Đảm bảo xử lý PDF chỉ trên client-side
                const reader = new FileReader();
                reader.onload = async function () {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    const pdfDoc = await PDFDocument.load(arrayBuffer); // Tải PDF từ ArrayBuffer
                    setNumberOfPages(pdfDoc.getPageCount()); // Lấy số trang
                };
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    const openFileDialog = () => {
        fileImageInputRef.current?.click(); // Mở dialog chọn file
    };

    console.log('Page:', numberOfPages);

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
                            <div className="h-[200px]">
                                <ReactQuill
                                    value={editorContent}
                                    onChange={setEditorContent}
                                    className="h-[80%]"
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
                                    value={imageUrl} // Hiển thị URL của ảnh
                                    placeholder="Ví dụ: http://domain.com/image/example.jpg"
                                    InputProps={{
                                        readOnly: true, // Chỉ cho phép đọc
                                    }}
                                />
                                <input
                                    type="file"
                                    ref={fileImageInputRef} // Gán ref cho input file
                                    onChange={handleFileImageChange}
                                    style={{ display: 'none' }} // Ẩn input file
                                />
                                <Button
                                    className="bg-[#eb560d] hover:bg-[#eb560d]"
                                    onClick={openFileDialog} // Gọi hàm mở dialog
                                >
                                    <UpgradeOutlinedIcon
                                        className="text-[#fff]"
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Button>
                            </div>
                            {imageUrl ? (
                                <div className="w-[96px] h-[96px] mt-3 flex items-center justify-center">
                                    <img
                                        src={imageUrl}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                            ) : (
                                <div className="w-[96px] h-[96px] bg-[#d1d1d1] rounded mt-3 flex items-center justify-center">
                                    <span className="text-[#999] text-[14px]">
                                        300x300
                                    </span>
                                </div>
                            )}
                            <Button
                                className="mt-3"
                                variant="outlined"
                                sx={{ textTransform: 'none' }}
                                onClick={() => {
                                    setImageUrl(''); // Xóa URL
                                }}
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
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
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
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
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
                                onChange={handleFileChange}
                            />
                            {fileUrl && (
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    className="w-full my-1"
                                    value={fileUrl} // Hiển thị URL của ảnh
                                    placeholder="Ví dụ: http://domain.com/image/example.jpg"
                                    InputProps={{
                                        readOnly: true, // Chỉ cho phép đọc
                                    }}
                                />
                            )}
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
                                value={numberOfPages}
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
