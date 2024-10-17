'use client';
import type { Metadata } from 'next';
import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
//search
import { createTheme } from '@mui/material/styles';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//navigation
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import PeopleIcon from '@mui/icons-material/People';
import type { Navigation } from '@toolpad/core';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import Link from 'next/link';
// Theme settings
const demoTheme = createTheme({
    palette: {
        mode: 'light', // Set to 'dark' for dark mode
    },
});

//navigation
const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Trang',
    },
    {
        segment: 'admin/dashboard', // Điều hướng tới '/admin/dashboard'
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'admin/manage-documents', // Điều hướng tới '/admin/dashboard'
        title: 'Documents',
        icon: <ArticleRoundedIcon />,
    },
    {
        segment: 'admin/questions', // Điều hướng tới '/admin/questions'
        title: 'Questions',
        icon: <QuizRoundedIcon />,
    },
    {
        segment: 'admin/users', // Điều hướng tới '/admin/users'
        title: 'Users',
        icon: <PeopleIcon />,
    },
];

//search

function Search() {
    return (
        <React.Fragment>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                InputProps={{
                    endAdornment: (
                        <IconButton
                            type="button"
                            aria-label="search"
                            size="small"
                        >
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
                sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
            />
            <div>avatar</div>
        </React.Fragment>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body>
                <AppProvider
                    navigation={NAVIGATION}
                    theme={demoTheme}
                    branding={{
                        logo: (
                            <Link href="/admin/dashboard">
                                <img
                                    src="https://mui.com/static/logo.png"
                                    alt="MUI logo"
                                    style={{ cursor: 'pointer' }} // Thêm cursor để người dùng biết rằng logo có thể nhấp được
                                />
                            </Link>
                        ),
                        title: 'Admin',
                    }}
                >
                    <DashboardLayout slots={{ toolbarActions: Search }}>
                        {children}
                    </DashboardLayout>
                </AppProvider>
            </body>
        </html>
    );
}
