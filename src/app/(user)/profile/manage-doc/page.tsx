'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import TabUploadedDocument from '@/components/TabUploadedDocument';
import { useState, useEffect } from 'react';
import DocumentItem from '@/components/DocumentItem';
import { useUser } from '@/context/UserContext';
interface IDocumentItem {
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
}
export default function ManageDocument() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [downloadDocuments, setDownloadDocuments] = useState<IDocumentItem[]>(
        [],
    );
    const { user } = useUser();

    useEffect(() => {
        const fetchDownloadDocuments = async () => {
            const response = await fetch(
                `http://localhost:3001/download/get-all-document-download/${user?._id}`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch download documents');
            }
            const data = await response.json();

            // Truy cập vào documentId trong mỗi phần tử
            const documents = data.map((item: any) => item.documentId);
            setDownloadDocuments(documents);
        };
        fetchDownloadDocuments();
    }, [user?._id]);

    return (
        <div className="">
            <div className="border-b border-gray-200 pb-3">
                <h2 className="text-[24px] ">Quản lý tài liệu</h2>
            </div>
            <div className="flex items-center justify-between mt-3">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    <Tab
                        value="one"
                        label="Tài liệu upload chờ duyệt"
                        style={{ textTransform: 'none' }}
                        className="text-[16px] text-[#333]"
                    />
                    <Tab
                        value="two"
                        label="Tài liệu upload"
                        style={{ textTransform: 'none' }}
                        className="text-[16px] text-[#333]"
                    />
                    <Tab
                        value="three"
                        label="Tài liệu tải xuống"
                        style={{ textTransform: 'none' }}
                        className="text-[16px] text-[#333]"
                    />
                    {/* <Tab value="three" label="Item Three" /> */}
                </Tabs>
                {/* <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Tìm kiếm..."
                    />
                </div> */}
            </div>
            {/* Render nội dung khác nhau dựa trên tab được chọn */}
            <div className="mt-4">
                {value === 'one' && (
                    <div>
                        {/* Nội dung của tab "Tài liệu upload chờ duyệt" */}
                        <TabUploadedDocument statusFilter={'pending'} />
                    </div>
                )}
                {value === 'two' && (
                    <div>
                        {/* Nội dung của tab "Tài liệu upload" */}
                        <TabUploadedDocument statusFilter={'approved'} />
                    </div>
                )}
                {value === 'three' && (
                    <div>
                        {/* Document List */}
                        <ul className="grid grid-cols-4 gap-3 mt-4">
                            {downloadDocuments.map((item, index) => (
                                <li
                                    className="bg-[#fff] border border-[#ececec] hover:translate-y-[-4px]"
                                    key={item._id}
                                >
                                    <DocumentItem props={item} />
                                </li>
                            ))}
                        </ul>
                        {downloadDocuments.length === 0 && (
                            <div className="text-center text-gray-500 mt-4">
                                Không có tài liệu nào.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
