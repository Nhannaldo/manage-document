'use client';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import Cookies from 'js-cookie';
import TextField from '@mui/material/TextField';

export default function Information() {
    const { user, setUser } = useUser();

    const [isOpen, setIsOpen] = useState(false);

    const [username, setUsername] = useState(user?.username || '');
    const [address, setAddress] = useState(user?.address || '');
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
    const [phone, setPhone] = useState(user?.phone || '');

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setAddress(user.address);
            setDateOfBirth(user.dateOfBirth);
            setPhone(user.phone);
        }
    }, [user]);

    async function handleSave() {
        // Lấy accessToken từ cookie
        const token = Cookies.get('accessToken');
        console.log('Token', token);

        try {
            const response = await fetch(
                `http://localhost:3001/users/update-profile/${user._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
                    },
                    body: JSON.stringify({
                        username,
                        address,
                        dateOfBirth,
                        phone,
                    }),
                    credentials: 'include', // Đảm bảo cookies được gửi cùng request
                },
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedUser = await response.json();
            setUser(updatedUser); // Cập nhật thông tin người dùng
            closeModal(); // Đóng modal sau khi lưu thành công
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Đã xảy ra lỗi trong quá trình cập nhật hồ sơ.');
        }
    }
    return (
        <>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h2 className="text-[24px] ">Thông tin cá nhân</h2>
                <div
                    className="flex items-center gap-1 text-[#999999] hover:text-[#00a888] cursor-pointer"
                    onClick={openModal}
                >
                    <BorderColorOutlinedIcon fontSize="small" />
                    Sửa thông tin
                </div>
            </div>
            <div className="text-[#333]">
                <div className="flex items-center mt-3">
                    <p className="min-w-[200px]">Ngày sinh</p>
                    {dateOfBirth
                        ? new Date(dateOfBirth).toLocaleDateString('en-GB')
                        : ''}
                </div>

                <div className="flex items-center mt-3">
                    <p className="min-w-[200px]">Số điện thoại</p>
                    {phone}
                </div>
                <div className="flex items-center mt-3">
                    <p className="min-w-[200px]">Địa chỉ</p>
                    {address}
                </div>
                <div className="flex items-center mt-3">
                    <p className="min-w-[200px]">Email</p>
                    {user?.email}
                </div>
            </div>

            {/* Modal Background */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    {/* Modal Content */}
                    <div className="bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg p-6 relative">
                        {/* Close Icon */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition text-[24px] w-9 hover:bg-[#ccc]"
                        >
                            &times;
                        </button>

                        {/* Modal Title */}
                        <h2 className="text-2xl mb-4 border-b border-gray-200 pb-3">
                            Cập nhật thông tin
                        </h2>

                        {/* User Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">
                                    Tên đăng nhập
                                </label>
                                <TextField
                                    size="small"
                                    placeholder="Nhập tên đăng nhập"
                                    className="w-full"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">
                                    Ngày sinh
                                </label>
                                <TextField
                                    size="small"
                                    placeholder="Nhập ngày sinh"
                                    className="w-full"
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) =>
                                        setDateOfBirth(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">
                                    Số điện thoại
                                </label>
                                <TextField
                                    size="small"
                                    placeholder="Nhập số điện thoại"
                                    className="w-full"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">
                                    Địa chỉ
                                </label>
                                <TextField
                                    size="small"
                                    placeholder="Nhập địa chỉ"
                                    className="w-full"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end space-x-2 border-t border-gray-200 pt-3">
                            <button
                                onClick={closeModal}
                                className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
