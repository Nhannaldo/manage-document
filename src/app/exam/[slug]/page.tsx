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
            correctAnswer: 0, // A. Mảng sắp xếp
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
            correctAnswer: 1, // B. O(n log n)
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
            correctAnswer: 0, // A. Danh sách liên kết đơn
        },
        {
            question:
                'Trong cây nhị phân, số lượng nút lá (leaf nodes) tối đa có thể có trong một cây có chiều cao h là:',
            answers: ['A. 2^h.', 'B. 2^h - 1.', 'C. 2^(h+1) - 1.', 'D. h.'],
            correctAnswer: 0, // A. 2^h
        },
        {
            question: 'Thuật toán nào sau đây là thuật toán chia để trị?',
            answers: [
                'A. Thuật toán Dijkstra.',
                'B. Thuật toán Merge Sort.',
                'C. Thuật toán Kruskal.',
                'D. Thuật toán Bellman-Ford.',
            ],
            correctAnswer: 1, // B. Thuật toán Merge Sort
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
            correctAnswer: 1, // B. Ngăn xếp
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
            correctAnswer: 1, // B. Dữ liệu phải có thứ tự sắp xếp
        },
        {
            question:
                'Độ phức tạp thời gian tốt nhất của thuật toán tìm kiếm tuyến tính (Linear Search) là:',
            answers: ['A. O(n).', 'B. O(log n).', 'C. O(1).', 'D. O(n^2).'],
            correctAnswer: 2, // C. O(1)
        },
        {
            question:
                'Cây tìm kiếm nhị phân cân bằng giúp tối ưu hóa độ phức tạp thời gian cho các phép toán tìm kiếm, chèn và xóa là:',
            answers: ['A. O(n).', 'B. O(log n).', 'C. O(n log n).', 'D. O(1).'],
            correctAnswer: 1, // B. O(log n)
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
            correctAnswer: 0, // A. Thuật toán Dijkstra
        },
    ];

    // Trạng thái lưu câu trả lời đã chọn cho mỗi câu
    const [selectedAnswers, setSelectedAnswers] = useState(
        Array(questions.length).fill(null),
    );

    const [submitted, setSubmitted] = useState(false);
    const handleAnswerClick = (questionIndex: number, answerIndex: number) => {
        if (!submitted) {
            const updatedAnswers = [...selectedAnswers];
            updatedAnswers[questionIndex] = answerIndex;
            setSelectedAnswers(updatedAnswers);
        }
    };
    const totalQuestions = 10;
    // Tính toán số câu đúng
    const handleSubmit = () => {
        setSubmitted(true);
    };

    const calculateCorrectAnswers = () => {
        return selectedAnswers.reduce((correctCount, answer, index) => {
            if (answer === questions[index].correctAnswer) {
                return correctCount + 1;
            }
            return correctCount;
        }, 0);
    };

    return (
        <div className="relative mt-4 max-w-[900px] mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Thi thử Cấu Trúc Dữ Liệu và Giải Thuật
                </h1>
                <p className="mb-4">
                    <strong>Mã đề:</strong> 2024.
                </p>
                <p className="mb-8">
                    <strong>Mức độ:</strong> Trung bình
                </p>

                {questions.map((questionObj, questionIndex) => (
                    <div
                        key={questionIndex}
                        id={`question-${questionIndex}`}
                        className="mb-6"
                    >
                        <p className="font-semibold mb-2">{`Câu ${
                            questionIndex + 1
                        }. ${questionObj.question}`}</p>
                        <div>
                            {questionObj.answers.map((answer, answerIndex) => {
                                const isCorrect =
                                    answerIndex === questionObj.correctAnswer;
                                const isSelected =
                                    selectedAnswers[questionIndex] ===
                                    answerIndex;
                                const labelClass = submitted
                                    ? isCorrect
                                        ? 'text-green-500'
                                        : isSelected && !isCorrect
                                        ? 'text-red-500'
                                        : ''
                                    : '';
                                return (
                                    <label
                                        key={answerIndex}
                                        className={`block mb-2 ${labelClass}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${questionIndex}`}
                                            checked={isSelected}
                                            onChange={() =>
                                                handleAnswerClick(
                                                    questionIndex,
                                                    answerIndex,
                                                )
                                            }
                                            className="mr-2"
                                            disabled={submitted} // Vô hiệu hóa khi nộp bài
                                        />
                                        {answer}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {/* <div className="text-center">
                    <button className="px-4 py-2 bg-[#4caf50] text-white font-[500] rounded-md hover:bg-[#85ce61]">
                        <DoneIcon fontSize="small" className="mr-2" />
                        Nộp bài
                    </button>
                </div> */}
            </div>
            {/* side right */}
            <div className="fixed top-[83px] right-[7px] rounded border shadow-md bg-[#fff] w-[250px]">
                <h2 className="text-center font-semibold border-b border-[#ccc] py-2 text-[#2a70b8]">
                    Tổng số câu hỏi: {totalQuestions}
                </h2>
                <div className="grid grid-cols-6 gap-2 justify-center p-4">
                    {questions.map((_, index) => {
                        const questionNumber = index + 1;
                        const handleScrollToQuestion = () => {
                            const questionElement = document.getElementById(
                                `question-${index}`,
                            );
                            if (questionElement) {
                                const headerOffset = 80; // Chiều cao của header
                                const elementPosition =
                                    questionElement.getBoundingClientRect()
                                        .top + window.scrollY;
                                const offsetPosition =
                                    elementPosition - headerOffset;

                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth',
                                });
                            }
                        };
                        const isAnswered = selectedAnswers[index] !== null;
                        const isCorrect =
                            selectedAnswers[index] ===
                            questions[index].correctAnswer;
                        const buttonClass = submitted
                            ? isCorrect
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            : isAnswered
                            ? 'bg-blue-500 text-white'
                            : 'border-gray-300';
                        return (
                            <button
                                key={questionNumber}
                                onClick={handleScrollToQuestion}
                                className={`w-8 h-8 rounded-full border ${buttonClass} text-[14px]`}
                            >
                                {questionNumber}
                            </button>
                        );
                    })}
                </div>

                {/* <div className="mt-4 p-4 bg-[#ccc]">
                    <div className="flex items-center gap-3">
                        <span className="inline-block w-5 h-5 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-[12px] text-[#333] font-semibold">
                            Câu hỏi đã làm
                        </span>
                    </div>
                    <div className="flex items-center mt-4 gap-3">
                        <span className="inline-block w-5 h-5 bg-white border border-gray-300 rounded-full mr-2"></span>
                        <span className="text-[12px] text-[#333] font-semibold">
                            Câu hỏi chưa làm
                        </span>
                    </div>
                </div> */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="px-[80px] border border-[#666] py-2 rounded-3xl my-4 text-[14px] hover:bg-[#4caf50] hover:text-white"
                    >
                        Nộp bài
                    </button>
                </div>
                {submitted && (
                    <div className="text-center mt-4">
                        <p className="text-xl font-bold">
                            Điểm: {calculateCorrectAnswers()}/{questions.length}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
