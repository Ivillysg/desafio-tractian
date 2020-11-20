import React from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteAction } from '../../../Store/modules/actions';

interface Props {
  children: React.ReactNode;
  [x: string]: any;
}
const { confirm } = Modal;

const DeleteButton: React.FC<Props> = ({ children, ...rest }) => {
  const [state, setState] = React.useState({
    _id: '',
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    setState({ _id: rest.onClick });
  }, [dispatch, rest.onClick]);

  function showDeleteConfirm() {
    confirm({
      title: 'Tem certeza de que deseja excluir?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        dispatch(DeleteAction('company', state._id));
      },
    });
  }

  const handleShow = () => {
    showDeleteConfirm();
  };
  return (
    <>
      <Button {...rest} onClick={handleShow}>
        {children}
      </Button>
    </>
  );
};

export default DeleteButton;
