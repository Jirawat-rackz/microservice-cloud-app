import styled from 'styled-components';
import { Layout } from 'antd';

export const Content = styled(Layout.Content)`
  margin: 24px 16px 0 16px;
  padding: 24px 24px 0 24px;
  min-height: calc(100vh - 96px);
  background: ${({ theme }) => theme};
`;

export const AsideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 114px);
`;
