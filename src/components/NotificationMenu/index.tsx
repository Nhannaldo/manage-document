import React from 'react';
import { Menu, MenuItem, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
interface NotificationMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    menuId: string;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({
    anchorEl,
    open,
    onClose,
    menuId,
}) => {
    return (
        <Menu
            id={menuId}
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            MenuListProps={{
                'aria-labelledby': 'button',
            }}
            disableScrollLock
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
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
                        width: 300,
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
            {[1, 2, 3].map((notification, index) => (
                <MenuItem
                    key={index}
                    onClick={onClose}
                    className="flex h-[68px] justify-between"
                >
                    <div className="flex items-center">
                        <Avatar>
                            <NotificationsIcon />
                        </Avatar>
                        <p className="">Bạn có 1 thông báo mới</p>
                    </div>
                    <div className="">
                        <CircleIcon
                            fontSize="inherit"
                            className="text-[blue] justify-end"
                        />
                    </div>
                </MenuItem>
            ))}
        </Menu>
    );
};

export default NotificationMenu;
