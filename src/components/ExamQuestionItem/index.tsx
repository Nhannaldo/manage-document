export default function ExamQuestionItem() {
    return (
        // <div className="flex items-center p-2 bg-[#ededed] rounded-md">
        <div className="flex items-center bg-[#f6f7f8]">
            <span className="bg-[#e8eaed] p-5">
                <img src="/quiz.png" alt="icon exam" />
            </span>
            <div className="space-y-1.5 ml-3">
                <a
                    href="/exam/cautrucdulieugiaithuat"
                    className="font-[500] hover:text-[#4da900]"
                >
                    Đề trắc nghiệm cấu trúc giải thuật 1
                </a>
                <h3 className="text-[#333] text-[14px]">
                    Mức độ:{' '}
                    <span className="p-1 bg-[green] rounded text-[#fff] text-[12px] font-[500]">
                        Trung bình
                    </span>
                </h3>
                <h3 className="text-[#333] text-[14px]">Tổng số câu: 40 câu</h3>
            </div>
        </div>
    );
}
