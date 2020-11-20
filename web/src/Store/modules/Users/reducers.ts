import { Reducer } from 'redux';
import { Users } from './types';

const INITIAL_STATE: Users = {
  data: [],
  error: '',
};

const reducer: Reducer<Users> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@user/FIND_ALL':
      return {
        ...state,
        data: action.payload,
      };
    case '@user/CREATE':
      return {
        ...state,
      };
    case '@user/EDIT':
      return {
        ...state,
      };
    case '@user/DELETE':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
