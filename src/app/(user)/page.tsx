'use client';
import { useState, useEffect } from 'react';

import DocumentItem from '@/components/DocumentItem';

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
    uploadedAt?: string;
    approvedAt?: Date;
    hidden?: boolean;
}
export default function Home() {
    const [documentviews, setDocumentViews] = useState<IDocumentItem[]>([]);
    const [documentdownloads, setDocumentdownloads] = useState<IDocumentItem[]>(
        [],
    );
    const [documentnews, setDocumentnews] = useState<IDocumentItem[]>([]);
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/documents/top-documents`,
                );
                if (!response.ok) {
                    throw new Error('Error fetching documents');
                }
                const data = await response.json();
                setDocumentViews(data.topViewedDocuments);
                setDocumentdownloads(data.topDownloadedDocuments);
                setDocumentnews(data.newestDocuments);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);
    return (
        <div className="py-6 px-[170px]">
            <div className="grid ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[18px] font-bold text-[#006ec7]">
                        TÀI LIỆU NỔI BẬT TRONG TUẦN
                    </h2>
                    {/* <span className="text-[#2259a2]">Xem tất cả </span> */}
                </div>
                <ul className="grid grid-cols-4 gap-[24px] h-[]">
                    {documentviews.map((item, index) => {
                        // Add `hidden` dynamically before passing to the component
                        const itemWithHidden = {
                            ...item,
                            hidden: true, // Example: hide if views are zero
                        };

                        return (
                            <li
                                className="bg-[#fff] border border-[#ececec] hover:translate-y-[-4px]"
                                key={item._id}
                            >
                                <DocumentItem props={itemWithHidden} />
                            </li>
                        );
                    })}
                </ul>

                <div className="flex justify-between items-center mb-4 mt-8">
                    <h2 className="text-[18px] font-bold text-[#006ec7]">
                        TÀI LIỆU MỚI ĐĂNG
                    </h2>
                    {/* <span className="text-[#2259a2]">Xem tất cả </span> */}
                </div>
                <ul className="grid grid-cols-4 gap-[24px] h-[]">
                    {documentnews.map((item, index) => {
                        // Add `hidden` dynamically before passing to the component
                        const itemWithHidden = {
                            ...item,
                            hidden: true, // Example: hide if views are zero
                        };

                        return (
                            <li
                                className="bg-[#fff] border border-[#ececec] hover:translate-y-[-4px]"
                                key={item._id}
                            >
                                <DocumentItem props={itemWithHidden} />
                            </li>
                        );
                    })}
                </ul>

                <div className="flex justify-between items-center mb-4 mt-8">
                    <h2 className="text-[18px] font-bold text-[#006ec7]">
                        TÀI LIỆU XEM NHIỀU NHẤT MỖI TUẦN
                    </h2>
                    {/* <span className="text-[#2259a2]">Xem tất cả </span> */}
                </div>
                <ul className="grid grid-cols-4 gap-[24px] h-[]">
                    {documentdownloads.map((item, index) => {
                        // Add `hidden` dynamically before passing to the component
                        const itemWithHidden = {
                            ...item,
                            hidden: true, // Example: hide if views are zero
                        };

                        return (
                            <li
                                className="bg-[#fff] border border-[#ececec] hover:translate-y-[-4px]"
                                key={item._id}
                            >
                                <DocumentItem props={itemWithHidden} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
