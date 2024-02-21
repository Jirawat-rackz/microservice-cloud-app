import { Input } from 'antd';
import styled from 'styled-components';
const { Search } = Input;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
`;

export const SearchInput = styled(Search)`
  align-self: end;
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
