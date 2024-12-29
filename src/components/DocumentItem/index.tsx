import HistoryIcon from '@mui/icons-material/History';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
interface IDocPropItem {
    props: {
        _id: string;
        title: string;
        description?: string;
        categoryId: string;
        subjectId: string;
        fileUrl: string;
        imageUrl: string;
        typefileId: string;
        pagenumber: number;
        views: number;
        downloads: number;
        uploadedBy: string;
        status: boolean;
        sharedBy?: string[];
        uploadedAt?: string;
        approvedAt?: Date;
        hidden?: boolean;
    };
}

export default function DocumentItem({ props }: IDocPropItem) {
    console.log('DocumentItem:', props);

    return (
        <div
            className="p-4 h-full relative"
            style={{
                boxShadow:
                    '0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)',
            }}
        >
            <span className="absolute top-3 left-3 text-white text-[10px] font-[700] bg-[#e2574c] rounded-md w-7 h-7 flex items-center justify-center">
                PDF
            </span>
            <a
                href={`/document-detail/${props._id}`}
                className="block hover:text-[#2a65ab]"
            >
                <div className="flex justify-center h-[200px]">
                    <img
                        src={props.imageUrl}
                        alt="ảnh tài liệu"
                        className="border border-gray-300 rounded h-full"
                    />
                </div>
                <div
                    className="mt-3 text-[#333] h-[48px] overflow-hidden"
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2, // Số dòng muốn hiển thị
                    }}
                    title={props.title}
                >
                    {props.title}
                </div>
            </a>
            <div className="text-[13px] text-[#717171] mt-4">
                {props.hidden && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <HistoryIcon fontSize="small" />
                            {props.uploadedAt &&
                                new Date(props.uploadedAt).toLocaleDateString(
                                    'en-GB',
                                )}
                        </div>
                    </div>
                )}
                <div className="flex items-center mt-4 justify-end gap-2 text-[#999]">
                    <span className="flex items-end gap-1">
                        <DescriptionOutlinedIcon
                            fontSize="small"
                            className="relative top-[-2px]"
                        />
                        {props.pagenumber}
                    </span>
                    <span className="flex items-center gap-1">
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                        {props.views}
                    </span>
                    <span className="flex items-center gap-1">
                        <SaveAltIcon
                            fontSize="small"
                            className="relative top-[-2px]"
                        />
                        {props.downloads}
                    </span>
                </div>
            </div>
        </div>
    );
}
