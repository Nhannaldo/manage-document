import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

interface SearchResultItemProps {
    result: {
        _id: string;
        title: string;
        description: string;
        fileType: string; // e.g., PDF, DOC, etc.
        uploadedAt: string;
        views: number;
        downloads: number;
        pagenumber: number;
        imageUrl: string; // Thumbnail URL for document preview
    };
}
export default function SearchResultItem({ result }: SearchResultItemProps) {
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
                        src={result.imageUrl}
                        alt="ảnh tài liệu"
                        className="rounded-md border border-[#e5e7eb]"
                    />
                </div>
                <div className="flex-[6]">
                    <a
                        href={`/document-detail/${result._id}`}
                        className="text-[20px] font-[600]"
                    >
                        {result.title}
                    </a>
                    <p className="mt-2">{result.description}</p>
                    <p className="text-[#717171] text-[14px] mt-[10px]">
                        Ngày đăng tải tài liệu:{' '}
                        {new Date(result.uploadedAt).toLocaleDateString()}
                    </p>

                    <div className="text-[14px] text-[#717171] mt-3">
                        <div className="flex items-center gap-2 text-[#999]">
                            <span className="flex items-end gap-1">
                                <DescriptionOutlinedIcon
                                    fontSize="small"
                                    className="relative top-[-2px]"
                                />
                                {result.pagenumber}
                            </span>
                            <span className="flex items-center gap-1">
                                <RemoveRedEyeOutlinedIcon fontSize="small" />
                                {result.views}
                            </span>
                            <span className="flex items-center gap-1">
                                <SaveAltIcon
                                    fontSize="small"
                                    className="relative top-[-2px]"
                                />
                                {result.downloads}
                            </span>
                            <button className="px-3 py-1 bg-[#f8ab54] text-white text-[14px] rounded-md ml-4">
                                <a href={`/document-detail/${result._id}`}>
                                    {' '}
                                    TẢI XUỐNG
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
