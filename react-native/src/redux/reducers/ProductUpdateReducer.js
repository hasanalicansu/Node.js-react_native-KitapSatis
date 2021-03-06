import {UPDATE_PRODUCT,UPDATE_SITUATION_PRODUCT,UPDATE_SITUATION_PRODUCT_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  loading:false
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT:
      return action.payload;
    case UPDATE_SITUATION_PRODUCT:
      return {loading:true}
    case UPDATE_SITUATION_PRODUCT_SUCCESS:
      return INITIAL_STATE
    default:
      return state;
  }
};

