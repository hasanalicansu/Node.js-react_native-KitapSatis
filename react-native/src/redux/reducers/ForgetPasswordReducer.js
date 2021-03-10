import {
    FORGET_USER_SUCCESS,
FORGET_USER,
FORGET_USER_FAIL
  } from '../actions/types';
  
  const INITIAL_STATE = {
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FORGET_USER:
          return {loading:true};
      case FORGET_USER_SUCCESS:
          return INITIAL_STATE;
      case FORGET_USER_FAIL:
        return INITIAL_STATE;
      default:
        return state;
    }
  };
  