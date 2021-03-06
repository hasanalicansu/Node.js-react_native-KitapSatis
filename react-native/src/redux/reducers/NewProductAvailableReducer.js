import {PRODUCT_ADD_AVAILABLES} from '../actions/types';
  
  const INITIAL_STATE = {
    university: 'Karaman Üniversitesi',
    illustration: 0,
    title: '',
    detail: '',
    author: '',
    price: 0,
    loadingAvailable:true
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PRODUCT_ADD_AVAILABLES:
        return INITIAL_STATE;
      default:
        return state;
    }
  };
  