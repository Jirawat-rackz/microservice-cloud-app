import React from 'react';
import { ProviderProps } from '@/providers';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import { pb } from '@/pages/_app';

type AuthContextProps = {
  login: (username: string, password: string) => void;
  logout: () => void;
  signUp: (username: string, email: string, password: string, confirmPassword: string, nameClinic: string) => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  login: () => { },
  logout: () => { },
  signUp: () => { },
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

  const signUp = React.useCallback(
    async (username: string, email: string, password: string, confirmPassword: string, nameClinic: string) => {
      // console.log(username, email, password);

      if (password !== confirmPassword) {
        api.error({
          message: 'Sign Up failed',
          description: 'Passwords do not match.',
        });
        return;
      }
      const data = {
        "username": username,
        "email": email,
        "password": password,
        "passwordConfirm": confirmPassword,
        "clinic_id": nameClinic,
      };
      console.log(nameClinic);


      try {
        await pb.collection('users').create(data);
        api.success({
          message: 'SignUp Success',
        });
        router.push('/login');
      } catch (error: any) {
        api.error({
          message: 'Sign Up failed',
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
    <AuthContext.Provider value={{ login, logout, signUp }}>
      {contextHolder}
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext<AuthContextProps>(AuthContext);
