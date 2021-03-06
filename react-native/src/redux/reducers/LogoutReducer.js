import {LOGOUT_USER_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_FAIL,} from '../actions/types';
  
  const INITIAL_STATE = {
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGOUT_USER:
          return {loading:true};
      case LOGOUT_USER_SUCCESS:
          return INITIAL_STATE;
      case LOGOUT_USER_FAIL:
        return INITIAL_STATE;
      default:
        return state;
    }
  };
  