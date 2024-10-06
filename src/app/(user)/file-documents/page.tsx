'use client';
import { useState, useEffect } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import FilterCategory from '@/components/FilterCategory';
import DocumentItem from '@/components/DocumentItem';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
    hidden?: boolean;
}

export default function Document() {
    const [documents, setDocuments] = useState<IDocumentItem[]>([]);
    const [sortBy, setSortBy] = useState('newest');
    const [fileType, setFileType] = useState('');
    const [pageCountRange, setPageCountRange] = useState('');
    const [subjectNames, setSubjectNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchFilteredDocuments = async () => {
            try {
                const query = new URLSearchParams({
                    ...(sortBy && { sortBy }),
                    ...(fileType && { typefileId: fileType }), // 'pdf', 'docx', etc.
                    ...(pageCountRange && { pageCountRange }),
                    ...(subjectNames.length > 0 && {
                        subjectNames: subjectNames.join(','),
                    }), // Passing selected categories to filter by subject
                }).toString();

                const response = await fetch(
                    `http://localhost:3001/documents/filter?${query}`,
                );
                if (!response.ok) {
                    throw new Error('Error fetching documents');
                }
                const data = await response.json();
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchFilteredDocuments();
    }, [sortBy, fileType, pageCountRange, subjectNames]);

    const handleFilterChange = (selectedCategories: string[]) => {
        setSubjectNames(selectedCategories);
    };

    return (
        <div className="max-w-[1280px] mx-auto grid grid-cols-12 mt-4 gap-8 px-2">
            <div className="col-span-12">
                <section>
                    <ol className="flex items-center text-gray-500 text-[15px]">
                        <li>
                            <HomeOutlinedIcon className="relative bottom-[2px]" />
                            <a href="">Trang chủ</a>
                        </li>
                        <li>
                            <NavigateNextOutlinedIcon />
                            <a href="">Công nghệ thông tin</a>
                        </li>
                        <li>
                            <NavigateNextOutlinedIcon />
                            <a href="">Kỹ thuật lập trình</a>
                        </li>
                    </ol>
                </section>
                <h1 className="h-[70px] bg-[#2a65aa] text-white leading-[70px] text-center text-[22px] font-[500] mt-1 mb-4">
                    Thư viện tài liệu
                </h1>
            </div>

            <div className="col-span-9">
                <div className="bg-[#fff] border border-[#e8e8e8] p-2 h-[70px] flex space-x-6">
                    {/* Sorting */}
                    <div className="flex items-center gap-2">
                        <span>Sắp xếp</span>
                        <Select
                            size="small"
                            className="w-[200px]"
                            value={sortBy}
                            onChange={(e: SelectChangeEvent) =>
                                setSortBy(e.target.value)
                            }
                            MenuProps={{ disableScrollLock: true }}
                        >
                            <MenuItem value="newest">Mới nhất</MenuItem>
                            <MenuItem value="mostViewed">
                                Xem nhiều nhất
                            </MenuItem>
                            <MenuItem value="mostDownloaded">
                                Tải nhiều nhất
                            </MenuItem>
                        </Select>
                    </div>

                    {/* File Type */}
                    <div className="flex items-center gap-2">
                        <span>Loại file</span>
                        <Select
                            size="small"
                            className="w-[120px]"
                            value={fileType}
                            onChange={(e: SelectChangeEvent) =>
                                setFileType(e.target.value)
                            }
                            MenuProps={{ disableScrollLock: true }}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="pdf">PDF</MenuItem>
                            <MenuItem value="docx">DOCX</MenuItem>
                            <MenuItem value="ppt">PPT</MenuItem>
                        </Select>
                    </div>

                    {/* Page Count */}
                    <div className="flex items-center gap-2">
                        <span>Độ dài</span>
                        <Select
                            size="small"
                            className="min-w-[180px]"
                            value={pageCountRange}
                            onChange={(e: SelectChangeEvent) =>
                                setPageCountRange(e.target.value)
                            }
                            MenuProps={{ disableScrollLock: true }}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="10-20">10 - 20 trang</MenuItem>
                            <MenuItem value="20-50">20 - 50 trang</MenuItem>
                            <MenuItem value="50">50 trang trở lên</MenuItem>
                        </Select>
                    </div>
                </div>

                {/* Document List */}
                <ul className="grid grid-cols-4 gap-3 mt-4">
                    {documents.map((item, index) => (
                        <li
                            className="bg-[#fff] border border-[#ececec] hover:translate-y-[-4px]"
                            key={item._id}
                        >
                            <DocumentItem props={item} />
                        </li>
                    ))}
                </ul>

                {/* Pagination */}
                <div className="flex justify-center mt-10">
                    <Pagination count={5} size="large" />
                </div>
            </div>

            <div className="col-span-3">
                <FilterCategory onFilterChange={handleFilterChange} />
            </div>
        </div>
    );
}
