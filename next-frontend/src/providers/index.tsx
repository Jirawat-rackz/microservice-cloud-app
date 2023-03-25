import { ConfigProvider, App } from 'antd';
import enUS from 'antd/locale/en_US';
import { AuthProvider } from './auth.provider';

export type ProviderProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ConfigProvider locale={enUS}>
      <AuthProvider>
        <App>{children}</App>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default Providers;
