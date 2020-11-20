import React from 'react';
import { Router, Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import Routes from './Routes';
import Message from './Helpers/Utils/message';

import './styles/global.css';
import history from './Helpers/Utils/history';

const { Content, Header } = Layout;
const App = () => {
  return (
    <Router history={history}>
      <Message />
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item style={{ marginLeft: '1rem' }} key="2">
              <Link to="/users"> Funcionários</Link>
            </Menu.Item>
            <Menu.Item style={{ marginLeft: '1rem' }} key="3">
              <Link to="/companys"> Empresas</Link>
            </Menu.Item>
            <Menu.Item style={{ marginLeft: '1rem' }} key="4">
              <Link to="/units"> Unidades</Link>
            </Menu.Item>
            <Menu.Item style={{ marginLeft: '1rem' }} key="5">
              <Link to="/actives"> Ativos</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes />
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
