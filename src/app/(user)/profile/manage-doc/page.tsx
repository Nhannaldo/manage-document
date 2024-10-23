'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import TabUploadedDocument from '@/components/TabUploadedDocument';
export default function ManageDocument() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div className="">
            <div className="border-b border-gray-200 pb-3">
                <h2 className="text-[24px] ">Quản lý tài liệu</h2>
            </div>
            <div className="flex items-center justify-between mt-3">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    <Tab
                        value="one"
                        label="Tài liệu upload chờ duyệt"
                        style={{ textTransform: 'none' }}
                        className="text-[16px] text-[#333]"
                    />
                    <Tab
                        value="two"
                        label="Tài liệu upload"
                        style={{ textTransform: 'none' }}
                        className="text-[16px] text-[#333]"
                    />
                    <Tab
                        value="three"
                        label="Tài liệu tải xuống"
                        style={{ textTransform: 'none' }}
                        className="text-[16px] text-[#333]"
                    />
                    {/* <Tab value="three" label="Item Three" /> */}
                </Tabs>
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Tìm kiếm..."
                    />
                </div>
            </div>
            {/* Render nội dung khác nhau dựa trên tab được chọn */}
            <div className="mt-4">
                {value === 'one' && (
                    <div>
                        {/* Nội dung của tab "Tài liệu upload chờ duyệt" */}
                        <TabUploadedDocument statusFilter={false} />
                    </div>
                )}
                {value === 'two' && (
                    <div>
                        {/* Nội dung của tab "Tài liệu upload" */}
                        <TabUploadedDocument statusFilter={true} />
                    </div>
                )}
                {value === 'three' && (
                    <div>
                        {/* Nội dung của tab "Tài liệu tải xuống" */}
                        <p>Danh sách tài liệu đã tải xuống.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
