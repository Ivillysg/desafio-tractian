import React from 'react';
import { Button, Drawer, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditAction } from '../../../Store/modules/actions';
import { ApplicationState } from '../../../Store';

const { Option } = Select;

interface Props {
  children: React.ReactNode;
  [x: string]: any;
}

const EditButton: React.FC<Props> = ({ children, ...rest }) => {
  const companys = useSelector(
    (state: ApplicationState) => state.companys.data,
  );
  const users = useSelector((state: ApplicationState) => state.users.data);
  const [state, setState] = React.useState({
    _id: '',
    name: '',
    assignedTo: {
      email: '',
    },
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
    dispatch(EditAction('company', state._id, values));
  };

  const find = (id: string) => {
    const company = companys.filter(value => {
      return value._id === id;
    });
    setState({ ...company[0] });
  };
  const handleShow = () => {
    find(rest.onClick);
    showDrawer();
  };

  return (
    <>
      <Button {...rest} onClick={handleShow}>
        {children}
      </Button>
      <Drawer
        title="Editar Empresa"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form
          name="basic"
          initialValues={{
            name: state.name,
            assignedTo: state.assignedTo.email,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Por favor insira o nome da sua empresa!',
              },
            ]}
          >
            <Input placeholder="Digite o nome da empresa" />
          </Form.Item>
          <Form.Item
            name="assignedTo"
            rules={[
              {
                required: true,
                message: 'Por favor insira o nome da empresa',
              },
            ]}
          >
            <Select>
              {users.map(user => (
                <Option value={user._id} key={user._id}>
                  {user.email}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              onClick={onClose}
              style={{ marginRight: 8 }}
              htmlType="submit"
              type="primary"
            >
              Editar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default EditButton;
