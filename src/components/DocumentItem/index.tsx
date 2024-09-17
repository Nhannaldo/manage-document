import HistoryIcon from '@mui/icons-material/History';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
interface IDocItem {
    pathimg: string;
    title: string;
    date?: string;
    typedoc?: string;
    page: number;
    view: number;
    dowload: number;
}

export default function DocumentItem(props: IDocItem) {
    const { pathimg, title, date, typedoc, page, view, dowload } = props;
    return (
        <div
            className="p-4 h-full"
            style={{
                boxShadow:
                    '0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)',
            }}
        >
            <a href="" className="block hover:text-[#2a65ab]">
                <div className="flex justify-center h-[200px]">
                    <img
                        src={pathimg}
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
                    title={title}
                >
                    {title}
                </div>
            </a>
            <div className="text-[13px] text-[#717171] mt-4">
                <div className="flex items-center justify-between">
                    {date && (
                        <div className="flex items-center gap-1">
                            <HistoryIcon fontSize="small" />
                            {date}
                        </div>
                    )}
                    {typedoc && <span>Loại tài liệu: {typedoc}</span>}
                </div>

                <div className="flex items-center mt-4 justify-end gap-2 text-[#999]">
                    <span className="flex items-end gap-1">
                        <DescriptionOutlinedIcon
                            fontSize="small"
                            className="relative top-[-2px]"
                        />
                        {page}
                    </span>
                    <span className="flex items-center gap-1">
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                        {view}
                    </span>
                    <span className="flex items-center gap-1">
                        <SaveAltIcon
                            fontSize="small"
                            className="relative top-[-2px]"
                        />
                        {dowload}
                    </span>
                </div>
            </div>
        </div>
    );
}
