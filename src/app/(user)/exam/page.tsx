'use client';
import { useEffect, useState } from 'react';
import ExamQuestionItem from '@/components/ExamQuestionItem';
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
    level: string;
    subjectId: Subject;
    questions: Question[];
}
export default function Exam() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const response = await fetch(
                    'http://localhost:3001/subject/get-all-subject',
                ); // Thay bằng API thực tế của bạn
                const data = await response.json();
                setSubjects(data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        }
        fetchSubjects();
    }, []);

    async function fetchExams() {
        if (selectedSubject) {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:3001/exams/get-all-exam-subject/${selectedSubject}`,
                );
                const data = await response.json();
                setExams(data); // Lưu dữ liệu đề thi vào state
            } catch (error) {
                console.error('Error fetching exam:', error);
            } finally {
                setLoading(false); // End loading
            }
        }
    }

    const handleSubjectChange = (event: any) => {
        setSelectedSubject(event.target.value);
    };
    console.log('select', selectedSubject);

    console.log('subject', subjects);
    console.log('exam', exams);

    return (
        <div className="w-[1280px] mx-auto mt-4">
            <div className="flex items-center space-x-4 ">
                <div className="relative">
                    <select
                        className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 text-gray-600"
                        onChange={handleSubjectChange}
                    >
                        <option>CHỌN MÔN</option>
                        {subjects.map((subject) => (
                            <option key={subject._id} value={subject._id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={fetchExams}
                >
                    Tìm kiếm
                </button>
            </div>
            {loading ? (
                // Hiển thị trạng thái loading
                <div className="text-center text-gray-500">
                    <CircularProgress />
                </div>
            ) : exams && exams.length > 0 ? (
                <div className="border rounded-lg shadow-lg mt-4">
                    {/* Tiêu đề môn học */}
                    <div className="bg-blue-600 text-white text-center py-2 font-semibold">
                        Đề trắc nghiệm
                    </div>

                    {/* Nội dung phần bài tập */}
                    <div className="p-4 bg-[#fff] rounded-e-lg rounded-es-lg">
                        {/* Level 1 và Level 2 */}
                        <div className="grid grid-cols-2 gap-6">
                            {exams.map((exam, index) => (
                                <ExamQuestionItem
                                    key={index}
                                    examId={exam._id}
                                    index={index}
                                    subject={exam.subjectId.name} // Tên môn học
                                    level={exam.level} // Mức độ
                                    totalQuestions={exam.questions.length} // Tổng số câu hỏi
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // Hiển thị nếu không có đề thi
                <div className="text-center text-gray-500">
                    Không có đề thi nào.
                </div>
            )}
        </div>
    );
}
