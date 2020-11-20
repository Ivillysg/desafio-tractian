import React from 'react';
import { Card } from 'antd';
import { AiOutlineDelete, BiEdit } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';

import TableComp from '../../../Components/Table';
import { ApplicationState } from '../../../Store';
import { FindAll } from '../../../Store/modules/actions';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { IUnit } from '../../../Store/modules/Units/types';

interface Props {
  children?: React.ReactNode;
}
const columns = [
  {
    title: 'Unidade',
    dataIndex: 'name',
    width: '85%',
  },

  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (unit: IUnit) => (
      <>
        <EditButton
          type="primary"
          style={{ marginRight: '1rem' }}
          onClick={unit._id}
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
          onClick={unit._id}
        >
          <AiOutlineDelete size={20} />
        </DeleteButton>
      </>
    ),
  },
];
const List: React.FC<Props> = ({ children }) => {
  const units = useSelector((state: ApplicationState) => state.units.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(FindAll('company'));
    dispatch(FindAll('unit'));
  }, [dispatch]);

  return (
    <Card title="Lista de unidades" style={{ width: '90%' }}>
      <TableComp
        rowKey={(unit: IUnit) => unit._id}
        dataSource={units}
        columns={columns}
      />
      {children}
    </Card>
  );
};

export default List;
