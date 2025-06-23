import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  userId: string | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userId');
    if (storedUser) setUserId(storedUser);
  }, []);

  const login = (id: string, token: string) => {
    localStorage.setItem('userId', id);
    localStorage.setItem('token', token);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
