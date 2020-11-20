import React from 'react';
import { Button, Drawer, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { CreateAction } from '../../../Store/modules/actions';

const Create: React.FC = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values: any) => {
    dispatch(CreateAction('user', values));
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Adicionar
      </Button>
      <Drawer
        title="Cadastrar Funcionário"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form name="basic" onFinish={handleSubmit}>
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

export default Create;
