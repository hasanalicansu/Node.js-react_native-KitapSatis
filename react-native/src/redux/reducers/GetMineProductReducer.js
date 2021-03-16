import {GET_PRODUCT_SALE_OWN} from '../actions/types';

const INITIAL_STATE = {
  loading:true
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT_SALE_OWN:
      return action.payload;
    
    default:
      return state;
  }
};

