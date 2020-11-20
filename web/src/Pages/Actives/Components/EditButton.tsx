import React from 'react';
import { Button, Drawer, Form, Input, Select, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setInterval } from 'timers';
import { EditAction } from '../../../Store/modules/actions';
import { ApplicationState } from '../../../Store';

const { Option } = Select;

interface Props {
  children: React.ReactNode;
  [x: string]: any;
}

const EditButton: React.FC<Props> = ({ children, ...rest }) => {
  const actives = useSelector((state: ApplicationState) => state.actives.data);
  const [state, setState] = React.useState({
    _id: '',
    name: '',
    unit: {
      name: '',
    },
    status: '',
    healthScore: 0,
    description: 'string',
    model: '',
    image: '',
    assignedTo: '',
    company: '',
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
    dispatch(EditAction('active', state._id, values));
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };
  const find = (id: string) => {
    const active = actives.filter(value => {
      return value._id === id;
    });
    setState({ ...active[0] });
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
        title="Editar Ativo"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form
          name="basic"
          initialValues={{
            name: state.name,
            description: state.description,
            model: state.model,
            image: state.image,
            healthScore: state.healthScore,
            status: state.status,
            unit: state.unit.name,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Por favor insira o nome do ativo',
              },
            ]}
          >
            <Input placeholder="Nome do ativo" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Por favor insira a descrição',
              },
            ]}
          >
            <Input placeholder="Descrição" />
          </Form.Item>
          <Form.Item
            name="model"
            rules={[
              {
                required: true,
                message: 'Por favor insira o modelo',
              },
            ]}
          >
            <Input placeholder="Nome do modelo" />
          </Form.Item>

          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: 'Por favor insira o link da image',
              },
            ]}
          >
            <Input placeholder="Url da image" />
          </Form.Item>
          <Form.Item
            name="healthScore"
            rules={[
              {
                message: 'Por favor insira o nível de saúde',
                type: 'number',
              },
            ]}
          >
            <InputNumber placeholder="N.Saúde" />
          </Form.Item>
          <Form.Item name="status">
            <Select defaultValue="Selecione o status">
              <Option value="Disponível">Disponível</Option>
              <Option value="Em manutenção">Em manutenção</Option>
              <Option value="Desativado">Desativado</Option>
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
