import React from 'react';
import { Button, Drawer, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAction } from '../../../Store/modules/actions';
import { ApplicationState } from '../../../Store';

const { Option } = Select;

const Create: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: ApplicationState) => state.users.data);

  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values: any) => {
    const { assignedTo } = values;
    dispatch(CreateAction('company', values, assignedTo));
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Adicionar
      </Button>
      <Drawer
        title="Cadastrar Empresa"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form name="basic" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Por favor insira o nome da empresa',
              },
            ]}
          >
            <Input placeholder="Nome da Empresa" />
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
            <Select defaultValue="Selecione um funcionário">
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
              Cadastrar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Create;
