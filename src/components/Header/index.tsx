'use client';
import CategoryHeader from '../CategoryHeader';
import SearchHeader from '../SearchHeader';
import LoggedIn from '../LoggedIn';

export default function Header() {
    return (
        <header
            className="border-b border-gray-200 h-[70px] flex items-center px-[70px] bg-[#fff] fixed w-full z-10"
            style={{ boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)' }}
        >
            <CategoryHeader />
            <SearchHeader />
            <LoggedIn />
        </header>
    );
}
