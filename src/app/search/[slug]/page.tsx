'use client';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

//folder
import SearchResultItem from '@/components/SearchResultItem';
import FilterSearch from '@/components/FilterSearch';

export interface FilterState {
    category: string;
    typeFile: string;
    subject: string;
    pageCountRange: string;
    sort: string;
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
            {/* Filter */}
            <FilterSearch filter={filter} setFilter={setFilter} />
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
