"use client";

import { createContext, ReactNode, useContext, useState } from "react";

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

const AuthContext = createContext<AuthContextType | undefined> (undefined);

export function AuthProvider({children} : {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

      const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
    if (email && password.length >= 6){
        setUser({
             id: '1',
        name: 'John Doe',
        email: email,
        role: 'Admin'
        })
            setIsLoading(false);
      return true;
    }
        setIsLoading(false);
    return false;
}
  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      role: 'Admin'
    });
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
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
    