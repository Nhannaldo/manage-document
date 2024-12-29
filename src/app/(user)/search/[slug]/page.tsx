'use client';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchResultItem from '@/components/SearchResultItem';
import CircularProgress from '@mui/material/CircularProgress';
export interface FilterState {
    category: string;
    typeFile: string;
    subject: string;
    pageCountRange: string;
    sort: string;
}

interface Category {
    _id: string;
    name: string;
}

interface TypeFile {
    _id: string;
    name: string;
}

interface Subject {
    _id: string;
    name: string;
}

export default function Search() {
    const { slug } = useParams(); // Lấy slug từ dynamic route
    console.log('slug', slug);

    const [filter, setFilter] = useState<FilterState>({
        category: '',
        typeFile: '',
        subject: '',
        pageCountRange: '',
        sort: '',
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);
    const [typefiles, setTypeFiles] = useState<TypeFile[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 5; // Số phần tử mỗi trang

    // Lấy danh sách tài liệu cho trang hiện tại
    const paginatedResults = results.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const totalPages = Math.ceil(results.length / itemsPerPage);

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(
                    'http://localhost:3001/category/get-all-category',
                );
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        async function fetchTypefiles() {
            try {
                const response = await fetch(
                    'http://localhost:3001/typefile/get-all-typefile',
                );
                const data = await response.json();
                setTypeFiles(data);
            } catch (error) {
                console.error('Error fetching typefiles:', error);
            }
        }

        async function fetchSubjects() {
            try {
                const response = await fetch(
                    'http://localhost:3001/subject/get-all-subject',
                );
                const data = await response.json();
                setSubjects(data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        }

        fetchCategories();
        fetchTypefiles();
        fetchSubjects();
    }, []);

    useEffect(() => {
        if (slug) {
            const fetchDocuments = async () => {
                setLoading(true);
                try {
                    const response = await fetch(
                        `http://localhost:3001/documents/search?q=${slug}&category=${filter.category}&typeFile=${filter.typeFile}&subject=${filter.subject}&pageCountRange=${filter.pageCountRange}&sort=${filter.sort}`,
                    );
                    if (!response.ok) {
                        throw new Error('Error fetching search results');
                    }
                    const data = await response.json();
                    setResults(data);
                } catch (err) {
                    setError('Failed to fetch results.');
                } finally {
                    setLoading(false);
                }
            };

            fetchDocuments();
        }
    }, [slug, filter]);

    if (loading) {
        return (
            <div>
                <div className="flex justify-center items-center h-[400px]">
                    <CircularProgress />
                </div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleFilterChange = (field: keyof FilterState, value: string) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            [field]: value,
        }));
    };

    return (
        <div className="max-w-[1200px] mx-auto my-4">
            <h1 className="text-[24px]">
                Kết quả tìm kiếm cho từ khóa:{' '}
                {`"${
                    Array.isArray(slug)
                        ? decodeURIComponent(slug[0])
                        : decodeURIComponent(slug)
                }"`}
            </h1>
            {/* Filter */}
            <div className="bg-[#fff] border border-[#e8e8e8] px-6 h-[70px] flex space-x-6 mt-4">
                <div className="flex items-center gap-2">
                    <span>Danh mục</span>
                    <Select
                        size="small"
                        className="w-[200px]"
                        value={filter.category}
                        onChange={(e: SelectChangeEvent) =>
                            handleFilterChange('category', e.target.value)
                        }
                        MenuProps={{ disableScrollLock: true }}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span>Loại file</span>
                    <Select
                        size="small"
                        className="w-[120px]"
                        value={filter.typeFile}
                        onChange={(e: SelectChangeEvent) =>
                            handleFilterChange('typeFile', e.target.value)
                        }
                        MenuProps={{ disableScrollLock: true }}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {typefiles.map((typefile) => (
                            <MenuItem key={typefile._id} value={typefile._id}>
                                {typefile.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span>Môn học</span>
                    <Select
                        size="small"
                        className="w-[200px]"
                        value={filter.subject}
                        onChange={(e: SelectChangeEvent) =>
                            handleFilterChange('subject', e.target.value)
                        }
                        MenuProps={{ disableScrollLock: true }}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {subjects.map((subject) => (
                            <MenuItem key={subject._id} value={subject._id}>
                                {subject.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span>Độ dài</span>
                    <Select
                        size="small"
                        className="min-w-[180px]"
                        value={filter.pageCountRange}
                        onChange={(e: SelectChangeEvent) =>
                            handleFilterChange('pageCountRange', e.target.value)
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
            <div className="flex items-center gap-2 mt-5">
                <span className="mr-4 font-[600]">Sắp xếp:</span>
                <div className="flex items-center gap-[34px]">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sort"
                            value="new"
                            checked={filter.sort === 'new'} // Kiểm tra nếu `filter.sort` là 'new'
                            onChange={() => handleFilterChange('sort', 'new')}
                        />
                        <span className="ml-2">Mới đăng</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sort"
                            value="downloaded"
                            checked={filter.sort === 'downloaded'} // Kiểm tra nếu `filter.sort` là 'downloaded'
                            onChange={() =>
                                handleFilterChange('sort', 'downloaded')
                            }
                        />
                        <span className="ml-2">Tải nhiều</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sort"
                            value="viewed"
                            checked={filter.sort === 'viewed'} // Kiểm tra nếu `filter.sort` là 'viewed'
                            onChange={() =>
                                handleFilterChange('sort', 'viewed')
                            }
                        />
                        <span className="ml-2">Xem nhiều</span>
                    </label>
                </div>
            </div>

            {results.length > 0 ? (
                <div className="mt-14">
                    <div className="grid grid-cols-12">
                        <div className="col-span-9">
                            {paginatedResults.map((result, index) => (
                                <SearchResultItem key={index} result={result} />
                            ))}
                            <div className="flex justify-center mt-10">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[400px]">
                    Không có kết quả tìm kiếm.
                </div>
            )}
        </div>
    );
}
