export default function DocumentDetail() {
    return (
        <div className="max-w-[1200px] mx-auto mt-5">
            <h1 className="text-[24px]">giáo trình ngôn ngữ lập trình perl</h1>
            <div className="flex justify-between items-center mb-5 mt-6">
                <div className="flex items-center space-x-4 text-[#999999]">
                    <span>Ngày đăng: 07/09/2024</span>
                    <span className="w-[1px] h-[20px] border border-gray-300"></span>
                    <p className="flex items-center gap-2">
                        Loại tài liệu:{' '}
                        <span className="text-white text-[18px] font-[600] bg-[#086eca] rounded-md w-8 h-8 flex items-center justify-center">
                            W
                        </span>
                    </p>
                </div>
                <ul className="flex text-center justify-end">
                    <li className="pr-3">
                        <span className="block font-bold uppercase text-gray-400 text-[12px]">
                            Số trang
                        </span>
                        <span className="font-bold text-[red]">47</span>
                    </li>
                    <li className="h-auto w-[1px] bg-[#ccc]"></li>
                    <li className="px-3">
                        <span className="block font-bold uppercase text-gray-400 text-[12px]">
                            Lượt xem
                        </span>
                        <span className="font-bold text-[red]">1.2K</span>
                    </li>
                    <li className="h-auto w-[1px] bg-[#ccc]"></li>
                    <li className="pl-3">
                        <span className="block font-bold uppercase text-gray-400 text-[12px]">
                            Lượt tải
                        </span>
                        <span className="font-bold text-[red]">458</span>
                    </li>
                </ul>
            </div>
            <div className="flex justify-end mb-5 gap-1">
                <button className="px-5 py-[10px] bg-white border text-[#999] hover:bg-[#dd098c] hover:text-white">
                    Thêm vào Bộ sưu tập
                </button>
                <button className="px-5 py-[10px] bg-[#f8ab54] text-white text-[14px]  ml-4 hover:bg-[#c80]">
                    TẢI XUỐNG
                </button>
            </div>
            <embed
                src="https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/SPEAKING.pdf?alt=media&token=a6ba7e11-d6d8-4218-905d-2588a159f06b"
                type="application/pdf"
                width="100%"
                height="600px"
            />

            <div className="mt-12">
                <h1 className="text-[24px]">NỘI DUNG TÀI LIỆU</h1>
                <div
                    className="h-[500px] bg-[#fff] rounded-md px-4 py-8 mt-6"
                    style={{
                        boxShadow:
                            '0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)',
                    }}
                >
                    <div className="h-full border border-gray-300 rounded-md py-5 pl-10">
                        <p className="pr-10">
                            Chaâu AÙ NỘI DUNG CHÍNH 1. Vò trí đòa lý và kích
                            thước của châu lục 2.Đặc điểm đòa hình và khoáng sản
                            3.Củng cố 1. Vò trí đòa lý và kích thước của châu
                            lục  Dựa vào lược đồ 1.1 sgk trang 4, hãy xác đònh
                            điểm cực Bắc và Nam phần đất liền của Châu Á?  CA
                            tiếp giáp với các Châu lục và đại dương nào? A B C D
                            9 2 0 0 k m 8 5 0 k m a. Vò trí đòa lí:  Châu Á là
                            một bộ phận của lục đòa Á – Âu  Tiếp giáp với Châu
                            Phi và Châu u  Giáp với BBD, D, TBD b. Kích thước:
                            - Rộng lớn nhất thế giới. - Kéo dài từ vòng cực Bắc
                            đến xích đạo.  1. Vò trí đòa líù và kích thước của
                            châu lục Làm cho khí hậu có sự phân hóa đa dạng và
                            mang tính lục đòa cao 2. ĐẶC ĐIỂM ĐỊA HÌNH VÀ KHOÁNG
                            SẢN NHÓM 1: 1. Điền tên một số dãy núi chính vào
                            lược đồ. 2. Xác đònh các hướng núi chính. NHÓM 2: 1.
                            Điền tên các sơn nguyên chính. 2. Núi và cao nguyên
                            tập trung chủ yếu ở khu vực nào? NHÓM 3: 1. Điền tên
                            các đồng bằng lớn và xác đònh các con sông chảy qua
                            đồng bằng đó. D a õ y U D a õ y Ñ D a õ y H D a õ y
                            C D a õ y C D a õ y Xem nội dung đầy đủ tại:
                            https://123docz.net/document/466054-bai-1-vi-tri-di-ly-dia-hinh-va-khoang-san.htm
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
