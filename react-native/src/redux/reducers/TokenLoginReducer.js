import {TOKEN_USER_SUCCESS,
    TOKEN_USER,
    TOKEN_USER_FAIL} from '../actions/types';
  
  const INITIAL_STATE = {
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TOKEN_USER:
          return {loading:true};
      case TOKEN_USER_SUCCESS:
          return INITIAL_STATE;
      case TOKEN_USER_FAIL:
        return INITIAL_STATE;
      default:
        return state;
    }
  };
  