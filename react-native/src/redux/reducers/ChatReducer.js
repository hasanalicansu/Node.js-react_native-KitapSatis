import {GET_MESSAGE, SEND_MESSAGE} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return {...state,loading:true, getMessage: action.payload};
    case SEND_MESSAGE:
      return {...state, sendMessage: action.payload};
    default:
      return state;
  }
};