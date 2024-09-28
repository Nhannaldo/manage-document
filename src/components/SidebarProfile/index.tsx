'use client';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TopicIcon from '@mui/icons-material/Topic';
import CollectionsIcon from '@mui/icons-material/Collections';
import { usePathname } from 'next/navigation';
export default function SidebarProfile() {
    const pathname = usePathname();
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
            label: 'Quản lý bộ sưu tập',
        },
        {
            href: '/profile/manage-test',
            icon: <TopicIcon />,
            label: 'Quản lý đề thi',
        },
        {
            href: '/profile/notify',
            icon: <NotificationsNoneOutlinedIcon />,
            label: 'Thông báo',
        },
    ];
    return (
        <ul className="overflow-hidden min-h-20">
            {/* <li className="">
                <a
                    href="/profile/information"
                    className="text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff] active:bg-[#00a888]"
                >
                    <AccountCircleOutlinedIcon />
                    Thông tin cá nhân
                </a>
            </li>
            <li className="mt-2">
                <a
                    href="/profile/manage-doc"
                    className={`text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff]
                        // isActive('/profile/manage-doc')
                        //     ? 'bg-[#00a888] text-[#fff]'
                        //     : ''
                    `}
                >
                    <ArticleOutlinedIcon />
                    Quản lý tài liệu
                </a>
            </li>
            <li className="mt-2">
                <a
                    href="/profile/like"
                    className="text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff]"
                >
                    <CollectionsIcon />
                    Quản lý bộ sưu tập
                </a>
            </li>
            <li className="mt-2">
                <a
                    href="/profile/manage-test"
                    className="text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff] active:bg-[#00a888]"
                >
                    <TopicIcon />
                    Quản lý đề thi
                </a>
            </li>
            <li className="mt-2">
                <a
                    href="/profile/notify"
                    className="text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff]"
                >
                    <NotificationsNoneOutlinedIcon />
                    Thông báo
                </a>
            </li> */}
            {menuItems.map((item) => (
                <li key={item.href} className="mt-2">
                    <a
                        href={item.href}
                        className={`text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff] ${
                            pathname === item.href
                                ? 'bg-[#00a888] text-[#fff]'
                                : ''
                        }`}
                    >
                        {item.icon}
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}
