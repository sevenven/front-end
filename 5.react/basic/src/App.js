import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './App.css';
// import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Link, Switch } from './imitations/ReactRouterDom';
import AntdFormPage from './pages/AntdFormPage';
import ContextPage from './pages/ContextPage'
import RCFieldFormPage from './pages/RCFieldFormPage';
import ReduxPage from './pages/ReduxPage';
import HooksPage from './pages/HooksPage';
import ReactReduxPage from './pages/ReactReduxPage';
import ReactReduxHooksPage from './pages/ReactReduxHooksPage';
import NotFound from './pages/NotFound';
// import { Provider } from 'react-redux';
import { Provider } from './imitations/ReactRedux';
import store from './store';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed)
  };
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" defaultSelectedKeys={['antdFormPage']} mode="inline">
            <Menu.Item key="antdFormPage" icon={<DesktopOutlined />}>
              <Link to="/">AntdFormPage</Link>
            </Menu.Item>
            <Menu.Item key="contextPage" icon={<PieChartOutlined />}>
              <Link to="/contextPage">ContextPage</Link>
            </Menu.Item>
            <Menu.Item key="rcFieldFormPage" icon={<DesktopOutlined />}>
              <Link to="/rcFieldFormPage">RCFieldFormPage</Link>
            </Menu.Item>
            <Menu.Item key="reduxPage" icon={<FileOutlined />}>
              <Link to="/reduxPage">ReduxPage</Link>
            </Menu.Item>
            <Menu.Item key="hooksPage" icon={<UserOutlined />}>
              <Link to="/hooksPage">HooksPage</Link>
            </Menu.Item>
            <SubMenu key="reactRedux" icon={<TeamOutlined />} title="ReactRedux">
              <Menu.Item key="reactReduxPage">
                <Link to="/reactReduxPage">ReactReduxPage</Link>
              </Menu.Item>
              <Menu.Item key="reactReduxHookPage">
                <Link to="/reactReduxHookPage">ReactReduxHooksPage</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content style={{ margin: '0 24px' }}>
            <Switch>
              <Route
                exact
                path="/"
                // children={() => <div>children</div>}
                // component={AntdFormPage}
                render={ () => <AntdFormPage /> }
              />
              <Route path="/contextPage" component={ContextPage} />
              <Route path="/rcFieldFormPage" component={RCFieldFormPage} />
              <Route path="/reduxPage" component={ReduxPage} />
              <Route path="/hooksPage" component={HooksPage} />
              <Provider store={store}>
                <Route path="/reactReduxPage" component={ReactReduxPage}></Route>
                <Route path="/reactReduxHookPage" component={ReactReduxHooksPage}></Route>
              </Provider>
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
