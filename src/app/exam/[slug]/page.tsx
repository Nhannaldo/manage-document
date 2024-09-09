'use client';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';

export default function ExamPage() {
    // Mảng các câu hỏi và đáp án
    const questions = [
        {
            question:
                'Cấu trúc dữ liệu nào thường được sử dụng để thực hiện thuật toán tìm kiếm nhị phân?',
            answers: [
                'A. Mảng sắp xếp.',
                'B. Danh sách liên kết.',
                'C. Cây tìm kiếm nhị phân.',
                'D. Hàng đợi.',
            ],
        },
        {
            question:
                'Độ phức tạp thời gian của thuật toán sắp xếp nhanh (Quick Sort) trong trường hợp trung bình là:',
            answers: [
                'A. O(n^2).',
                'B. O(n log n).',
                'C. O(n).',
                'D. O(log n).',
            ],
        },
        {
            question:
                'Cấu trúc dữ liệu nào phù hợp nhất để triển khai một hàng đợi (Queue)?',
            answers: [
                'A. Danh sách liên kết đơn.',
                'B. Danh sách liên kết đôi.',
                'C. Mảng.',
                'D. Cây nhị phân.',
            ],
        },
        {
            question:
                'Trong cây nhị phân, số lượng nút lá (leaf nodes) tối đa có thể có trong một cây có chiều cao h là:',
            answers: ['A. 2^h.', 'B. 2^h - 1.', 'C. 2^(h+1) - 1.', 'D. h.'],
        },
        {
            question: 'Thuật toán nào sau đây là thuật toán chia để trị?',
            answers: [
                'A. Thuật toán Dijkstra.',
                'B. Thuật toán Merge Sort.',
                'C. Thuật toán Kruskal.',
                'D. Thuật toán Bellman-Ford.',
            ],
        },
        {
            question:
                'Cấu trúc dữ liệu nào hoạt động theo nguyên tắc LIFO (Last In First Out)?',
            answers: [
                'A. Hàng đợi.',
                'B. Ngăn xếp.',
                'C. Cây nhị phân.',
                'D. Danh sách liên kết.',
            ],
        },
        {
            question:
                'Trong thuật toán tìm kiếm nhị phân, điều kiện quan trọng cần có của dữ liệu đầu vào là:',
            answers: [
                'A. Dữ liệu phải là số nguyên.',
                'B. Dữ liệu phải có thứ tự sắp xếp.',
                'C. Dữ liệu không được lặp lại.',
                'D. Dữ liệu phải được lưu trữ trong một ngăn xếp.',
            ],
        },
        {
            question:
                'Độ phức tạp thời gian tốt nhất của thuật toán tìm kiếm tuyến tính (Linear Search) là:',
            answers: ['A. O(n).', 'B. O(log n).', 'C. O(1).', 'D. O(n^2).'],
        },
        {
            question:
                'Cây tìm kiếm nhị phân cân bằng giúp tối ưu hóa độ phức tạp thời gian cho các phép toán tìm kiếm, chèn và xóa là:',
            answers: ['A. O(n).', 'B. O(log n).', 'C. O(n log n).', 'D. O(1).'],
        },
        {
            question:
                'Thuật toán nào được sử dụng để tìm đường đi ngắn nhất trong đồ thị với trọng số không âm?',
            answers: [
                'A. Thuật toán Dijkstra.',
                'B. Thuật toán Floyd-Warshall.',
                'C. Thuật toán Kruskal.',
                'D. Thuật toán Prim.',
            ],
        },
    ];

    // Trạng thái lưu câu trả lời đã chọn cho mỗi câu
    const [selectedAnswers, setSelectedAnswers] = useState(
        Array(questions.length).fill(null),
    );

    const handleAnswerClick = (questionIndex: number, answerIndex: number) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(updatedAnswers);
    };

    return (
        <div className="mt-4 max-w-[1000px] mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Thi thử Cấu Trúc Dữ Liệu và Giải Thuật
                </h1>
                <p className="mb-4">
                    <strong>Mã đề:</strong> 2024.
                </p>
                <p className="mb-8">
                    <strong>Thời gian làm bài:</strong> 50 phút.
                </p>

                {/* Hiển thị danh sách câu hỏi */}
                {questions.map((questionObj, questionIndex) => (
                    <div key={questionIndex} className="mb-6">
                        <p className="font-semibold mb-2">{`Câu ${
                            questionIndex + 1
                        }. ${questionObj.question}`}</p>
                        <div>
                            {questionObj.answers.map((answer, answerIndex) => (
                                <label key={answerIndex} className="block mb-2">
                                    <input
                                        type="radio"
                                        name={`question-${questionIndex}`}
                                        checked={
                                            selectedAnswers[questionIndex] ===
                                            answerIndex
                                        }
                                        onChange={() =>
                                            handleAnswerClick(
                                                questionIndex,
                                                answerIndex,
                                            )
                                        }
                                        className="mr-2"
                                    />
                                    <span
                                        className={
                                            selectedAnswers[questionIndex] ===
                                            answerIndex
                                                ? 'text-blue-600'
                                                : 'text-black'
                                        }
                                    >
                                        {answer}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    <button className="px-4 py-2 bg-[#4caf50] text-white font-[500] rounded-md hover:bg-[#85ce61]">
                        <DoneIcon fontSize="small" className="mr-2" />
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    );
}
