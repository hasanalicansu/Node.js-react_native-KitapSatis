import {FORGET_USER_SUCCESS, FORGET_USER, FORGET_USER_FAIL} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

export const ForgetPasswordFunction = (email) => {
  return async (dispatch) => {
    
    dispatch({type: FORGET_USER});

    const res = await axios.post(
      'https://xxxxxxxx.herokuapp.com/api/users/forgetPassword',
      {
        email
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

    
    if (res.status == 206) {
      dispatch({type: FORGET_USER_FAIL});
      Toast.showWithGravity(res.data.msg, Toast.SHORT, Toast.TOP);
    } else if (res.status == 200) {
      dispatch({type: FORGET_USER_SUCCESS});
      Toast.showWithGravity(res.data.msg, Toast.SHORT, Toast.TOP);
      RooterNavigation.pop();
    }
  };
};
