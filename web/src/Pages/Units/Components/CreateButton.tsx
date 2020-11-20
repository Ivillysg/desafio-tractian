import React from 'react';
import { Button, Drawer, Form, Input, Select } from 'antd';
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
  const companys = useSelector(
    (state: ApplicationState) => state.companys.data,
  );

  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values: any) => {
    const { company } = values;
    dispatch(CreateAction('unit', values, company));
  };

  return (
    <>
      <Button type="primary" {...rest} onClick={showDrawer}>
        {name}
      </Button>
      <Drawer
        title="Cadastrar unidade"
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
                message: 'Por favor insira o nome da sua unidade',
              },
            ]}
          >
            <Input placeholder="Nome da Unidade" />
          </Form.Item>

          <Form.Item
            name="company"
            rules={[
              {
                required: true,
                message: 'Por favor escolha o nome da empresa',
              },
            ]}
          >
            <Select defaultValue="Selecione uma empresa">
              {companys.map(company => (
                <Option value={company._id} key={company._id}>
                  {company.name}
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
