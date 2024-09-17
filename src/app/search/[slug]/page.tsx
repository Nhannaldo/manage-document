'use client';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

//folder
import SearchResultItem from '@/components/SearchResultItem';
export default function Search() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const { slug } = useParams(); // Lấy slug từ dynamic route
    console.log('slug', slug);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (slug) {
            const fetchDocuments = async () => {
                setLoading(true);
                try {
                    const response = await fetch(
                        `http://localhost:3001/documents/search?q=${slug}`,
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
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
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
            <div className="flex gap-4 mt-[32px]">
                <div className="flex items-center gap-2">
                    <span>Danh mục</span>
                    <Select
                        value={age}
                        onChange={handleChange}
                        size="small"
                        className="min-w-[140px]"
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <span>Loại file</span>
                    <Select
                        value={age}
                        onChange={handleChange}
                        size="small"
                        className="min-w-[120px]"
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <span>Độ dài</span>
                    <Select
                        value={age}
                        onChange={handleChange}
                        size="small"
                        className="min-w-[180px]"
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <span>Sắp xếp</span>
                    <Select
                        value={age}
                        onChange={handleChange}
                        size="small"
                        className="min-w-[140px]"
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </div>
            </div>
            {results.length > 0 ? (
                <div className="mt-14">
                    <div className="grid grid-cols-12">
                        <div className="col-span-9">
                            {results.map((result, index) => (
                                <SearchResultItem key={index} result={result} />
                            ))}
                            <div className="flex justify-center mt-10">
                                <Pagination count={5} size="large" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No results found</div>
            )}
        </div>
    );
}
