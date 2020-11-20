import { Reducer } from 'redux';
import { Units } from './types';

const INITIAL_STATE: Units = {
  data: [],
  loading: true,
};

const reducer: Reducer<Units> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@unit/FIND_ALL':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case '@unit/CREATE':
      return {
        ...state,
      };
    case '@unit/EDIT':
      return {
        ...state,
      };
    case '@unit/DELETE':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
