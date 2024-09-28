'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

export default function Like() {
    const [value, setValue] = React.useState('one');

    return (
        <div className="">
            <div className="border-b border-gray-200 pb-3">
                <h2 className="text-[24px]">Quản lý yêu thích</h2>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Tìm kiếm..."
                        className="w-[400px]"
                    />
                </div>
            </div>
            <div className="mt-3">Hiện chưa có tài liệu yêu thích</div>
        </div>
    );
}
