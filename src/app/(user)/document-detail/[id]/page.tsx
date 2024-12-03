'use client';
import { useParams } from 'next/navigation';
// import pdf from 'pdf-parse';
import {
    getDocument,
    GlobalWorkerOptions,
} from 'pdfjs-dist/legacy/build/pdf.mjs';
import { useEffect, useState } from 'react';
import textract from 'textract';

import { useUser } from '@/context/UserContext';
import CloseIcon from '@mui/icons-material/Close';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import FlagIcon from '@mui/icons-material/Flag';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';

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

    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmitReport = async () => {
        try {
            // Tạo chuỗi lý do theo yêu cầu
            let formattedReason = '';
            if (reason && otherReason.trim()) {
                formattedReason = `${reason} - ${otherReason.trim()}`; // Nếu có cả hai
            } else if (reason) {
                formattedReason = reason; // Nếu chỉ có lý do chọn
            } else if (otherReason.trim()) {
                formattedReason = otherReason.trim(); // Nếu chỉ có lý do khác
            } else {
                alert('Vui lòng chọn hoặc nhập lý do báo cáo!');
                return;
            }

            const reportData = {
                documentId: id,
                userId: user._id,
                reason: formattedReason,
            };

            const response = await fetch(
                'http://localhost:3001/report/create-new-report',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reportData),
                },
            );

            if (response.ok) {
                alert('Báo cáo đã được gửi thành công!');
                setReason('');
                setOtherReason('');
                handleClose();
            } else {
                const data = await response.json();
                alert(data.message || 'Gửi báo cáo không thành công!');
            }
        } catch (error) {
            console.error('Lỗi khi gửi báo cáo:', error);
            alert('Đã xảy ra lỗi khi gửi báo cáo!');
        }
    };
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
        <>
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
                    <div>
                        <button className="px-5 py-[8px] bg-[#1877f2] rounded-md text-[#fff] flex items-center gap-3 hover:opacity-80">
                            <FacebookRoundedIcon />
                            Chia sẻ
                        </button>
                    </div>
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

                <button
                    className="px-5 py-1 bg-white border text-[#086eca] hover:bg-[#ccc] mt-4 flex items-center gap-2"
                    onClick={handleOpen}
                >
                    <FlagIcon className="text-[red]" />
                    Báo xấu
                </button>
                <div className="mt-10">
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
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        bottom: '0%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        height: 650,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <div className="flex justify-between items-center pb-3 border-b ">
                        <Typography variant="h6">Báo xấu</Typography>
                        <CloseIcon
                            onClick={handleClose}
                            className="hover:cursor-pointer"
                        />
                    </div>

                    <Typography mb={2} className="mt-2">
                        Hãy cho chúng tôi biết lý do bạn muốn thông báo. Chúng
                        tôi sẽ khắc phục vấn đề này trong thời gian ngắn nhất.
                    </Typography>

                    <FormControl>
                        <RadioGroup
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        >
                            <FormControlLabel
                                value="Lỗi font chữ"
                                control={<Radio />}
                                label="Lỗi font chữ"
                            />
                            <FormControlLabel
                                value="Không xem được nội dung"
                                control={<Radio />}
                                label="Không xem được nội dung"
                            />
                            <FormControlLabel
                                value="Có nội dung khiêu dâm"
                                control={<Radio />}
                                label="Có nội dung khiêu dâm"
                            />
                            <FormControlLabel
                                value="Có nội dung chính trị, phản động"
                                control={<Radio />}
                                label="Có nội dung chính trị, phản động"
                            />
                            <FormControlLabel
                                value="Spam"
                                control={<Radio />}
                                label="Spam"
                            />
                            <FormControlLabel
                                value="Vi phạm bản quyền"
                                control={<Radio />}
                                label="Vi phạm bản quyền"
                            />
                            <FormControlLabel
                                value="Nội dung không đúng tiêu đề"
                                control={<Radio />}
                                label="Nội dung không đúng tiêu đề"
                            />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Hoặc bạn có thể nhập lý do khác vào đây"
                        multiline
                        rows={3}
                        variant="outlined"
                        margin="normal"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        onClick={handleSubmitReport}
                        style={{ textTransform: 'none' }}
                    >
                        Đồng ý
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
