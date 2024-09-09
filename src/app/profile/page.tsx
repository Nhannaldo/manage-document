import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
export default function Profile() {
    return (
        <div>
            <div className="bg-[blue] w-full h-[100px]"></div>
            <div className="bg-white w-full h-[70px] flex px-[120px] relative">
                <div className="flex items-center gap-3">
                    <div className="relative bottom-[50%]">
                        <Avatar
                            sx={{
                                bgcolor: '#ff5722',
                                width: 96,
                                height: 96,
                            }}
                        >
                            <span className="text-[40px] ">N</span>
                        </Avatar>
                    </div>
                    <h3 className="text-[24px] font-[500]">Nhan Nguyen</h3>
                </div>
                <div></div>
            </div>
            <div className="mx-[10%] grid grid-cols-[20%_80%] mt-8 gap-3">
                <ul className="bg-[#fff] overflow-hidden min-h-20">
                    <li className="">
                        <a
                            href=""
                            className="text-[#999999] flex items-center gap-2 py-3 px-2.5 border border-gray-200"
                        >
                            <AccountCircleOutlinedIcon />
                            Thông tin cá nhân
                        </a>
                    </li>
                    <li className="">
                        <a
                            href=""
                            className="text-[#999999] flex items-center gap-2 py-3 px-2.5 border border-gray-200"
                        >
                            <ArticleOutlinedIcon />
                            Quản lý tài liệu
                        </a>
                    </li>
                    <li className="">
                        <a
                            href=""
                            className="text-[#999999] flex items-center gap-2 py-3 px-2.5 border border-gray-200"
                        >
                            <ChatOutlinedIcon />
                            Quản lý hộp thư
                        </a>
                    </li>
                    <li className="">
                        <a
                            href=""
                            className="text-[#999999] flex items-center gap-2 py-3 px-2.5 border border-gray-200"
                        >
                            <NotificationsNoneOutlinedIcon />
                            Thông báo
                        </a>
                    </li>
                </ul>

                <div className="bg-white rounded p-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <h2 className="text-[24px] ">Thông tin cá nhân</h2>
                        <div className="flex items-center gap-1 text-[#999999] hover:text-[#00a888] cursor-pointer">
                            <BorderColorOutlinedIcon fontSize="small" />
                            Sửa thông tin
                        </div>
                    </div>
                    <div className="text-[#333]">
                        <div className="flex items-center mt-3">
                            <p className="min-w-[200px]">Ngày sinh</p>27/10/2002
                        </div>
                        <div className="flex items-center mt-3">
                            <p className="min-w-[200px]">Giới tính</p>Nam
                        </div>
                        <div className="flex items-center mt-3">
                            <p className="min-w-[200px]">Số điện thoại</p>
                            0123456789
                        </div>
                        <div className="flex items-center mt-3">
                            <p className="min-w-[200px]">Địa chỉ</p>Bến Cát,
                            Bình Dương
                        </div>
                        <div className="flex items-center mt-3">
                            <p className="min-w-[200px]">Email</p>
                            nguyenhuunhan3354@gmail.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
