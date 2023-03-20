import React from 'react';
import { useRouter } from 'next/router';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Menu, notification, theme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { ProviderProps } from '@/providers';
import { useAuth } from '@/providers/auth.provider';
import { AsideContent, Content } from '@/styles/layout.style';
import routes from '@/modules/routing.module';

const LayoutProvider: React.FC<ProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(true);
  const router = useRouter();
  const { user, logout } = useAuth();

  React.useEffect(() => {
    if (!user && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router.pathname]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const routeMenu = React.useMemo(() => {
    return routes.map((route) => {
      return {
        ...route,
        onClick: () => router.push(`${route?.key}`),
      };
    }) as ItemType[];
  }, []);

  return (
    <React.Fragment>
      {user && (
        <AntLayout>
          <AntLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              style={{
                height: 32,
                margin: 16,
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <AsideContent>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/dashboard']}
                items={routeMenu}
              />
              <Menu
                theme="dark"
                mode="inline"
                items={[
                  {
                    key: '1',
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                    onClick: logout,
                  },
                ]}
              />
            </AsideContent>
          </AntLayout.Sider>
          <AntLayout>
            <Content theme={colorBgContainer}>{children}</Content>
            <AntLayout.Footer style={{ textAlign: 'center' }}>
              Microservice Cloud App ©2023 Created by X Stack
            </AntLayout.Footer>
          </AntLayout>
        </AntLayout>
      )}
      {!user && children}
    </React.Fragment>
  );
};

export default LayoutProvider;
