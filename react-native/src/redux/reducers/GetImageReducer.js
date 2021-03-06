import {
  DOWNLOAD_PHOTO,
  DOWNLOAD_PHOTO_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DOWNLOAD_PHOTO:
      return {loading: true};
    case DOWNLOAD_PHOTO_SUCCESS:
      return {loading: false,data:action.payload};
    default:
      return state;
  }
};
