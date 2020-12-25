import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { ReactElement } from 'react';
import { MenuInfo } from 'rc-menu/lib/interface'
import { useHistory } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderLeft = () => {
    const history = useHistory()
    const menuClick = ({ item, key, domEvent, keyPath }: MenuInfo) => {
        switch (key) {
            case '1':
                history.push('/user/taskboard')
                break
            case '2':
                history.push('/user/myclient')
                break
            case '3':
                history.push('')
                break

        }
    }
    return (
        <Sider collapsible>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={menuClick}>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    任务墙
                    </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    我的用户
                    </Menu.Item>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    我的账户
                    </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SiderLeft