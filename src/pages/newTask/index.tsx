import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';
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
import { useState, useEffect } from 'react';

interface FormParams {
    sitename: string,
    QICQ: string,
    balanceName: string,
    balanceRate: string,
    percentage: string,
}
const Login = () => {
    let auth = useAuth()
    let history = useHistory()

    const onFinish = ({ sitename, QICQ, balanceName, balanceRate, percentage }: FormParams) => {
        let data = new FormData()
        data.append('sitename', sitename)
        data.append('QICQ', QICQ)
        data.append('balanceName', '积分')
        data.append('balanceRate', '100')
        data.append('percentage', percentage)
        axios({
            method: 'post',
            url: '/tasks/newtask',
            data,
        }).then(res => {
            if (res.data.code === 0) {
                history.push('/user/taskboard')
            }
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

    return (
        <Form
            name="normal_login"
            // className="login-form"
            initialValues={{
                sitename: 'c1',
                QICQ: '99999',
                balanceName: '积分',
                balanceRate: '100',
                percentage: '90',
            }}
            onFinish={onFinish}
        >
            <Form.Item
                label="任务墙名称"
                name="sitename"
                rules={[{ required: true, message: '请输入任务墙名称!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="客服QQ"
                name="QICQ"
                rules={[{ required: true, message: '请输入客服QQ!' }]}
            >
                <Input />
            </Form.Item>
            {/* <Form.Item
                label="虚拟币单位"
                name="balanceName"
                rules={[{ required: true, message: '请输入虚拟币单位!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="虚拟币兑换比"
                name="balanceRate"
                rules={[{ required: true, message: '请输入虚拟币兑换比!' }]}
            >
                <Input />
            </Form.Item> */}
            <Form.Item
                label="用户分成比例"
                name="percentage"
                rules={[{ required: true, message: '请输入用户分成比例!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    提交
            </Button>
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    )
}

export default Login