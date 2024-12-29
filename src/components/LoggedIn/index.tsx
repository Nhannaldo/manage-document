'use client';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import UploadIcon from '@mui/icons-material/Upload';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NotificationMenu from '../NotificationMenu';
import AccountMenu from '../AccountMenu';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

interface Notification {
    userId: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}
export default function UserSection() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElNoti, setAnchorElNoti] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const openNoti = Boolean(anchorElNoti);
    const { user } = useUser();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    console.log('User:', user);
    //handle
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickNoti = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNoti(event.currentTarget);
    };

    const handleCloseNoti = () => {
        setAnchorElNoti(null);
    };

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
        <div className="flex flex-1 justify-end">
            {user ? (
                <div className="flex gap-6 items-center">
                    <Link href={'/upload'}>
                        <Button
                            variant="contained"
                            className="flex items-center gap-1"
                            sx={{ textTransform: 'none' }}
                        >
                            <UploadIcon />
                            Upload
                        </Button>
                    </Link>

                    <div>
                        <button
                            className="hover:bg-[#e5e5e5] p-[3px] rounded-full"
                            id="button"
                            aria-controls={openNoti ? 'menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openNoti ? 'true' : undefined}
                            onClick={handleClickNoti}
                        >
                            <Badge
                                badgeContent={
                                    notifications.filter((n) => !n.isRead)
                                        .length
                                }
                                color="error"
                            >
                                <NotificationsIcon
                                    className="text-[#086eca]"
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Badge>
                        </button>
                        <NotificationMenu
                            anchorEl={anchorElNoti}
                            open={openNoti}
                            onClose={handleCloseNoti}
                            menuId="menu"
                            notifications={notifications}
                        />
                    </div>

                    <div>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Tooltip title="Tài khoản">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    aria-controls={
                                        open ? 'account-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    className="p-0"
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: '#ff5722',
                                            width: 34,
                                            height: 34,
                                        }}
                                    >
                                        {user.username.charAt(0)}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <AccountMenu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            menuId="account-menu"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex gap-3 ml-6 items-center">
                    <Link href={'/login'}>
                        <Button variant="contained" className="rounded-2xl">
                            Đăng nhập
                        </Button>
                    </Link>
                    <Link href={'/register'}>
                        <Button variant="contained" className="rounded-2xl">
                            Đăng ký
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
