import { MouseEvent, useEffect, useState } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const columns = [
    {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '任务名',
        dataIndex: 'sitename',
        key: 'sitename',
    },
    {
        title: '我的积分',
        dataIndex: 'pointsShare',
        key: 'pointsShare',
    },
    {
        title: '用户积分',
        dataIndex: 'points',
        key: 'points',
    },
    {
        title: '比例',
        dataIndex: 'percentage',
        key: 'percentage',
    },
    {
        title: '订单名',
        dataIndex: 'ordername',
        key: 'ordername',
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
    pointsShare: string,
    sitename: string,
}

const Task = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios({
            method: 'post',
            url: '/tasks/myorders',
        }).then(res => {
            console.log(res.data)
            if (res.data.code === 0) {
                let result = res.data.result
                result.forEach((n: order) => {
                    n.percentageNum = parseInt(n.percentage)
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