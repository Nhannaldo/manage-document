'use client';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import Link from 'next/link';
//search
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import DocumentSearchItem from '../DocumentSearchItem';

// profile
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// folder
import CategoryHeader from '@/components/CategoryHeader';
import NotificationMenu from '../NotificationMenu';
import AccountMenu from '../AccountMenu';
import PopperWrapper from '../PoperWrapper';
import { dividerClasses } from '@mui/material';
export default function Header() {
    //category header

    const [showCategory, setShowCategory] = useState(false);
    const handleToggleCategory = (isOpen: boolean) => {
        setShowCategory(isOpen);
    };

    //profile
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Notification
    const [anchorElNoti, setAnchorElNoti] = React.useState<null | HTMLElement>(
        null,
    );
    const openNoti = Boolean(anchorElNoti);
    const handleClickNoti = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNoti(event.currentTarget);
    };

    const handleCloseNoti = () => {
        setAnchorElNoti(null);
    };

    // có user
    const [user, setUser] = useState(true);
    return (
        <header
            className="border-b border-gray-200 h-[70px] flex items-center px-[70px] bg-[#fff] fixed w-full z-10"
            style={{ boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)' }}
        >
            {/* Logo and Category */}
            <div className="flex items-center flex-1">
                <Link href={'/'}>
                    <div className="w-[200px]">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/TaiLieuLogo.png?alt=media&token=184aec34-16d8-44a2-a16f-63d596bde1f1"
                            alt="logo"
                        />
                    </div>
                </Link>
                <div
                    className="relative flex gap-2 p-2 rounded items-center hover:bg-[#f1f1f1] hover:cursor-pointer"
                    onMouseEnter={() => handleToggleCategory(true)}
                    onMouseLeave={() => handleToggleCategory(false)}
                >
                    <MenuIcon className="" />
                    <span className="text-[18px]">Danh mục</span>

                    {showCategory && (
                        <div className="absolute top-[56.5px] right-[50px]">
                            <div className="absolute bg-no-repeat h-[20px] w-[320px] top-[-20px]"></div>
                            <CategoryHeader />
                        </div>
                    )}
                </div>
            </div>

            {/* Search */}
            <Tippy
                interactive
                visible={false}
                render={(attrs) => (
                    <div className="w-[680px] relative top-1" {...attrs}>
                        <PopperWrapper>
                            <h3 className="text-[#ccc] px-3 py-1">Kết quả</h3>
                            <DocumentSearchItem />
                            <DocumentSearchItem />
                            <DocumentSearchItem />
                            <DocumentSearchItem />
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className="flex flex-[2] items-center border border-[#ccc] h-[38px] rounded-[50px] w-full bg-[#fff] ml-5">
                    <input
                        type="text"
                        className="h-full outline-none w-full rounded-tl-[50px] rounded-bl-[50px] pl-4"
                        placeholder="Tìm kiếm tài liệu, đề thi, bài giảng,..."
                    />
                    <Link href={'/search/công'}>
                        <button className="pr-3">
                            <SearchIcon className="text-[#2259a2]" />
                        </button>
                    </Link>
                </div>
            </Tippy>
            {/* Account */}
            <div className="flex flex-1 justify-end">
                {user === true ? (
                    <div className="flex gap-6 items-center">
                        <Button
                            variant="contained"
                            className="flex items-center gap-1"
                            sx={{ textTransform: 'none' }}
                        >
                            <UploadIcon />
                            Upload
                        </Button>

                        <div>
                            <button
                                className="hover:bg-[#e5e5e5] p-[3px] rounded-full"
                                id="button"
                                aria-controls={openNoti ? 'menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openNoti ? 'true' : undefined}
                                onClick={handleClickNoti}
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon
                                        className="text-[#4136c4]"
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Badge>
                            </button>
                            <NotificationMenu
                                anchorEl={anchorElNoti}
                                open={openNoti}
                                onClose={handleCloseNoti}
                                menuId="menu"
                            />
                        </div>
                        {/* account */}
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
                                        aria-expanded={
                                            open ? 'true' : undefined
                                        }
                                        className="p-0"
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: '#ff5722',
                                                width: 34,
                                                height: 34,
                                            }}
                                        >
                                            N
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
                        <Button variant="contained" className="rounded-2xl">
                            Đăng nhập
                        </Button>
                        <Button variant="contained" className="rounded-2xl">
                            Đăng ký
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}
