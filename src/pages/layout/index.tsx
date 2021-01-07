import { Layout, Menu, Breadcrumb, } from 'antd';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import SiderLeft from '../sider/sider'
import TaskBoard from '../taskBoard/TaskBoard'
import NewTask from '../newTask'
import Players from '../players/players'
import MyOrder from '../myOrder/myOrder'
import MyOrder2 from '../myOrder/myOrder2'
import MyAccount from '../myAccount/myAccount'

const LayoutMain = () => {
    let { path, url } = useRouteMatch()
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderLeft></SiderLeft>
            <Switch>
                <Route exact path={`${path}/taskboard`}>
                    <TaskBoard></TaskBoard>
                </Route>
                <Route exact path={`${path}/newtask`}>
                    <NewTask></NewTask>
                </Route>
                <Route exact path={`${path}/players`}>
                    <Players></Players>
                </Route>
                <Route exact path={`${path}/myorders`}>
                    <MyOrder></MyOrder>
                </Route>
                <Route exact path={`${path}/myorders2`}>
                    <MyOrder2></MyOrder2>
                </Route>
                <Route exact path={`${path}/account`}>
                    <MyAccount></MyAccount>
                </Route>
            </Switch>
        </Layout>
    )
}

export default LayoutMain