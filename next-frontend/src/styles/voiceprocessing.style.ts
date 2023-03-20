import { Button, Input } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

export const Container2 = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
`;

export const Header1 = styled.h1`
  font-size: 30px;
`;

export const TextInput = styled(Input)`
  width: 60%;
  height: 30%;
  margin-bottom: 5%;
`;
export const Container3 = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
`;
