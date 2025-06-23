import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: { id: string; email: string } | null;
  login: (id: string, email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

    useEffect(() => {
    const storedId = localStorage.getItem('userId');
    const storedEmail = localStorage.getItem('email');
    if (storedId && storedEmail) {
        setUser({ id: storedId, email: storedEmail });
    }
    }, []);

    const login = (id: string, email: string, token: string) => {
    localStorage.setItem('userId', id);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    setUser({ id, email });
    };

    const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setUser(null);
    };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
