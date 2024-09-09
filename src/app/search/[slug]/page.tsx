'use client';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';

//folder
import SearchResultItem from '@/components/SearchResultItem';
export default function Search() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    return (
        <div className="max-w-[1200px] mx-auto my-4">
            <h1 className="text-[24px]">
                Kết quả tìm kiếm cho từ khóa: {'"công nghệ"'}
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
            <div className="mt-14">
                <div className="grid grid-cols-12">
                    <div className="col-span-9">
                        <div>
                            <SearchResultItem />
                            <SearchResultItem />
                            <SearchResultItem />
                            <SearchResultItem />
                            <SearchResultItem />
                            <SearchResultItem />
                            <SearchResultItem />
                            <SearchResultItem />
                            <SearchResultItem />
                        </div>
                        <div className="flex justify-center mt-10">
                            <Pagination count={5} size="large" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
