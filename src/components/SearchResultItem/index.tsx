import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
export default function SearchResultItem() {
    return (
        <div
            className="p-4 rounded-md bg-[#fff] mb-4"
            style={{
                boxShadow:
                    '0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)',
            }}
        >
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <span className="absolute text-white text-[9px] font-bold bg-[#e2574c] rounded-md w-6 h-6 flex items-center justify-center">
                        PDF
                    </span>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/quantrimang.jpg?alt=media&token=4cf805ee-2ad1-45f4-869d-09790bdbb45f"
                        alt="ảnh tài liệu"
                        className="rounded-md border border-[#e5e7eb]"
                    />
                </div>
                <div className="flex-[6]">
                    <a href="" className="text-[20px] font-[600]">
                        Kế toán quản trị eg33
                    </a>
                    <p className="mt-2">
                        Thông tin thích hợp Chi phí trong kế toán quản trị sử
                        dụng trên khía cạnh nào.. Nhiều Chi phí gốc trong định
                        giá bán thông thường theo biến phí toàn bộ gồm: a.. Biến
                        phí toàn bộ Chi phí
                    </p>
                    <p className="text-[#717171] text-[14px] mt-[10px]">
                        Ngày đăng tải tài liệu: 06/09/2024
                    </p>

                    <div className="text-[14px] text-[#717171] mt-3">
                        <div className="flex items-center gap-2 text-[#999]">
                            <span className="flex items-end gap-1">
                                <DescriptionOutlinedIcon
                                    fontSize="small"
                                    className="relative top-[-2px]"
                                />
                                18
                            </span>
                            <span className="flex items-center gap-1">
                                <RemoveRedEyeOutlinedIcon fontSize="small" />
                                20
                            </span>
                            <span className="flex items-center gap-1">
                                <SaveAltIcon
                                    fontSize="small"
                                    className="relative top-[-2px]"
                                />
                                1
                            </span>
                            <button className="px-3 py-1 bg-[#f8ab54] text-white text-[14px] rounded-md ml-4">
                                TẢI XUỐNG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
