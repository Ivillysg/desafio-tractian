import React from 'react';
import { Layout, Space } from 'antd';

import './styles.scss';
import List from './Components/List';
import Create from './Components/CreateButton';

const Users: React.FC = () => {
  return (
    <Layout className="container">
      <Space direction="vertical">
        <List>
          <Create />
        </List>
      </Space>
    </Layout>
  );
};

export default Users;
