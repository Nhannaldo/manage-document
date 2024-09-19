import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export default function SidebarProfile() {
    return (
        <ul className="overflow-hidden min-h-20">
            <li className="">
                <a
                    href=""
                    className="text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff]"
                >
                    <AccountCircleOutlinedIcon />
                    Thông tin cá nhân
                </a>
            </li>
            <li className="mt-2">
                <a
                    href=""
                    className="text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff]"
                >
                    <ArticleOutlinedIcon />
                    Quản lý tài liệu
                </a>
            </li>
            <li className="mt-2">
                <a
                    href=""
                    className="text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff]"
                >
                    <ChatOutlinedIcon />
                    Quản lý hộp thư
                </a>
            </li>
            <li className="mt-2">
                <a
                    href=""
                    className="text-[#999999] flex items-center gap-2 py-2.5 px-3 border border-gray-200 rounded bg-[#fff] hover:bg-[#00a888] hover:text-[#fff]"
                >
                    <NotificationsNoneOutlinedIcon />
                    Thông báo
                </a>
            </li>
        </ul>
    );
}
