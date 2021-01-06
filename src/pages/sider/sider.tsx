import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { ReactElement, useEffect, useState } from 'react';
import { MenuInfo } from 'rc-menu/lib/interface'
import { useHistory, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderLeft = () => {
    const history = useHistory()
    const location = useLocation()

    let initKey = []
    switch (location.pathname) {
        case '/user/taskboard':
            initKey.push('1')
            break
        case '/user/myorders':
            initKey.push('2')
            break
        case '/user/account':
            initKey.push('3')
            break
    }
    const [menukey, setMenukey] = useState(initKey)

    const menuClick = ({ item, key, domEvent, keyPath }: MenuInfo) => {
        switch (key) {
            case '1':
                history.push('/user/taskboard')
                break
            case '2':
                history.push('/user/players')
                break
            case '3':
                history.push('/user/myorders')
                break
            case '4':
                history.push('/user/account')
                break
        }
    }

    return (
        <Sider collapsible>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={menukey} mode="inline" onClick={menuClick}>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    任务
                    </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    用户
                    </Menu.Item>
                <Menu.Item key="3" icon={<DesktopOutlined />}>
                    订单
                    </Menu.Item>
                <Menu.Item key="4" icon={<FileOutlined />}>
                    我的账户
                    </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SiderLeft