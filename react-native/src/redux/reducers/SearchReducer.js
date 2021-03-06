import {SEARCH_PRODUCT,
    SEARCH_PRODUCT_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  loading:false,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT:
      return {loading:true}
    case SEARCH_PRODUCT_SUCCESS:
      return {INITIAL_STATE,data:action.payload}
    default:
      return state;
  }
};

