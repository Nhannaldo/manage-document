'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import textract from 'textract';
import { useUser } from '@/context/UserContext';

// import pdf from 'pdf-parse';
import {
    getDocument,
    GlobalWorkerOptions,
} from 'pdfjs-dist/legacy/build/pdf.mjs';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

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
    const { user } = useUser();

    const [documentDetails, setDocumentDetails] =
        useState<IDocumentPropItemDetail | null>(null);
    const [fileText, setFileText] = useState('');

    useEffect(() => {
        const fetchDocument = async () => {
            if (id) {
                const response = await fetch(
                    `http://localhost:3001/documents/detail/${id}`,
                );
                if (!response.ok) {
                    return; // Early return on error
                }
                const data = await response.json();

                setDocumentDetails(data);

                if (data.fileUrl) {
                    console.log('File URL:', data.fileUrl);
                    await fetchFileContent(data.fileUrl); // Call the fetchFileContent function
                } else {
                    console.warn('No fileUrl found in document data.');
                }
            }
        };

        fetchDocument();
    }, [id]);

    const fetchFileContent = async (url: string) => {
        try {
            const loadingTask = getDocument(url);

            const pdf = await loadingTask.promise; // Đảm bảo chờ promise hoàn thành

            let textContent = '';
            const numPages = pdf.numPages;

            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const content = await page.getTextContent();

                const pageText = content.items
                    .map((item) => ('str' in item ? item.str : ''))
                    .join(' ');

                textContent += pageText + '\n';
            }

            setFileText(textContent); // Cập nhật trạng thái
        } catch (error) {
            console.error('Error fetching PDF content:', error);
        }
    };

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

    const handleAddFavorite = async () => {
        try {
            const response = await fetch(
                'http://localhost:3001/favorite/create-new-favorite',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user._id,
                        documentId: id,
                    }),
                },
            );
            if (response.ok) {
                alert('Tài liệu đã được thêm vào danh sách yêu thích!');
            } else {
                const data = await response.json();
                alert(data.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error(
                'Lỗi khi thêm tài liệu vào danh sách yêu thích:',
                error,
            );
            alert('Có lỗi xảy ra khi thêm tài liệu vào danh sách yêu thích.');
        }
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
                    <button
                        className="px-5 py-[8px] bg-white border text-[#999] hover:bg-[#dd098c] hover:text-white"
                        onClick={handleAddFavorite}
                    >
                        Thêm vào Tài liệu quan tâm
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
                            <p className="pr-10 ">{fileText}</p>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
