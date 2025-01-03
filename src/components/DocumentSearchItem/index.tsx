import Link from 'next/link';
interface IDocSearchItem {
    result: {
        _id: string;
        title: string;
        description: string;
    };
    onClick: () => void;
}
export default function DocumentSearchItem({
    result,
    onClick,
}: IDocSearchItem) {
    return (
        <Link href={`/document-detail/${result._id}`} onClick={onClick}>
            <div className="flex items-center space-x-3 px-4 py-2 hover:bg-[#ebebeb] cursor-pointer">
                <span className="text-white text-[14px] font-[600] bg-[#e2574c] rounded-md w-8 h-8 flex items-center justify-center">
                    PDF
                </span>
                <div>
                    <p>{result.title}</p>
                    <span className="text-[12px] text-[#7d7d7d]">
                        {result.description}
                    </span>
                </div>
            </div>
        </Link>
    );
}
