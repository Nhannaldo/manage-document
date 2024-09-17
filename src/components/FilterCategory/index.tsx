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
        { name: 'Lập trình cơ bản', count: 10, checked: false },
        { name: 'Cấu trúc dữ liệu và giải thuật', count: 0, checked: false },
        { name: 'Hệ điều hành', count: 0, checked: false },
        { name: 'Lập trình hướng đối tượng', count: 0, checked: false },
        { name: 'Cơ sở dữ liệu', count: 0, checked: false },
        { name: 'Mạng máy tính', count: 0, checked: false },
        { name: 'Phân tích và thiết kế hệ thống', count: 0, checked: false },
        { name: 'An toàn thông tin', count: 0, checked: false },
        { name: 'Kiến trúc máy tính', count: 0, checked: false },
        { name: 'Lập trình Web', count: 0, checked: false },
        { name: 'Trí tuệ nhân tạo', count: 0, checked: false },
        { name: 'Phát triển phần mềm', count: 0, checked: false },
        { name: 'Lập trình di động', count: 0, checked: false },
        { name: 'Quản lý dự án phần mềm', count: 0, checked: false },
        { name: 'Học máy', count: 0, checked: false },
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
                                    <span className="text-white">✔</span>
                                )}
                            </div>
                            <span className="text-blue-700">{`${category.name} (${category.count})`}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
