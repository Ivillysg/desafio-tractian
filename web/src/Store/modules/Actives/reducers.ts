import { Reducer } from 'redux';
import { Actives } from './types';

const INITIAL_STATE: Actives = {
  data: [],
  error: '',
};

const reducer: Reducer<Actives> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@active/FIND_ALL':
      return {
        ...state,
        data: action.payload,
      };
    case '@active/CREATE':
      return {
        ...state,
      };
    case '@active/EDIT':
      return {
        ...state,
      };
    case '@active/DELETE':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
