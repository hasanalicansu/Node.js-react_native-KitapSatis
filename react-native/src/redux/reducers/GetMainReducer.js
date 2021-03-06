import {GET_MAIN_PRODUCT} from '../actions/types';

const INITIAL_STATE = {
  loading:true,
  data:[]
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MAIN_PRODUCT:
      return {...state,loading:false,data:action.payload};
    default:
      return state;
  }
};

