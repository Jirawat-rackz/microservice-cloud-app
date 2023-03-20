import React from 'react';
import { ProviderProps } from '@/providers';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import { pb } from '@/pages/_app';

type AuthContextProps = {
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<ProviderProps> = (props) => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const login = React.useCallback(
    async (username: string, password: string) => {
      try {
        await pb.collection('users').authWithPassword(username, password);
        api.success({
          message: 'Login Success',
        });
        router.push('/dashboard');
      } catch (error: any) {
        api.error({
          message: 'Login failed',
          description: error?.message,
        });
      }
    },
    [api, router]
  );

  const logout = React.useCallback(() => {
    pb.authStore.clear();
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {contextHolder}
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext<AuthContextProps>(AuthContext);
