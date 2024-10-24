import ExamQuestionItem from '@/components/ExamQuestionItem';

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
                <div className="p-4 bg-[#fff] rounded-e-lg rounded-es-lg">
                    {/* Level 1 và Level 2 */}
                    <div className="grid grid-cols-2 gap-6">
                        <ExamQuestionItem />
                        <ExamQuestionItem />
                        <ExamQuestionItem />
                    </div>
                </div>
            </div>
        </div>
    );
}
