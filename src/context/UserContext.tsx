'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookie from 'js-cookie';

const UserContext = createContext<any>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Lấy giá trị cookie từ client-side
        const userCookie = Cookie.get('user');

        if (userCookie) {
            setUser(JSON.parse(userCookie));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
