'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import { useState, useRef, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useRouter } from 'next/navigation';

import { PDFDocument } from 'pdf-lib';
//user
import { useUser } from '@/context/UserContext';

//text editor
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const cloudName = 'drakdfels';
const uploadPreset = 'upload_image';

interface Category {
    _id: string;
    name: string;
}
interface TypeFile {
    _id: string;
    name: string;
}

interface Subject {
    _id: string;
    name: string;
}

export default function Upload() {
    const { user } = useUser();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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

    //useEffect
    const [categories, setCategories] = useState<Category[]>([]);
    const [typefiles, setTypeFiles] = useState<TypeFile[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedTypeFile, setSelectedTypeFile] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(
                    'http://localhost:3001/category/get-all-category',
                ); // Replace with your actual API endpoint
                const data = await response.json();
                setCategories(data); // Store categories in state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        async function fetchTypefiles() {
            try {
                const response = await fetch(
                    'http://localhost:3001/typefile/get-all-typefile',
                ); // Replace with your actual API endpoint
                const data = await response.json();
                setTypeFiles(data); // Store categories in state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        async function fetchSubjects() {
            try {
                const response = await fetch(
                    'http://localhost:3001/subject/get-all-subject',
                ); // Replace with your actual API endpoint
                const data = await response.json();
                setSubjects(data); // Store categories in state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
        fetchTypefiles();
        fetchSubjects();
    }, []);

    // Hàm loại bỏ các thẻ HTML và trả về văn bản thuần
    const handleDescriptionChange = (value: string) => {
        setDescription(value); // Lưu giá trị thuần vào state
    };
    // Hàm để lấy văn bản thuần khi gửi
    const getPlainText = () => {
        return description.replace(/<\/?[^>]+(>|$)/g, ''); // Loại bỏ tất cả các thẻ HTML
    };

    //handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newDoc = {
            title,
            description: getPlainText(),
            categoryId: selectedCategory,
            subjectId: selectedSubject,
            fileUrl,
            imageUrl,
            typefileId: selectedTypeFile,
            pagenumber: numberOfPages,
            uploadedBy: user._id,
        };

        // Kiểm tra các giá trị trước khi gọi API
        console.log(newDoc); // Thêm dòng này để kiểm tra các giá trị
        try {
            // Gửi yêu cầu tới API /api/register
            const response = await fetch(
                'http://localhost:3001/documents/create-new-document',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDoc),
                },
            );

            // Kiểm tra xem yêu cầu có thành công không
            if (response.ok) {
                alert('Upload tài liệu thành công!');
                router.push('/'); // Chuyển hướng người dùng tới trang login
            } else {
                const data = await response.json();
                alert(`Lỗi upload: ${data.message || 'Đã xảy ra lỗi'}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối tới API:', error);
            alert('Đã xảy ra lỗi khi đăng ký.');
        }
    };
    console.log('user:', user._id);

    console.log('description:', description);
    console.log('category:', categories);
    console.log('selectcategory:', selectedCategory);
    console.log('typefile:', typefiles);
    console.log('selecttypefile:', selectedTypeFile);
    console.log('subject:', subjects);
    console.log('selectsubject:', selectedSubject);

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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </li>
                        <li className="mb-4">
                            <label className="block">Nội dung tài liệu</label>
                            <div className="h-[200px]">
                                <ReactQuill
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="h-[80%]"
                                    style={{ direction: 'ltr' }}
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
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                size="small"
                                className="w-full my-1"
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </li>
                        <li className="mb-4">
                            <label className="block">Thuộc môn</label>
                            <Select
                                value={selectedSubject}
                                onChange={(e) =>
                                    setSelectedSubject(e.target.value)
                                }
                                size="small"
                                className="w-full my-1"
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                            >
                                {subjects.map((subject) => (
                                    <MenuItem
                                        key={subject._id}
                                        value={subject._id}
                                    >
                                        {subject.name}
                                    </MenuItem>
                                ))}
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
                        <li className="mb-4">
                            <label className="block">Loại file</label>
                            <Select
                                value={selectedTypeFile}
                                onChange={(e) =>
                                    setSelectedTypeFile(e.target.value)
                                }
                                size="small"
                                className="w-full my-1"
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                            >
                                {typefiles.map((typefile) => (
                                    <MenuItem
                                        key={typefile._id}
                                        value={typefile._id}
                                    >
                                        {typefile.name}
                                    </MenuItem>
                                ))}
                            </Select>
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
                            typeof="submit"
                            variant="contained"
                            type="submit"
                            sx={{ textTransform: 'none' }}
                            onClick={handleSubmit}
                        >
                            Đăng tài liệu
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
