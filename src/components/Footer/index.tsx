import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface ILinkItem {
    title: string;
    path: string;
}
export default function Footer() {
    const arrayLinks: ILinkItem[] = [
        {
            title: 'Chính sách quy định',
            path: '',
        },
        {
            title: 'Chính sách bảo mật',
            path: '',
        },
        {
            title: 'Điều khoản sử dụng',
            path: '',
        },
        {
            title: 'Chính sách đổi trả',
            path: '',
        },
    ];

    const arraySupports: ILinkItem[] = [
        {
            title: 'Câu hỏi thường gặp',
            path: '',
        },
        {
            title: 'Hỗ trợ trực tuyến',
            path: '',
        },
        {
            title: 'Hướng dẫn sử dụng',
            path: '',
        },
    ];

    return (
        <footer className="p-[1.6rem_2.4rem] border-t border-gray-300 bg-[#fff]">
            <div className="grid grid-cols-1 gap-[5rem] md:grid-cols-4 gap-[12rem]">
                <div>
                    <h2 className="text-[1.2rem] font-bold">Giới thiệu</h2>
                    <p className="mt-3 text-[#333]">
                        TaiLieuOnThi là nền tảng học tập và ôn thi trực tuyến
                        toàn diện, nơi bạn có thể dễ dàng tìm kiếm tài liệu học
                        tập, chia sẻ kiến thức và kiểm tra trình độ của mình với
                        các bài thi thử trực tuyến. Chúng tôi cam kết cung cấp
                        môi trường học tập tốt nhất, hỗ trợ bạn chinh phục mọi
                        kỳ thi một cách tự tin và hiệu quả.
                    </p>
                </div>

                <div>
                    <h2 className="text-[1.2rem] font-bold">Chính sách</h2>
                    <ul className="mt-3 flex flex-col gap-2">
                        {arrayLinks.map((item, index) => (
                            <li key={index} className="text-[#333]">
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-[1.2rem] font-bold">Liên hệ</h2>
                    <ul className="mt-3 flex flex-col gap-2">
                        <li className="flex items-center gap-1">
                            <PhoneIcon className="text-[#4136c4]" />
                            <span className="text-[#333]">
                                Điện thoại: 0123456789
                            </span>
                        </li>
                        <li className="flex items-center gap-1">
                            <EmailIcon className="text-[#4136c4]" />
                            <span className="text-[#333]">
                                Email: support@gmail.com
                            </span>
                        </li>
                        <li className="flex items-center gap-1">
                            <LocationOnIcon className="text-[#4136c4]" />
                            <span className="text-[#333]">
                                Thới Hòa, Bến Cát, Bình Dương
                            </span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-[1.2rem] font-bold">Theo dõi</h2>
                    <li className="mt-4 flex items-center gap-3">
                        <FacebookIcon className="text-[#4136c4]" />
                        <InstagramIcon className="text-[#4136c4]" />
                        <TwitterIcon className="text-[#4136c4]" />
                        <YouTubeIcon className="text-[#4136c4]" />
                    </li>
                    <div className="mt-5">
                        <h2 className="text-[1.2rem] font-bold">Trợ giúp</h2>
                        <ul className="mt-3 flex flex-col gap-2">
                            {arraySupports.map((item, index) => (
                                <li key={index} className="text-[#333]">
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
