import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { FiSettings, AiFillHdd } from 'react-icons/all';

import { Layout, Select, Skeleton } from 'antd';
import Widget from '../../Components/Widget';
import CreateButton from '../Actives/Components/CreateButton';
import UnitCreate from '../Units/Components/CreateButton';
import StockChart from '../../Components/StockChart';
import EditButton from '../Actives/Components/EditButton';

import { FindAll } from '../../Store/modules/actions';
import { ApplicationState } from '../../Store';
import { IActive } from '../../Store/modules/Actives/types';
import { IUnit } from '../../Store/modules/Units/types';

const { Option } = Select;

const Dashboard: React.FC = () => {
  const [unidade, setUnidade] = React.useState({
    actives: [],
  });

  const [active, setActive] = React.useState({
    _id: '',
    name: '',
    status: '',
    healthScore: 0,
    description: '',
    image: '',
    model: '',
  });
  const dispatch = useDispatch();
  const units = useSelector((state: ApplicationState) => state.units);
  const actives = useSelector((state: ApplicationState) => state.actives.data);

  const { data, loading } = units;

  React.useEffect(() => {
    dispatch(FindAll('company'));
    dispatch(FindAll('unit'));
    dispatch(FindAll('active'));
  }, [dispatch]);

  function handleChangeUnit(value: any) {
    setActive({
      _id: '',
      name: '',
      status: '',
      healthScore: 0,
      description: '',
      image: '',
      model: '',
    });
    const showUnit = data.filter((unit: IUnit) => unit._id === value);
    setUnidade({ ...showUnit[0] });
  }
  function handleChangeActive(value: any) {
    const showActive = unidade.actives.filter(
      (act: IActive) => act._id === value,
    );
    setActive(Object.assign(showActive[0]));
  }

  return (
    <Layout>
      <Layout.Content className="container">
        <div className="topo">
          <div id="select-unit">
            {!loading ? (
              <Select
                defaultValue="Selecione uma unidade"
                style={{ width: '80%' }}
                onChange={handleChangeUnit}
              >
                {data.map(unit => (
                  <Option value={unit._id} key={unit._id}>
                    {unit.name}
                  </Option>
                ))}
              </Select>
            ) : (
              <Skeleton.Button active size="large" style={{ width: 300 }} />
            )}
            <CreateButton name="Adicionar ativo" />
            <div className="active">
              <div className="active-topo">
                {unidade.actives.length !== 0 ? (
                  <Select
                    defaultValue="Selecione o Ativo"
                    style={{ width: '80%' }}
                    onChange={handleChangeActive}
                    className="active-select"
                  >
                    {unidade.actives.map((ativo: IActive) => (
                      <Option value={ativo._id} key={ativo._id}>
                        {ativo.name}
                      </Option>
                    ))}
                  </Select>
                ) : null}
                {active._id !== '' ? (
                  <div className="active-info">
                    <div className="info-body">
                      <img src={active.image} alt="img-active" />
                      <div className="info">
                        <span>
                          Nome do ativo:
                          <small>{active.name}</small>
                        </span>
                        <span>
                          Status:
                          <small>{active.status}</small>
                        </span>
                        <span>
                          Saúde:
                          <small>{active.healthScore}</small>
                        </span>
                        <span>
                          Modelo:
                          <small>{active.model}</small>
                        </span>
                      </div>
                    </div>

                    <p>
                      <span>Descrição:</span>
                      <small>{active.description}</small>
                    </p>
                    <EditButton type="primary" onClick={active._id} block>
                      Editar
                    </EditButton>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="topo">
            <Widget
              icon={<FiSettings color="#fff" size={32} />}
              title="Ativos"
              value={actives.length}
            />
            <Widget
              icon={<AiFillHdd color="#fff" size={32} />}
              title="Unidades"
              value={data.length}
            />
          </div>
          <StockChart data={actives} />
          <UnitCreate name="Adicionar unidade" style={{ marginTop: '1rem' }} />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;
