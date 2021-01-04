import { MouseEvent, useEffect, useState } from 'react'
import { Table, Upload, Space, Button } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import QrUpload from './QrUpload'

interface task {
    id: number,
    sitename: string,
    QICQ: string,
    balanceRate: string,
    date: string,
    percentage: string,
    Appid: string,
}

const Task = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const columns = [
        {
            title: '任务名称',
            dataIndex: 'sitename',
            key: 'sitename',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '虚拟币兑换比',
            dataIndex: 'balanceRate',
            key: 'balanceRate',
        },
        {
            title: '用户分成',
            dataIndex: 'percentage',
            key: 'percentage',
        },
        {
            title: '添加日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '上传图片',
            dataIndex: 'qrImage',
            key: 'qrImage',
        },
        {
            title: '操作(二维码上传需1分钟生效)',
            dataIndex: 'action',
            key: 'action',
            render: (text: string, record: task) => (
                <Space size="middle">
                    <a href={`http://proxy.xlcmll.top:36912/Task/${record.Appid}?uid=${record.Appid}`} target="_blank" rel="noreferrer">任务地址</a>
                    {/* <a href={`http://u.zrb.net/Task/${record.Appid}?uid=${record.Appid}`} target="_blank" rel="noreferrer">任务地址</a> */}
                    <QrUpload taskid={record.id + ''}></QrUpload>
                    <a onClick={() => handleDel(record.id)}>删除</a>
                </Space>
            ),
        },
    ];

    const handleDel = (id: number) => {
        let data = new FormData()
        data.append('taskid', id + '')
        axios({
            method: 'post',
            url: '/tasks/deltask',
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.data.code === 0) {
                axios({
                    method: 'post',
                    url: '/tasks/tasklist',
                }).then(res => {
                    setData(res.data.result)
                    // console.log(res)
                })
            }
        })
    }
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
            <Button type="primary" onClick={newTask}>新建任务</Button>
            <Table columns={columns} dataSource={data} rowKey={'id'} />
        </div>
    )
}

export default Task