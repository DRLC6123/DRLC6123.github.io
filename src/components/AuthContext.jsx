import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('usuario');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('usuario', JSON.stringify(user));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, userId: user?.id }}>
      {children}
    </AuthContext.Provider>
  );
};
