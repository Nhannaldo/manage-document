import Link from 'next/link';
interface ExamQuestionItemProps {
    index: number;
    subject: string; // Tên môn học
    totalQuestions: number; // Tổng số câu hỏi
    examId: string;
}
const ExamQuestionItem: React.FC<ExamQuestionItemProps> = ({
    index,
    subject,
    totalQuestions,
    examId,
}) => {
    return (
        // <div className="flex items-center p-2 bg-[#ededed] rounded-md">
        <div className="flex items-center bg-[#f6f7f8]">
            <span className="bg-[#e8eaed] p-5">
                <img src="/quiz.png" alt="icon exam" />
            </span>
            <div className="space-y-1.5 ml-3">
                <a
                    href={`/exam/${examId}`}
                    className="font-[500] hover:text-[#4da900]"
                >
                    {subject} {index + 1}
                </a>
                <h3 className="text-[#333] text-[14px]">
                    Số câu làm bài:
                    <span className="ml-1 p-1 bg-[green] rounded text-[#fff] text-[12px] font-[500]">
                        20
                    </span>
                </h3>
                <h3 className="text-[#333] text-[14px]">
                    Tổng số câu: {totalQuestions} câu
                </h3>
            </div>
        </div>
    );
};

export default ExamQuestionItem;
