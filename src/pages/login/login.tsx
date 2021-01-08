import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import { useAuth } from '../auth'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
} from "react-router-dom";
import axios from 'axios'
import { useState, useEffect, MouseEvent } from 'react';

const Login = () => {
    let auth = useAuth()
    let history = useHistory()
    const [form] = Form.useForm()

    const onFinish = ({ username, password, captcha }: { username: string, password: string, captcha: string }) => {
        auth.signin(username, password, captcha, () => {
            history.push('/user/taskboard')
        }, (d: string) => {
            message.error(d)
        })
    };
    let [captchaimg, setCaptchaimg] = useState<string>()
    useEffect(() => {
        axios.get('/tasks/getcaptcha', {
            responseType: 'blob'
        }).then(res => {
            setCaptchaimg(URL.createObjectURL(res.data))
        })
    }, [])
    const refresh = () => {
        axios.get('/tasks/refreshcaptcha', {
            responseType: 'blob'
        }).then(res => {
            setCaptchaimg(URL.createObjectURL(res.data))
        })
    }

    const register = (e: MouseEvent) => {
        let params = new URL(document.location.href).searchParams
        const code = params.get('code')
        if (code === null) {
            message.error('缺少邀请码')
        } else {
            let data = new FormData()
            data.append('name', form.getFieldValue('username'))
            data.append('password', form.getFieldValue('password'))
            data.append('code', code)
            axios({
                method: 'post',
                url: '/tasks/register',
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                if (res.data.code !== 0) {
                    message.error(res.data.result)
                } else {
                    message.success(res.data.result)
                }
            })
        }
    }

    return (
        <Form
            name="normal_login"
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入您的账号!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入您的密码!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    // type="password"
                    placeholder="密码"
                />
            </Form.Item>

            {(captchaimg && <Form.Item label="验证码">
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="captcha"
                            noStyle
                            rules={[{ required: true, message: '请输入验证码' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <img src={captchaimg} onClick={refresh}></img>
                    </Col>
                </Row>
            </Form.Item>)}
            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
            </a>
            </Form.Item> */}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登陆
                </Button>
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
            <Form.Item>
                <Button type="primary" className="login-form-button" onClick={register}>
                    注册（先填入账号和密码，再点注册）
                </Button>
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    )
}

export default Login