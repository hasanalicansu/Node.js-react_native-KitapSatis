import {GET_PRODUCT_SALE_VISITOR} from '../actions/types';

const INITIAL_STATE = {
  loading:true
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT_SALE_VISITOR:
      return action.payload;
    default:
      return state;
  }
};

