'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import textract from 'textract';
// import pdf from 'pdf-parse';
interface IDocumentPropItemDetail {
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
    uploadedAt?: Date;
    approvedAt?: Date;
    hidden?: boolean;
}
export default function DocumentDetail() {
    const { id } = useParams();

    const [documentDetails, setDocumentDetails] =
        useState<IDocumentPropItemDetail | null>(null);
    const [fileText, setFileText] = useState<string | null>(null);

    useEffect(() => {
        // Fetch document data by ID from your API or backend
        const fetchDocument = async () => {
            if (id) {
                const response = await fetch(
                    `http://localhost:3001/documents/detail/${id}`,
                ); // Your API to fetch document by ID
                if (!response.ok) {
                    throw new Error('Error fetching documents');
                }
                const data = await response.json();
                setDocumentDetails(data);
                // if (data.fileUrl) {
                //     fetchFileContent(data.fileUrl);
                // }
            }
        };
        // Fetch file content using textract
        // const fetchFileContent = async (url: string) => {
        //     const response = await fetch(url);
        //     const blob = await response.blob(); // Lấy Blob từ response

        //     // Chuyển đổi Blob thành ArrayBuffer
        //     const arrayBuffer = await blob.arrayBuffer();
        //     const buffer = Buffer.from(arrayBuffer); // Chuyển đổi ArrayBuffer thành Buffer

        //     // Sử dụng textract để lấy text
        //     textract.fromBufferWithName(
        //         'document.pdf',
        //         buffer,
        //         (error, text) => {
        //             if (error) {
        //                 console.error('Error extracting text:', error);
        //             } else {
        //                 setFileText(text);
        //             }
        //         },
        //     );
        // };

        // Fetch file content using pdf-parse
        // const fetchFileContent = async (url: string) => {
        //     try {
        //         const response = await fetch(url);
        //         const pdfData = await response.arrayBuffer(); // Nhận dữ liệu dưới dạng ArrayBuffer

        //         // Sử dụng pdf-parse để trích xuất văn bản
        //         const data = await pdf(Buffer.from(pdfData));
        //         setFileText(data.text); // Cập nhật nội dung văn bản
        //     } catch (error) {
        //         console.error('Error reading PDF file:', error);
        //     }
        // };
        fetchDocument();
    }, [id]);

    console.log('filetext', fileText);

    if (!documentDetails) {
        return <div>Loading...</div>;
    }
    const downloadFile = async () => {
        const response = await fetch(documentDetails.fileUrl);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${documentDetails.title}.pdf`; // Đặt tên cho tệp
        link.click();
        alert('Tải xuống file thành công!');
    };
    return (
        <div className="max-w-[1200px] mx-auto mt-5">
            <h1 className="text-[24px]">{documentDetails.title}</h1>
            <div className="flex justify-between items-center mb-5 mt-6">
                <div className="flex items-center space-x-4 text-[#999999]">
                    <span>Ngày đăng: 25/09/2024</span>
                    <span className="w-[1px] h-[20px] border border-gray-300"></span>
                    <span>Dung lượng: 5.4 MB</span>
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
                        <span className="font-bold text-[red]">
                            {documentDetails.pagenumber}
                        </span>
                    </li>
                    <li className="h-auto w-[1px] bg-[#ccc]"></li>
                    <li className="px-3">
                        <span className="block font-bold uppercase text-gray-400 text-[12px]">
                            Lượt xem
                        </span>
                        <span className="font-bold text-[red]">
                            {documentDetails.views}
                        </span>
                    </li>
                    <li className="h-auto w-[1px] bg-[#ccc]"></li>
                    <li className="pl-3">
                        <span className="block font-bold uppercase text-gray-400 text-[12px]">
                            Lượt tải
                        </span>
                        <span className="font-bold text-[red]">
                            {documentDetails.downloads}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="flex justify-between mb-5 gap-1">
                <button className="px-5 py-[8px] bg-[#1877f2] rounded-md text-[#fff] flex items-center gap-3 hover:opacity-80">
                    <FacebookRoundedIcon />
                    Chia sẻ
                </button>
                <div>
                    <button className="px-5 py-[8px] bg-white border text-[#999] hover:bg-[#dd098c] hover:text-white">
                        Thêm vào Bộ sưu tập
                    </button>
                    <button
                        className="px-5 py-[10px] bg-[#f8ab54] text-white text-[14px]  ml-4 hover:bg-[#c80]"
                        onClick={downloadFile}
                    >
                        TẢI XUỐNG
                    </button>
                </div>
            </div>
            <embed
                src={documentDetails.fileUrl + '#toolbar=0'}
                type="application/pdf"
                width="100%"
                height="1000px"
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
                    <div className="h-full border border-gray-300 rounded-md py-5 pl-10 overflow-y-auto">
                        {fileText ? (
                            <pre className="pr-10 ">{fileText}</pre>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
