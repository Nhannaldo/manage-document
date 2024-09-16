'use client';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import DocumentSearchItem from '../DocumentSearchItem';
import PopperWrapper from '../PoperWrapper';

export default function SearchBar() {
    return (
        <Tippy
            interactive
            visible={false}
            render={(attrs) => (
                <div className="w-[680px] relative top-1" {...attrs}>
                    <PopperWrapper>
                        <h3 className="text-[#ccc] px-3 py-1">Kết quả</h3>
                        <DocumentSearchItem />
                        <DocumentSearchItem />
                    </PopperWrapper>
                </div>
            )}
        >
            <div className="flex flex-[2] items-center border border-[#ccc] h-[38px] rounded-[50px] w-full bg-[#fff] ml-5">
                <input
                    type="text"
                    className="h-full outline-none w-full rounded-tl-[50px] rounded-bl-[50px] pl-4"
                    placeholder="Tìm kiếm tài liệu, đề thi, bài giảng,..."
                />
                <Link href={'/search/công'}>
                    <button className="pr-3">
                        <SearchIcon className="text-[#2259a2]" />
                    </button>
                </Link>
            </div>
        </Tippy>
    );
}
