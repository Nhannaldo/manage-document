import React from 'react';
import { Menu, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadIcon from '@mui/icons-material/Upload';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AccountMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    menuId: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    anchorEl,
    open,
    onClose,
    menuId,
}) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3001/auth/logout', {
                method: 'POST',
                credentials: 'include', // Quan trọng để gửi cookie cùng với yêu cầu
            });

            if (response.ok) {
                // Điều hướng người dùng về trang đăng nhập sau khi đăng xuất thành công
                console.log('đăng xuất thành công');

                router.push('/login');
            } else {
                console.error('Đăng xuất thất bại:', response.statusText);
            }
        } catch (error) {
            console.error('Lỗi trong quá trình đăng xuất:', error);
        }
    };
    return (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            open={open}
            onClose={onClose}
            onClick={onClose}
            disableScrollLock
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
            anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
            }}
            transformOrigin={{
                horizontal: 'right',
                vertical: 'top',
            }}
        >
            <Link href={'/profile'}>
                <MenuItem onClick={onClose}>
                    <Avatar />
                    Thông tin cá nhân
                </MenuItem>
            </Link>
            <MenuItem onClick={onClose}>
                <Avatar>
                    <MessageIcon />
                </Avatar>
                Quản lý tin nhắn
            </MenuItem>
            <MenuItem onClick={onClose}>
                <Avatar>
                    <UploadIcon />
                </Avatar>
                Tài liệu tải lên
            </MenuItem>
            <MenuItem onClick={onClose}>
                <Avatar>
                    <FileDownloadIcon />
                </Avatar>
                Tài liệu tải về
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
            </MenuItem>
        </Menu>
    );
};

export default AccountMenu;
