'use client';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState, useEffect } from 'react';

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

interface FilterState {
    category: string;
    typeFile: string;
    subject: string;
    pageCountRange: string;
    sort: string;
}

interface FilterSearchProps {
    filter: FilterState;
    setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}
const FilterSearch: React.FC<FilterSearchProps> = ({ filter, setFilter }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [typefiles, setTypeFiles] = useState<TypeFile[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedTypeFile, setSelectedTypeFile] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [pageCountRange, setPageCountRange] = useState('');
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(
                    'http://localhost:3001/category/get-all-category',
                ); // Replace with your actual API endpoint
                const data = await response.json();
                setCategories(data); // Store categories in state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        async function fetchTypefiles() {
            try {
                const response = await fetch(
                    'http://localhost:3001/typefile/get-all-typefile',
                ); // Replace with your actual API endpoint
                const data = await response.json();
                setTypeFiles(data); // Store categories in state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        async function fetchSubjects() {
            try {
                const response = await fetch(
                    'http://localhost:3001/subject/get-all-subject',
                ); // Replace with your actual API endpoint
                const data = await response.json();
                setSubjects(data); // Store categories in state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
        fetchTypefiles();
        fetchSubjects();
    }, []);

    const handleChange = (field: keyof FilterState, value: string) => {
        setFilter((prev) => ({ ...prev, [field]: value }));
    };
    return (
        <div className="flex flex-wrap gap-4 mt-[32px]">
            <div className="flex items-center gap-2 bg-[#fff] px-4 py-2 rounded border">
                <span>Danh mục</span>
                <Select
                    value={filter.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    size="small"
                    className="min-w-[200px]"
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className="flex items-center gap-2 bg-[#fff] px-4 py-2 rounded border">
                <span>Môn</span>
                <Select
                    value={filter.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    size="small"
                    className="min-w-[220px]"
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    {subjects.map((subject) => (
                        <MenuItem key={subject._id} value={subject._id}>
                            {subject.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className="flex items-center gap-2 bg-[#fff] px-4 py-2 rounded border">
                <span>Loại file</span>
                <Select
                    value={filter.typeFile}
                    onChange={(e) => handleChange('typeFile', e.target.value)}
                    size="small"
                    className="min-w-[120px]"
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    {typefiles.map((typefile) => (
                        <MenuItem key={typefile._id} value={typefile._id}>
                            {typefile.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className="flex items-center gap-2 bg-[#fff] px-4 py-2 rounded border">
                <span>Độ dài</span>
                <Select
                    value={filter.pageCountRange}
                    onChange={(e) =>
                        handleChange('pageCountRange', e.target.value)
                    }
                    size="small"
                    className="min-w-[180px]"
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    <MenuItem value="10-20">10 - 20 trang</MenuItem>
                    <MenuItem value="20-50">20 - 50 trang</MenuItem>
                    <MenuItem value="50">50 trang trở lên</MenuItem>
                </Select>
            </div>
            <div className="flex items-center gap-2 mt-3 ">
                <span className="mr-4 font-[600]">Sắp xếp:</span>
                <div className="flex items-center gap-[34px]">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sort"
                            value="new"
                            onChange={() => handleChange('sort', 'new')}
                        />
                        <span className="ml-2">Mới đăng</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sort"
                            value="downloaded"
                            onChange={() => handleChange('sort', 'downloaded')}
                        />
                        <span className="ml-2">Tải nhiều</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sort"
                            value="viewed"
                            onChange={() => handleChange('sort', 'viewed')}
                        />
                        <span className="ml-2">Xem nhiều</span>
                    </label>
                </div>
            </div>
        </div>
    );
};
// Wrap the component with React.memo and assign a display name
const MemoizedFilterSearch = React.memo(FilterSearch);
MemoizedFilterSearch.displayName = 'FilterSearch'; // Add this line

export default MemoizedFilterSearch;
