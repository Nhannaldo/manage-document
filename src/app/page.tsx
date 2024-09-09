import Image from 'next/image';
import DocumentItem from '@/components/DocumentItem';

const arrayDocs = [
    {
        pathimg:
            'https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/ngonnguC.jpg?alt=media&token=cd6bc268-3af4-41f6-894f-b52766edd9ef',
        title: 'Ngôn ngữ lập trình C/C++: Chương 7: Dữ liệu kiểu tệp pdf',
        date: '26/08/2024',
        typedoc: 'PDF',
        page: 12,
        view: 657,
        dowload: 32,
    },
    {
        pathimg:
            'https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/quantrimang.jpg?alt=media&token=4cf805ee-2ad1-45f4-869d-09790bdbb45f',
        title: 'Bài 1: Giới thiệu và cài đặt Windows server 2003 ppt',
        date: '15/07/2024',
        typedoc: 'PDF',
        page: 45,
        view: 1234,
        dowload: 89,
    },
    {
        pathimg:
            'https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/hethongthongtin.jpg?alt=media&token=8d8b1b20-5894-43a7-b3ca-ec7cc67d7fb8',
        title: 'BÀI GIẢNG PHÁT TRIỂN HỆ THỐNG THÔNG TIN',
        date: '10/06/2024',
        typedoc: 'DOCX',
        page: 34,
        view: 789,
        dowload: 58,
    },
    {
        pathimg:
            'https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/test1.jpg?alt=media&token=5d0c5311-da8e-48da-a0bd-ad5e95bfc013',
        title: 'Giáo trình Xây dựng web thương mại điện tử bằng Joomla',
        date: '01/09/2024',
        typedoc: 'PDF',
        page: 25,
        view: 902,
        dowload: 67,
    },
    {
        pathimg:
            'https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/hedieuhanh1.jpg?alt=media&token=eb6fd2ca-d344-4e63-99d4-1ba00fcc60f1',
        title: 'Bài tập hệ điều hành',
        date: '01/11/2024',
        typedoc: 'DOCX',
        page: 35,
        view: 120,
        dowload: 20,
    },
    {
        pathimg:
            'https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/winCC.jpg?alt=media&token=2c50537e-5b11-40b5-a284-31313c107e59',
        title: 'Tài liệu Giáo trình giảng dạy WinCC doc',
        date: '13/10/2024',
        typedoc: 'PDF',
        page: 84,
        view: 402,
        dowload: 19,
    },
    {
        pathimg:
            'https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/%C4%91atieutrinh.png?alt=media&token=8b7c2cff-a1ba-490c-b1f6-f5a4a63e43e1',
        title: 'Đa tiểu trình một số khái niệm cơ bản',
        date: '13/08/2024',
        typedoc: 'PDF',
        page: 42,
        view: 1959,
        dowload: 8,
    },
    {
        pathimg:
            'https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/xaydungwebsite.jpg?alt=media&token=622d70cf-4b94-4774-a1ec-c80d4b390096',
        title: 'Giáo trình Hệ điều hành Linux cơ bản Chương 11',
        date: '29/07/2024',
        typedoc: 'PDF',
        page: 28,
        view: 1401,
        dowload: 14,
    },
];
export default function Home() {
    return (
        <div className="py-6 px-[170px]">
            <div className="grid ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[18px] font-bold text-[#006ec7]">
                        TÀI LIỆU MỚI
                    </h2>
                    <span className="text-[#2259a2]">Xem tất cả </span>
                </div>
                <ul className="grid grid-cols-4 gap-[24px] h-[]">
                    {arrayDocs.map((item, index) => (
                        <li
                            className="bg-[#fff] border border-[#ececec] hover:translate-y-[-4px]"
                            key={index}
                        >
                            <DocumentItem
                                pathimg={item.pathimg}
                                title={item.title}
                                date={item.date}
                                typedoc={item.typedoc}
                                page={item.page}
                                view={item.view}
                                dowload={item.dowload}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
