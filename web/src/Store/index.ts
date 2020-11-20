import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/rootReducers';

import { Users } from './modules/Users/types';
import { Companys } from './modules/Companys/types';
import { Units } from './modules/Units/types';
import { Actives } from './modules/Actives/types';

export interface ApplicationState {
  users: Users;
  companys: Companys;
  units: Units;
  actives: Actives;
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
  ),
);
export default store;
