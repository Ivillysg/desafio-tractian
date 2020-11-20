import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Users from '../Pages/Users';
import Companys from '../Pages/Companys';
import Units from '../Pages/Units';
import Actives from '../Pages/Actives';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/users" component={Users} />
    <Route path="/companys" component={Companys} />
    <Route path="/units" component={Units} />
    <Route path="/actives" component={Actives} />
  </Switch>
);

export default Routes;
