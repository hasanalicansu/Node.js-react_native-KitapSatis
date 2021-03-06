import {LOGIN_USER_SUCCESS,
    LOGIN_USER,
    LOGIN_USER_FAIL,} from '../actions/types';
  
  const INITIAL_STATE = {
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGIN_USER:
          return {loading:true};
      case LOGIN_USER_SUCCESS:
          return INITIAL_STATE;
      case LOGIN_USER_FAIL:
        return INITIAL_STATE;
      default:
        return state;
    }
  };
  