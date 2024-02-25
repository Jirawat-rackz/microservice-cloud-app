import React, { ReactElement } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { Card, Form, Input, Typography, Button } from 'antd';
import { Container, SubmitButton } from '@/styles/login.style';
import { useAuth } from '@/providers/auth.provider'
import { useRouter } from 'next/router';

type IFormLoginProps = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [form] = Form.useForm<IFormLoginProps>();
  const { login } = useAuth();
  const router = useRouter();

  const handleCreateClick = () => {
    router.push('/sign-up');
  }

  const onFinish = React.useCallback(
    async (values: IFormLoginProps) => {
      login(values.username, values.password);
    },
    [login]
  );

  return (
    <Container>
      <Card style={{ width: 500 }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          X-Stack
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

          <Typography style={{ textAlign: 'center', fontSize: "14px" }}>
            Don&apos;t have an account? <Typography.Link onClick={handleCreateClick} style={{ color: 'blue' }}>Create</Typography.Link>
          </Typography>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;
