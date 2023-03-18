import React from 'react';
import type { NextPage } from 'next';
import { Container, SubmitButton } from '@/styles/login.style';
import { Button, Card, Form, Input, Typography } from 'antd';
import { useAuth } from '@/providers/auth.provider';

type IFormLoginProps = {
  username: string;
  password: string;
};

const LoginPage: NextPage = () => {
  // const [form] = Form.useForm<IFormLoginProps>();
  const { login } = useAuth();

  const onFinish = React.useCallback((values: IFormLoginProps) => {
    console.log('Success:', values);
    login();
  }, []);

  return (
    <Container>
      <Card style={{ width: 500 }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          X Stack
        </Typography.Title>

        <Form
          name="login-form"
          // form={form}
          layout="vertical"
          style={{ paddingLeft: 16, paddingRight: 16 }}
          onFinish={onFinish}
        >
          <Form.Item label="Username" name="username" rules={[]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <SubmitButton htmlType="submit">Log in</SubmitButton>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;
