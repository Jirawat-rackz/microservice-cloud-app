import React from 'react';
import { ProviderProps } from '@/providers';
import { TUser } from '@/models/user.model';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import initPocketBase from '@/helpers/init-pocketbase.helper';
import {
  authWithPassword,
  removeAuthorized,
} from '@/repository/auth.repository';
import { notification } from 'antd';

type AuthContextProps = {
  user: TUser | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<ProviderProps> = (props) => {
  const router = useRouter();
  const [user, setUser] = React.useState<TUser | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const login = React.useCallback(
    async (username: string, password: string) => {
      try {
        const result = await authWithPassword(username, password);
        api.success({
          message: 'Login success',
          description: 'You are now logged in',
        });
        setUser({ id: result.record.id });
        router.push('/dashboard');
      } catch (error: any) {
        api.error({
          message: 'Login failed',
          description: error?.message,
        });
      }
    },
    []
  );

  const logout = React.useCallback(() => {
    setUser(null);
    removeAuthorized();
    router.push('/login');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {contextHolder}
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext<AuthContextProps>(AuthContext);
