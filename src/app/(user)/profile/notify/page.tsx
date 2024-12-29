'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { Menu, MenuItem, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
interface Notification {
    userId: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}
export default function Notify() {
    const { user } = useUser();

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const startLongPolling = () => {
        axios
            .get(`http://localhost:3001/notification/long-polling/${user?._id}`)
            .then((response) => {
                // Thêm thông báo mới vào state
                setNotifications((prevNotifications) => [
                    response.data,
                    ...prevNotifications,
                ]);
            })
            .catch((error) => {
                console.error('Error during long polling:', error);
                setTimeout(startLongPolling, 5000); // Retry sau 5 giây nếu có lỗi
            });
    };

    useEffect(() => {
        // Lấy danh sách thông báo khi component được mount
        axios
            .get(
                `http://localhost:3001/notification/get-all-notification/${user?._id}`,
            )
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {
                console.error('Error fetching notifications:', error);
            });

        // Bắt đầu long polling
        startLongPolling();
    }, [user?._id]);

    return (
        <div>
            <div className="border-b border-gray-200 pb-3">
                <h2 className="text-[24px] ">Quản lý thông báo</h2>
            </div>
            {notifications.map((notification, index) => (
                <MenuItem
                    key={index}
                    className="flex h-[68px] justify-between "
                >
                    <div className="flex items-center">
                        <Avatar>
                            <NotificationsIcon />
                        </Avatar>
                        <p className="ml-4">{notification.message}</p>
                    </div>
                    <div>
                        <CircleIcon
                            fontSize="inherit"
                            className="text-[blue] justify-end"
                        />
                    </div>
                </MenuItem>
            ))}
            {notifications.length === 0 && (
                <p className="text-center mt-5">Không có thông báo nào</p>
            )}
        </div>
    );
}
