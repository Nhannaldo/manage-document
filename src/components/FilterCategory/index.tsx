'use client';
import { useState } from 'react';

type Category = {
    name: string;
    count: number;
    checked: boolean;
};

interface FilterCategoryProps {
    onFilterChange: (selectedCategories: string[]) => void;
}

export default function FilterCategory({
    onFilterChange,
}: FilterCategoryProps) {
    const [categories, setCategories] = useState<Category[]>([
        { name: 'Kỹ thuật lập trình', checked: false },
        { name: 'Lập trình Web', checked: false },
        { name: 'Cơ sở dữ liệu', checked: false },
        { name: 'Cấu trúc dữ liệu và giải thuật', checked: false },
        { name: 'Lập trình hướng đối tượng', checked: false },
        { name: 'Lập trình Windows', checked: false },
        { name: 'Kiến trúc máy tính', checked: false },
        { name: 'Mạng máy tính', checked: false },
        { name: 'Phát triển ứng dụng di động', checked: false },
        { name: 'Hệ điều hành', checked: false },
        { name: 'Kiểm thử phần mềm', checked: false },
        { name: 'Công nghệ phần mềm', checked: false },
        { name: 'An toàn và bảo mật thông tin', checked: false },
        { name: 'Học máy', checked: false },
        { name: 'Trí tuệ nhân tạo', checked: false },
        { name: 'Internet of thing', checked: false },
        { name: 'Lập trình game', checked: false },
    ]);

    const handleCheckboxChange = (index: number) => {
        const newCategories = [...categories];
        newCategories[index].checked = !newCategories[index].checked;
        setCategories(newCategories);
        onFilterChange(
            newCategories.filter((cat) => cat.checked).map((cat) => cat.name),
        ); // Notify parent about the selected categories
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Môn học</h1>
            <ul className="space-y-3">
                {categories.map((category, index) => (
                    <li key={index} className="flex items-center">
                        <label
                            className="inline-flex items-center space-x-2 cursor-pointer"
                            onClick={() => handleCheckboxChange(index)} // Handle on click
                        >
                            <div
                                className={`h-5 w-5 border border-[#a6a6a6] rounded flex items-center justify-center ${
                                    category.checked
                                        ? 'bg-blue-600'
                                        : 'bg-white'
                                }`}
                            >
                                {category.checked && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="13"
                                        fill="currentColor"
                                        className="text-white"
                                        viewBox="0 0 12 16"
                                    >
                                        <path d="M13.485 1.929a1 1 0 0 1 1.414 1.414l-10 10a1 1 0 0 1-1.415 0l-4-4a1 1 0 0 1 1.415-1.414L4.5 11.086l9-9z" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-blue-700">{`${category.name}`}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
