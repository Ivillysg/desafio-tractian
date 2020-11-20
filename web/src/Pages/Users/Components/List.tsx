import React from 'react';
import { Card } from 'antd';
import { AiOutlineDelete, BiEdit } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';

import TableComp from '../../../Components/Table';
import { ApplicationState } from '../../../Store';
import { FindAll } from '../../../Store/modules/actions';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

interface Props {
  children?: React.ReactNode;
}
const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    width: '85%',
  },

  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (email: any) => (
      <>
        <EditButton
          type="primary"
          style={{ marginRight: '1rem' }}
          onClick={email._id}
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
          onClick={email._id}
        >
          <AiOutlineDelete size={20} />
        </DeleteButton>
      </>
    ),
  },
];
const List: React.FC<Props> = ({ children }) => {
  const users = useSelector((state: ApplicationState) => state.users.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(FindAll('user'));
  }, [dispatch]);

  return (
    <Card title="Lista de funcionários" style={{ width: '90%' }}>
      <TableComp
        rowKey={(email: any) => email._id}
        dataSource={users}
        columns={columns}
      />
      {children}
    </Card>
  );
};

export default List;
