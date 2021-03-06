import {AVATAR_USER_SUCCESS,
    AVATAR_USER,
    AVATAR_USER_FAIL,} from '../actions/types';
  
  const INITIAL_STATE = {
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AVATAR_USER:
          return {loading:true};
      case AVATAR_USER_SUCCESS:
          return INITIAL_STATE;
      case AVATAR_USER_FAIL:
        return INITIAL_STATE;
      default:
        return state;
    }
  };
  