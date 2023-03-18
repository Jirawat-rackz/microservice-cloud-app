import React from 'react';
import { ProviderProps } from '@/providers';
import { TUser } from '@/models/user.model';
import { useRouter } from 'next/router';

type AuthContextProps = {
  user: TUser | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = React.useState<TUser | null>(null);

  console.log('user', user);

  const login = React.useCallback(() => {
    setUser({ id: '1' });
    router.push('/voice-processing');
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    router.push('/login');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext<AuthContextProps>(AuthContext);
