import { MouseEvent, useEffect, useState } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const columns = [
    {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '金额',
        dataIndex: 'money',
        key: 'money',
    },
    {
        title: '访问次数',
        dataIndex: 'loginNum',
        key: 'loginNum',
    },
    {
        title: 'appid',
        dataIndex: 'appid',
        key: 'appid',
    },
    {
        title: '最后登陆时间',
        dataIndex: 'date',
        key: 'date',
    },
];

interface order {
    'Appid': string,
    'date': string,
    id: number,
    orderid: string,
    ordername: string,
    percentage: string,
    percentageNum: number,
    points: number,
    allpoints: string,
    sitename: string,
}

const Task = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios({
            method: 'post',
            url: '/tasks/taskplayers',
        }).then(res => {
            console.log(res.data)
            if (res.data.code === 0) {
                let result = res.data.result
                result.forEach((n: order) => {
                    n.percentageNum = parseInt(n.percentage)
                    n.allpoints = (n.points * 100 / n.percentageNum).toFixed(1)
                    n.percentage += '%'
                })
                setData(result)
            }
        })
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={data} rowKey={'id'} />
        </div>
    )
}

export default Task