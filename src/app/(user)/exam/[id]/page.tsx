'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
interface Question {
    _id: string;
    question: string;
    answers: string[];
    correctAnswer: number;
}
interface Subject {
    _id: string;
    name: string;
    subject: string;
}
interface Exam {
    _id: string;
    subjectId: Subject;
    questions: Question[];
}

export default function ExamSubjectPage() {
    const { id } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [exams, setExams] = useState<Exam | null>(null);
    const [subject, setSubject] = useState<Subject | null>(null);
    const [loading, setLoading] = useState(false);
    // Thời gian làm bài
    const [timeElapsed, setTimeElapsed] = useState(0); // Thời gian đã làm bài (giây)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    function shuffleArray(array: any[]) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }
        return shuffledArray;
    }
    useEffect(() => {
        async function fetchQuestions() {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:3001/exams/get-exam/${id}`,
                ); // Thay bằng API thực tế của bạn
                const data = await response.json();
                setSubject(data.subjectId);
                setExams(data);
                // Trộn câu hỏi và lấy đúng số lượng
                const totalQuestions = data.questions.length;
                const numberOfQuestionsToFetch =
                    totalQuestions < 20 ? totalQuestions : 20;
                const shuffledQuestions = shuffleArray(data.questions);
                setQuestions(
                    shuffledQuestions.slice(0, numberOfQuestionsToFetch),
                ); // Lấy toàn bộ nếu < 20 hoặc lấy 20 câu
                setSelectedAnswers(Array(numberOfQuestionsToFetch).fill(null)); // Khởi tạo trạng thái trả lời
            } catch (error) {
                console.error('Error fetching subjects:', error);
            } finally {
                setLoading(false); // End loading
            }
        }
        fetchQuestions();
        // Bắt đầu bộ đếm thời gian khi vào trang
        const startTimer = setInterval(() => {
            setTimeElapsed((prevTime) => prevTime + 1);
        }, 1000);
        setTimer(startTimer);

        return () => {
            if (startTimer) clearInterval(startTimer); // Dọn dẹp khi rời trang
        };
    }, [id]);

    // Trạng thái lưu câu trả lời đã chọn cho mỗi câu
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    console.log('select', selectedAnswers);

    const [submitted, setSubmitted] = useState(false);
    const handleAnswerClick = (questionIndex: number, answerIndex: number) => {
        if (!submitted) {
            const updatedAnswers = [...selectedAnswers];
            updatedAnswers[questionIndex] = answerIndex;
            setSelectedAnswers(updatedAnswers);
        }
    };
    const totalQuestions = 10;

    const formatTime = (seconds: number) => {
        if (seconds < 60) {
            return `${seconds} giây`;
        }
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes} phút ${secs > 0 ? `${secs} giây` : ''}`;
    };
    // Tính toán số câu đúng
    const handleSubmit = () => {
        // Kiểm tra xem có bất kỳ câu hỏi nào chưa được trả lời
        const allAnswered = selectedAnswers.every((answer) => answer !== null);

        if (!allAnswered) {
            alert('Vui lòng chọn đáp án cho tất cả các câu hỏi!');
            return; // Không thực hiện gửi nếu chưa chọn hết
        }
        setSubmitted(true);
        if (timer) clearInterval(timer); // Dừng bộ đếm thời gian khi nộp bài
    };

    const calculateCorrectAnswers = () => {
        return selectedAnswers.reduce((correctCount, answer, index) => {
            if (answer === questions[index].correctAnswer) {
                return correctCount + 1;
            }
            return correctCount;
        }, 0);
    };

    const calculateIncorrectAnswers = () => {
        return questions.length - calculateCorrectAnswers();
    };
    // Hiển thị Loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <CircularProgress />
                </div>
            </div>
        );
    }
    return (
        <div className="relative mt-4 max-w-[900px] mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Thi thử {subject?.name}
                </h1>
                <p className="mb-4">
                    <strong>Mã đề:</strong> {exams?._id}
                </p>

                {/* Kết quả thi */}
                {submitted && (
                    <div className="mt-3 bg-[#f0f0f0] mx-16 p-4">
                        <h1 className="text-center text-[20px] font-bold text-[#2a70b8] border-b pb-2">
                            Kết quả làm bài
                        </h1>
                        <p className="text-center text-xl font-bold text-[red] mb-1">
                            {(10 / questions.length) *
                                calculateCorrectAnswers()}{' '}
                            điểm
                        </p>
                        <div className="pb-3 ml-[250px] space-y-2">
                            <p className="font-[500]">
                                Số câu đúng:{' '}
                                <span className="text-[#2a70b8]">
                                    {calculateCorrectAnswers()}
                                </span>
                            </p>
                            <p className="font-[500]">
                                Số câu sai:{' '}
                                <span className="text-[#2a70b8]">
                                    {calculateIncorrectAnswers()}
                                </span>
                            </p>
                            <p className="font-[500]">
                                Thời gian làm bài:{' '}
                                <span className="text-[#2a70b8]">
                                    {formatTime(timeElapsed)}
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-center gap-5 border-t pt-4">
                            <a
                                href=""
                                className="px-7 py-[5px] bg-[#2a70b8] text-[#fff] font-[400] rounded"
                            >
                                LÀM LẠI
                            </a>
                            <div
                                className="px-7 py-[5px] bg-[#2a70b8] text-[#fff] font-[400] rounded cursor-pointer"
                                onClick={() => window.history.back()}
                            >
                                TRỞ VỀ
                            </div>
                        </div>
                    </div>
                )}
                {questions?.map((questionObj, questionIndex) => (
                    <div
                        key={questionIndex}
                        id={`question-${questionIndex}`}
                        className="mb-6 mt-4"
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
                                            disabled={submitted}
                                        />
                                        {answer}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            {/* side right */}
            <div className="fixed top-[83px] right-[7px] rounded border shadow-md bg-[#fff] w-[250px]">
                <h2 className="text-center font-semibold border-b border-[#ccc] py-2 text-[#2a70b8]">
                    Tổng số câu hỏi: {totalQuestions}
                </h2>
                <div className="grid grid-cols-6 gap-2 justify-center p-4">
                    {questions?.map((_, index) => {
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
                {/* Hiển thị thời gian */}
                {!submitted && (
                    <p className="text-center font-semibold text-red-500">
                        Thời gian: {formatTime(timeElapsed)}
                    </p>
                )}
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="px-[80px] border border-[#666] py-2 rounded-3xl my-4 text-[14px] hover:bg-[#4caf50] hover:text-white"
                    >
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    );
}
