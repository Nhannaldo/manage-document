'use client';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import CategoryMenu from '@/components/CategoryMenu';

export default function LogoAndCategory() {
    const [showCategory, setShowCategory] = useState(false);

    const handleToggleCategory = (isOpen: boolean) => {
        setShowCategory(isOpen);
    };

    return (
        <div className="flex items-center flex-1">
            <Link href={'/'}>
                <div className="w-[200px]">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/baocaototnghiep-f9197.appspot.com/o/TaiLieuLogo.png?alt=media&token=184aec34-16d8-44a2-a16f-63d596bde1f1"
                        alt="logo"
                    />
                </div>
            </Link>
            <div
                className="relative flex gap-2 p-2 rounded items-center hover:bg-[#f1f1f1] hover:cursor-pointer"
                onMouseEnter={() => handleToggleCategory(true)}
                onMouseLeave={() => handleToggleCategory(false)}
            >
                <MenuIcon />
                <span className="text-[18px]">Danh mục</span>
                {showCategory && (
                    <div className="absolute top-[56.5px] right-[50px]">
                        <div className="absolute bg-no-repeat h-[20px] w-[320px] top-[-20px]"></div>
                        <CategoryMenu />
                    </div>
                )}
            </div>
        </div>
    );
}
