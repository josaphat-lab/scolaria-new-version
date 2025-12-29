import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('scolaria_auth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        setUser(authData.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading auth:', error);
      localStorage.removeItem('scolaria_auth');
    }
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email: email,
      name: 'Administrateur',
      role: 'admin'
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('scolaria_auth', JSON.stringify({ user: mockUser }));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('scolaria_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
