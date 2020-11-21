import React from 'react';
import { Button, Drawer, Form, Input, Select, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAction } from '../../../Store/modules/actions';
import { ApplicationState } from '../../../Store';

const { Option } = Select;

interface Props {
  name: string;
  [x: string]: any;
}
const Create: React.FC<Props> = ({ name, ...rest }) => {
  const dispatch = useDispatch();
  const units = useSelector((state: ApplicationState) => state.units.data);

  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values: any) => {
    const { unit } = values;
    dispatch(CreateAction('active', values, unit));
  };

  return (
    <>
      <Button type="primary" {...rest} onClick={showDrawer}>
        {name}
      </Button>
      <Drawer
        title="Cadastrar Ativo"
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
          <Form.Item
            name="unit"
            rules={[
              {
                required: true,
                message: 'Por favor escolha o nome da empresa',
              },
            ]}
          >
            <Select defaultValue="Selecione uma unidade">
              {units.map(unit => (
                <Option value={unit._id} key={unit._id}>
                  {unit.name}
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
