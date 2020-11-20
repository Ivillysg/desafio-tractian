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
  const units = useSelector((state: ApplicationState) => state.units.data);
  const companys = useSelector(
    (state: ApplicationState) => state.companys.data,
  );
  const [state, setState] = React.useState({
    _id: '',
    name: '',
    company: {
      name: '',
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
    dispatch(EditAction('unit', state._id, values));
  };
  const find = (id: string) => {
    const unit = units.filter(value => {
      return value._id === id;
    });
    setState({ ...unit[0] });
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
        title="Editar Unidade"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form
          name="basic"
          initialValues={{
            name: state.name,
            company: state.company.name,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Por favor insira o nome da unidade!',
              },
            ]}
          >
            <Input placeholder="Digite o nome da unidade" />
          </Form.Item>
          <Form.Item
            name="company"
            rules={[
              {
                required: true,
                message: 'Por favor escolha a empresa',
              },
            ]}
          >
            <Select>
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
