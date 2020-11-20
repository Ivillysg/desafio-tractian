import React from 'react';
import { Card } from 'antd';
import { AiOutlineDelete, BiEdit } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';

import TableComp from '../../../Components/Table';
import { ApplicationState } from '../../../Store';
import { FindAll } from '../../../Store/modules/actions';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { ICompany } from '../../../Store/modules/Companys/types';

interface Props {
  children?: React.ReactNode;
}
const columns = [
  {
    title: 'Empresa',
    dataIndex: 'name',
    width: '85%',
  },

  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (company: ICompany) => (
      <>
        <EditButton
          type="primary"
          style={{ marginRight: '1rem' }}
          onClick={company._id}
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
          onClick={company._id}
        >
          <AiOutlineDelete size={20} />
        </DeleteButton>
      </>
    ),
  },
];
const List: React.FC<Props> = ({ children }) => {
  const companys = useSelector(
    (state: ApplicationState) => state.companys.data,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(FindAll('user'));
    dispatch(FindAll('company'));
  }, [dispatch]);

  return (
    <Card title="Lista de empresas" style={{ width: '90%' }}>
      <TableComp
        rowKey={(company: ICompany) => company._id}
        dataSource={companys}
        columns={columns}
      />
      {children}
    </Card>
  );
};

export default List;
