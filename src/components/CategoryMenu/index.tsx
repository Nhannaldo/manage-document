export default function CategoryMenu() {
    return (
        <div className="w-[270px] bg-[#fff]">
            <ul className="border border-[#e0e0e0]">
                <li className="text-[#3369aa] font-[700] text-[14px] border-b border-[#e0e0e0] hover:text-[#ff5722]">
                    <a href="/file-documents" className="p-[10px] block">
                        TÀI LIỆU
                    </a>
                </li>
                <li className="text-[#3369aa] font-[700] text-[14px] border-b border-[#e0e0e0] hover:text-[#ff5722]">
                    <a href="/lesson" className="p-[10px] block">
                        BÀI GIẢNG
                    </a>
                </li>
                <li className="text-[#3369aa] font-[700] text-[14px] border-b border-[#e0e0e0] hover:text-[#ff5722]">
                    <a href="" className="p-[10px] block">
                        ĐỀ THI & KIỂM TRA
                    </a>
                </li>
                <li className="text-[#3369aa] font-[700] text-[14px] border-b border-[#e0e0e0] hover:text-[#ff5722]">
                    <a href="" className="p-[10px] block">
                        LUẬN VĂN & ĐỀ TÀI
                    </a>
                </li>
                <li className="text-[#3369aa] font-[700] text-[14px] border-b border-[#e0e0e0] hover:text-[#ff5722]">
                    <a href="/exam/thithu" className="p-[10px] block">
                        TỰ LUYỆN TRẮC NGHIỆM
                    </a>
                </li>
            </ul>
        </div>
    );
}
