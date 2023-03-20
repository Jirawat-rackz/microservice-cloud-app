import React, { ReactElement } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { Card, Form, Input, Typography } from 'antd';

import { Container, SubmitButton } from '@/styles/login.style';
import { useAuth } from '@/providers/auth.provider';

type IFormLoginProps = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [form] = Form.useForm<IFormLoginProps>();
  const { login } = useAuth();

  const onFinish = React.useCallback(async (values: IFormLoginProps) => {
    login(values.username, values.password);
  }, []);

  return (
    <Container>
      <Card style={{ width: 500 }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          X Stack
        </Typography.Title>
        <Form
          name="login-form"
          form={form}
          layout="vertical"
          style={{ paddingLeft: 16, paddingRight: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
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
