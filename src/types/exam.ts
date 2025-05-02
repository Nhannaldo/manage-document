export type Question = {
    _id: string;
    question: string;
    answers: string[];
    correctAnswer: number;
};

export type Subject = {
    _id: string;
    name: string;
    subject: string;
};

export type Exam = {
    _id: string;
    subjectId: Subject;
    questions: Question[];
};

export type ExamQuestionItemProps = {
    index: number;
    subject: string; // Tên môn học
    totalQuestions: number; // Tổng số câu hỏi
    examId: string;
};
