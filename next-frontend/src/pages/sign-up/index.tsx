import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Typography, Select, notification } from 'antd';
import { Container, SubmitButton } from '@/styles/login.style';
import { useAuth } from '@/providers/auth.provider';
import { pb } from '../_app';
import { Record } from 'pocketbase';

type IFormSignUpProps = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    nameClinic: string;
};

const SignUpPage = () => {
    const [form] = Form.useForm<IFormSignUpProps>();
    const { signUp } = useAuth();
    const [clinicData, setClinicData] = useState<Record[]>([]);
    const [nameClinic, setNameClinic] = useState<string>('');


    const fetchData = React.useCallback(async () => {
        try {
            const clinicResult = await pb.collection('clinic').getList();
            setClinicData(clinicResult.items);
        } catch (error) {
            console.error('Error fetching clinic data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const option = clinicData.map((data) => {
        return {
            value: data.id, label: data.clinic_name
        }
    })

    const onFinish = React.useCallback(async () => {
        try {
            const values = await form.validateFields();
            if (values.password === values.confirmPassword) {
                signUp(values.username, values.email, values.password, values.confirmPassword, values.nameClinic);
                // console.log(nameClinic);
                
            } else {
                alert("Passwords do not match. Please try again.");
            }
        } catch (error) {
            console.error('Validation failed:', error);
        }
    }, [form, signUp]);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setNameClinic(value);

    };

    return (
        <Container>
            <Card style={{ width: 500 }}>
                <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    X-Stack
                </Typography.Title>
                <Form
                    name="signup-form"
                    form={form}
                    layout="vertical"
                    style={{ paddingLeft: 16, paddingRight: 16 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"

                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Name Clinic" name="nameClinic" rules={[{ required: true, message: 'Please input your name clinic!' }]} >
                        <Select
                            value={nameClinic}
                            placeholder="Select a clinic"
                            onChange={handleChange}
                            options={option}
                        />
                    </Form.Item>

                    <Form.Item>
                        <SubmitButton htmlType="submit">Create Account</SubmitButton>
                    </Form.Item>
                </Form>
            </Card>
        </Container>
    );
};

export default SignUpPage;
