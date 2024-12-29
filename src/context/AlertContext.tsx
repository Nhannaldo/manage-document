'use client';
import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Định nghĩa kiểu cho AlertContext
interface AlertContextType {
    showAlert: (
        message: string,
        severity: 'success' | 'error' | 'info' | 'warning',
    ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success' as 'success' | 'error' | 'info' | 'warning',
        message: '',
    });

    // Hàm hiển thị Alert
    const showAlert = (
        message: string,
        severity: 'success' | 'error' | 'info' | 'warning',
    ) => {
        setAlert({ open: true, severity, message });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            <div className="flex flex-col h-screen">
                {children}

                {/* Hiển thị Alert */}
                <Snackbar
                    open={alert.open}
                    autoHideDuration={3000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert severity={alert.severity} onClose={handleCloseAlert}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </div>
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
