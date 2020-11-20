import React from 'react';
import { Button, Drawer, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditAction } from '../../../Store/modules/actions';
import { ApplicationState } from '../../../Store';

interface Props {
  children: React.ReactNode;
  [x: string]: any;
}

const EditButton: React.FC<Props> = ({ children, ...rest }) => {
  const data = useSelector((state: ApplicationState) => state.users.data);
  const [state, setState] = React.useState({
    _id: '',
    email: '',
  });

  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values: any) => {
    dispatch(EditAction('user', state._id, values));
  };

  const findUser = (id: string) => {
    const user = data.filter(value => {
      return value._id === id;
    });
    setState({ ...user[0] });
  };
  const handleShow = () => {
    findUser(rest.onClick);
    showDrawer();
  };

  return (
    <>
      <Button {...rest} onClick={handleShow}>
        {children}
      </Button>
      <Drawer
        title="Editar Funcionário"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form
          name="basic"
          initialValues={{ email: state.email }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor insira seu email!',
                type: 'email',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={onClose}
              style={{ marginRight: 8 }}
              htmlType="submit"
              type="primary"
            >
              Cadastrar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default EditButton;
