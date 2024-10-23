'use client';
import { useState, useEffect } from 'react';
import DocumentItem from '../DocumentItem';
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
interface TabUploadedDocumentProps {
    statusFilter: boolean;
}
const TabUploadedDocument: React.FC<TabUploadedDocumentProps> = ({
    statusFilter,
}) => {
    const [uploadedDocuments, setUploadedDocuments] = useState<IDocumentItem[]>(
        [],
    );
    const { user } = useUser();

    useEffect(() => {
        const fetchUploadedDocument = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/documents/get-all-document-upload/${user._id}?status=${statusFilter}`,
                );
                if (!response.ok) {
                    throw new Error('Error fetching documents');
                }
                const data = await response.json();
                setUploadedDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };
        fetchUploadedDocument();
    }, [user._id]);
    return (
        <div>
            {/* Document List */}
            <ul className="grid grid-cols-4 gap-3 mt-4">
                {uploadedDocuments.map((item) => (
                    <li
                        className="bg-[#fff] border border-[#ececec] hover:translate-y-[-4px]"
                        key={item._id}
                    >
                        <DocumentItem props={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TabUploadedDocument;
