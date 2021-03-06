import {GET_PRODUCT_SALE_OWN,GET_PRODUCT_SOLD_OWN} from '../actions/types';

const INITIAL_STATE = {
  loading:true
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT_SALE_OWN:
      return action.payload;
    case GET_PRODUCT_SOLD_OWN:
       return action.payload;
    default:
      return state;
  }
};

