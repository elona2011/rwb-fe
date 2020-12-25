import { Layout, Menu, Breadcrumb, } from 'antd';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import SiderLeft from '../sider'
import TaskBoard from '../taskBoard'
import NewTask from '../newTask'
import MyClient from '../myClient'

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
                <Route exact path={`${path}/myclient`}>
                    <MyClient></MyClient>
                </Route>
            </Switch>
        </Layout>
    )
}

export default LayoutMain