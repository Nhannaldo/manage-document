'use client';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TopicIcon from '@mui/icons-material/Topic';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function SidebarProfile() {
    const [activeItem, setActiveItem] = useState('/profile/information');
    const menuItems = [
        {
            href: '/profile/information',
            icon: <AccountCircleOutlinedIcon />,
            label: 'Thông tin cá nhân',
        },
        {
            href: '/profile/manage-doc',
            icon: <ArticleOutlinedIcon />,
            label: 'Quản lý tài liệu',
        },
        {
            href: '/profile/like',
            icon: <CollectionsIcon />,
            label: 'Quản lý yêu thích',
        },
        {
            href: '/profile/notify',
            icon: <NotificationsNoneOutlinedIcon />,
            label: 'Thông báo',
        },
    ];
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setActiveItem(window.location.pathname);
        }
    }, []);

    return (
        <ul className="overflow-hidden min-h-20">
            {menuItems.map((item) => (
                <li key={item.href} className="mt-2">
                    <Link
                        href={item.href}
                        onClick={() => setActiveItem(item.href)}
                        style={{
                            backgroundColor:
                                activeItem === item.href ? '#00a888' : '#fff',
                            color:
                                activeItem === item.href ? '#fff' : '#999999',
                        }}
                        className={`flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded hover:bg-[#00a888] hover:text-[#fff]`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
