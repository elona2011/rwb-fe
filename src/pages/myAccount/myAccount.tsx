import { MouseEvent, useEffect, useState } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface task {
    id: number,
    sitename: string,
    QICQ: string,
    balanceRate: string,
    date: string,
    percentage: string,
    Appid: string,
}
const Account = () => {
    const history = useHistory()
    const logout = (event: MouseEvent) => {
        history.push('/login')
    }
    // useEffect(() => {
    //     axios({
    //         method: 'post',
    //         url: '/tasks/tasklist',
    //     }).then(res => {
    //         setData(res.data.result)
    //         // console.log(res)
    //     })
    // }, [])
    return (
        <div>
            <Button type="primary" onClick={logout}>退出登陆</Button>
        </div>
    )
}

export default Account