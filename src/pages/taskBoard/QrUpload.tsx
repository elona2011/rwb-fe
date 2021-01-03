import { Table, Upload, Space, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { MouseEvent, useEffect, useState } from 'react'
import axios from 'axios';

const QrUpload = (props: { taskid: string; }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
        <Upload
            name="avatar"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={(info) => {

                setFileList([info.file])
                let data = new FormData()
                data.append('taskid', props.taskid + '');
                data.append('filename', info.file.name);
                // @ts-ignore zhushi
                data.append('qrimage', info.file);
                axios({
                    method: 'post',
                    url: '/tasks/addqrimage',
                    data,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    if (res.data.code === 0) {

                    }
                })
            }}>
            <Button icon={<UploadOutlined />}>上传二维码</Button>
        </Upload>
    )
}

export default QrUpload