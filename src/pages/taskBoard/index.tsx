import { MouseEvent, useEffect, useState } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const columns = [
    {
        title: '任务墙名称',
        dataIndex: 'sitename',
        // key: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: '虚拟币兑换比',
        dataIndex: 'balanceRate',
        // key: 'age',
    },
    {
        title: '用户分成',
        dataIndex: 'percentage',
        // key: 'address',
    },
    {
        title: '添加日期',
        dataIndex: 'date',
    },
    {
        title: '操作',
        key: 'action',
        render: (text: string, record: { name: string }) => (
            <Space size="middle">
                <a>删除</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'test',
        age: '100积分=1元',
        address: '90%',
        tags: '2020/12/24',
    },
    {
        key: '2',
        name: 'test1',
        age: '100积分=1元',
        address: '90%',
        tags: '2020/12/24',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: '100积分=1元',
        address: '90%',
        tags: '2020/12/24',
    },
];

const Task = () => {
    const history = useHistory()
    const newTask = (event: MouseEvent) => {
        history.push('/user/newtask')
    }
    const [data, setData] = useState([])
    useEffect(() => {
        axios({
            method: 'post',
            url: '/tasks/tasklist',
        }).then(res => {
            setData(res.data.result)
            // console.log(res)
        })
    }, [])
    return (
        <div>
            <Button type="primary" onClick={newTask}>新建任务墙</Button>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Task