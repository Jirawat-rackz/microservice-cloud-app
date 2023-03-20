import React from 'react';
import { useRouter } from 'next/router';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Menu, theme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { ProviderProps } from '@/providers';
import { useAuth } from '@/providers/auth.provider';
import { AsideContent, Content } from '@/styles/layout.style';
import routes from '@/modules/routing.module';
import { pb } from '@/pages/_app';

const LayoutProvider: React.FC<ProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(true);
  const router = useRouter();
  const { logout } = useAuth();

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
              defaultSelectedKeys={[router.asPath]}
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
    </React.Fragment>
  );
};

export default LayoutProvider;
