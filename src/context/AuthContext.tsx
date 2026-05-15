"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  firstName: string;
  lastName:  string;
  email:     string;
  phone?:    string;
}

interface AuthContextValue {
  user:     AuthUser | null;
  isLoggedIn: boolean;
  login:    (user: AuthUser) => void;
  logout:   () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoggedIn: false,
  login:  () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bf_user');
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const login = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem('bf_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bf_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
