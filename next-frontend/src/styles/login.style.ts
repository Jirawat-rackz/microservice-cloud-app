import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


export const Container3 = styled.div`
  /* display: flex;
  justify-content: center; */
  align-items: center;
  flex-direction: column;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 8px;
`;

SubmitButton.defaultProps = {
  type: 'primary',
  size: 'large',
};
