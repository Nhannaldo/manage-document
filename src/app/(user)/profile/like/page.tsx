'use client';
import { useState, useEffect } from 'react';
import DocumentItem from '@/components/DocumentItem';
import { useUser } from '@/context/UserContext';
import type { DocumentType } from '@/types/document';

export default function Like() {
    const [favoriteDocuments, setFavoriteDocuments] = useState<DocumentType[]>(
        [],
    );
    const { user } = useUser();

    useEffect(() => {
        const fetchFavoriteDocuments = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/favorite/get-all-document-favorite/${user?._id}`,
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
    }, [user?._id]);
    console.log(favoriteDocuments);

    return (
        <div className="">
            <div className="border-b border-gray-200 pb-3">
                <h2 className="text-[24px]">Quản lý yêu thích</h2>
            </div>
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
                    {favoriteDocuments.length === 0 && (
                        <div className="mt-3">Chưa có tài liệu yêu thích</div>
                    )}
                </ul>
            </div>
        </div>
    );
}
