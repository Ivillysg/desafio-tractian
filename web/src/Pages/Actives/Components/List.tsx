import React from 'react';
import { Card } from 'antd';
import { AiOutlineDelete, BiEdit } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';

import TableComp from '../../../Components/Table';
import { ApplicationState } from '../../../Store';
import { FindAll } from '../../../Store/modules/actions';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { IActive } from '../../../Store/modules/Actives/types';

interface Props {
  children?: React.ReactNode;
}
const columns = [
  {
    title: 'Ativo',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Saúde',
    dataIndex: 'healthScore',
  },

  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (active: IActive) => (
      <>
        <EditButton
          type="primary"
          style={{ marginRight: '1rem' }}
          onClick={active._id}
          shape="circle"
          ghost
        >
          <BiEdit size={20} />
        </EditButton>
        <DeleteButton
          type="primary"
          shape="circle"
          ghost
          danger
          onClick={active._id}
        >
          <AiOutlineDelete size={20} />
        </DeleteButton>
      </>
    ),
  },
];
const List: React.FC<Props> = ({ children }) => {
  const actives = useSelector((state: ApplicationState) => state.actives.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(FindAll('unit'));
    dispatch(FindAll('active'));
  }, [dispatch]);

  return (
    <Card title="Lista de ativos" style={{ width: '90%' }}>
      <TableComp
        rowKey={(active: IActive) => active._id}
        dataSource={actives}
        columns={columns}
      />
      {children}
    </Card>
  );
};

export default List;
