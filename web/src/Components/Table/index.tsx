import React from 'react';
import { Layout, Table } from 'antd';
import './style.scss';

interface Props {
  title?: string;
  [x: string]: any;
}

const TableComp: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <Layout.Content className="list-ativos">
      <h1>{title}</h1>
      <Table
        className="tab-ativos"
        pagination={{ pageSize: 5 }}
        scroll={{ y: 250 }}
        {...rest}
      />
    </Layout.Content>
  );
};

export default TableComp;
