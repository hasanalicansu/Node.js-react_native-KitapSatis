import {REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
        return {loading:true};
    case REGISTER_USER_SUCCESS:
        return INITIAL_STATE;
    case REGISTER_USER_FAIL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
