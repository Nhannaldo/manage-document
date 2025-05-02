export type DocumentType = {
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
};

export type Category = {
    _id: string;
    name: string;
};
export type TypeFile = {
    _id: string;
    name: string;
};

export type Subject = {
    _id: string;
    name: string;
};

export type FilterState = {
    category: string;
    typeFile: string;
    subject: string;
    pageCountRange: string;
    sort: string;
};

export type SearchResult = {
    _id: string;
    title: string;
    description: string;
    fileType: string;
    uploadedAt: string;
    views: number;
    downloads: number;
    pagenumber: number;
    imageUrl: string;
};

export type SearchResultItemProps = {
    result: SearchResult;
};
