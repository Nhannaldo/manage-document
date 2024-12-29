'use client';
import Sidebar from '@/components/SidebarProfile';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useUser();
    const [username, setUsername] = useState(user?.username || '');
    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user]);
    return (
        <div>
            <div className="bg-[#ddd] w-full h-[100px]"></div>
            <div className="bg-white w-full h-[70px] flex px-[120px] relative border-b border-[#e0e0e0]">
                <div className="flex items-center gap-3">
                    <div className="relative bottom-[50%]">
                        <Avatar
                            sx={{
                                bgcolor: '#ff5722',
                                width: 96,
                                height: 96,
                            }}
                        >
                            <span className="text-[40px] ">
                                {username.charAt(0)}
                            </span>
                        </Avatar>
                    </div>
                    <h3 className="text-[24px] font-[500]">{username}</h3>
                </div>
            </div>
            <div className="mx-[10%] grid grid-cols-[20%_80%] mt-8 gap-3">
                {/* Sidebar */}
                <Sidebar />
                {/* Dynamic Content */}
                <div
                    className="bg-white rounded p-4"
                    style={{
                        boxShadow:
                            '0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)',
                    }}
                >
                    {children}{' '}
                    {/* This will render the page-specific content */}
                </div>
            </div>
        </div>
    );
}
