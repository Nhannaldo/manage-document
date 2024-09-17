interface IDocSearchItem {
    result: {
        title: string;
        description: string;
    };
}
export default function DocumentSearchItem({ result }: IDocSearchItem) {
    return (
        <div className="flex items-center space-x-3 px-4 py-2 hover:bg-[#ebebeb] cursor-pointer">
            <span className="text-white text-[18px] font-[600] bg-[#086eca] rounded-md w-8 h-8 flex items-center justify-center">
                W
            </span>
            <div>
                <p>{result.title}</p>
                <span className="text-[12px] text-[#7d7d7d]">
                    {result.description}
                </span>
            </div>
        </div>
    );
}
