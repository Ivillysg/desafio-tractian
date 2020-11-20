import { combineReducers } from 'redux';

import { reducer as toastrReducer } from 'react-redux-toastr';
import users from './Users/reducers';
import companys from './Companys/reducers';
import units from './Units/reducers';
import actives from './Actives/reducers';

export default combineReducers({
  users,
  companys,
  units,
  actives,
  toastr: toastrReducer,
});
