export default function Exam() {
    return (
        <div className="w-[1280px] mx-auto mt-4">
            <div className="flex items-center space-x-4 ">
                <div className="relative">
                    <select className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 text-gray-600">
                        <option>CHỌN MÔN</option>
                        <option>Kỹ thuật lập trình</option>
                        <option>Lập trình web</option>
                        <option>Cấu trúc dữ liệu giải thuật</option>
                        {/* Thêm các môn học khác nếu cần */}
                    </select>
                </div>
                <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                    Tìm kiếm
                </button>
            </div>
            <div className="border rounded-lg shadow-lg mt-4">
                {/* Tiêu đề môn học */}
                <div className="bg-blue-600 text-white text-center py-2 font-semibold">
                    Cấu trúc dữ liệu giải thuật
                </div>

                {/* Nội dung phần bài tập */}
                <div className="p-4">
                    {/* Level 1 và Level 2 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center p-2 bg-[#ededed] rounded-md">
                            <a
                                href="/exam/cautrucdulieugiaithuat"
                                className="flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4m4 4H6a2 2 0 01-2-2V6a2 2 0 012-2h7m5 10h-2.5"
                                    />
                                </svg>
                                Đề cấu trúc giả thuật (level trung bình)
                            </a>
                        </div>
                        <div className="flex items-center p-2 bg-[#ededed] rounded-md">
                            <a href="" className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4m4 4H6a2 2 0 01-2-2V6a2 2 0 012-2h7m5 10h-2.5"
                                    />
                                </svg>
                                Đề cấu trúc giả thuật (level khó)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
