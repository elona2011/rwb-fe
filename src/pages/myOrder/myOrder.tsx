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
        title: '积分',
        dataIndex: 'points',
        key: 'points',
    },
    {
        title: '订单名',
        dataIndex: 'ordername',
        key: 'ordername',
    },


];

const Task = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios({
            method: 'post',
            url: '/tasks/myorders',
        }).then(res => {
            console.log(res.data)
            if (res.data.code === 0) {
                setData(res.data.result)
            }
        })
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={data} rowKey={'id'}/>
        </div>
    )
}

export default Task