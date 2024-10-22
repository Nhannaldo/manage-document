'use client';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
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
    uploadedAt?: Date;
    approvedAt?: Date;
}
export default function Like() {
    const [favoriteDocuments, setFavoriteDocuments] = useState<IDocumentItem[]>(
        [],
    );
    const { user } = useUser();

    useEffect(() => {
        const fetchFavoriteDocuments = async () => {
            const response = await fetch(
                `http://localhost:3001/favorite/get-all-document-favorite/${user._id}`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch favorite documents');
            }
            const data = await response.json();

            // Truy cập vào documentId trong mỗi phần tử
            const documents = data.map((item: any) => item.documentId);
            setFavoriteDocuments(documents);
        };
        fetchFavoriteDocuments();
    }, [user._id]);
    console.log(favoriteDocuments);

    return (
        <div className="">
            <div className="border-b border-gray-200 pb-3">
                <h2 className="text-[24px]">Quản lý yêu thích</h2>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Tìm kiếm..."
                        className="w-[400px]"
                    />
                </div>
            </div>
            {/* <div className="mt-3">Hiện chưa có tài liệu yêu thích</div> */}
            <div>
                {/* Document List */}
                <ul className="grid grid-cols-4 gap-3 mt-4">
                    {favoriteDocuments.map((item, index) => (
                        <li
                            className="bg-[#fff] border border-[#ececec] hover:translate-y-[-4px]"
                            key={item._id}
                        >
                            <DocumentItem props={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
