'use client';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import DocumentSearchItem from '../DocumentSearchItem';
import PopperWrapper from '../PoperWrapper';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import useDebounce from '@/utils/hooks/useDebounce';

export default function SearchHeader() {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const router = useRouter();

    //người dùng ngừng gõ 500ms , khi đó giá trị debouced này mới được update bằng giá trị mới nhất của searchValue
    const debouncedValue = useDebounce(query, 600);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/search/${query}`);
            setQuery('');
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchSearchDocuments = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/documents/search?q=${encodeURIComponent(
                        debouncedValue,
                    )}`,
                );
                if (!response.ok) {
                    throw new Error('Error fetching search results');
                }
                const data = await response.json();
                setSearchResult(data);
            } catch (err) {
                console.log('Failed to fetch results.');
            }
        };

        fetchSearchDocuments();
    }, [debouncedValue]);

    const handleItemClick = () => {
        setShowResult(false); // Close the popover
        setQuery('');
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className="w-[680px] relative top-1" {...attrs}>
                    <PopperWrapper>
                        <h3 className="text-[#ccc] px-3 py-1">Kết quả</h3>
                        {searchResult.map((result, index) => (
                            <DocumentSearchItem
                                key={index}
                                result={result}
                                onClick={handleItemClick}
                            />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={() => setShowResult(false)}
        >
            <div className="flex flex-[2] items-center border border-[#ccc] h-[38px] rounded-[50px] w-full bg-[#fff] ml-5">
                <input
                    ref={inputRef}
                    value={query}
                    type="text"
                    className="h-full outline-none w-full rounded-tl-[50px] rounded-bl-[50px] pl-4"
                    placeholder="Tìm kiếm tài liệu, đề thi, bài giảng,..."
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={(e) => setShowResult(true)}
                />
                {!!query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setSearchResult([]);
                            inputRef.current?.focus();
                        }}
                    >
                        <CancelIcon
                            fontSize="inherit"
                            className="text-[#666] relative top-[-1px] mr-[10px]"
                        />
                    </button>
                )}
                <span className="w-[1px] bg-[#ccc] h-[80%] mr-[10px]"></span>
                <button className="pr-3" onClick={handleSearch}>
                    <SearchIcon className="text-[#2259a2]" />
                </button>
            </div>
        </HeadlessTippy>
    );
}
