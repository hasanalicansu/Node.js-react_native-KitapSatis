import {GET_FAVORITE_PRODUCT,ADD_FAVORITE_PRODUCT} from '../actions/types';

const INITIAL_STATE = {
  loading:true
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FAVORITE_PRODUCT:
      return {...state,loading:false,data:action.payload};
    case ADD_FAVORITE_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

