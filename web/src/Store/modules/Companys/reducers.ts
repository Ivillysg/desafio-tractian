import { Reducer } from 'redux';
import { Companys } from './types';

const INITIAL_STATE: Companys = {
  data: [],
  error: '',
};

const reducer: Reducer<Companys> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@company/FIND_ALL':
      return {
        ...state,
        data: action.payload,
      };
    case '@company/CREATE':
      return {
        ...state,
      };
    case '@company/EDIT':
      return {
        ...state,
      };
    case '@company/DELETE':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
