"use client";

import { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('wealthflow_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('wealthflow_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email && password.length >= 6) {
            const userData = {
                id: '1',
                name: 'John Doe',
                email: email,
                role: 'Admin'
            };
            setUser(userData);
            localStorage.setItem('wealthflow_user', JSON.stringify(userData));
            setIsLoading(false);
            return true;
        }
        setIsLoading(false);
        return false;
    }

    const loginWithGoogle = async (): Promise<boolean> => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const userData = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            role: 'Admin'
        };
        setUser(userData);
        localStorage.setItem('wealthflow_user', JSON.stringify(userData));
        
        setIsLoading(false);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('wealthflow_user');
    };

    return(
        <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}