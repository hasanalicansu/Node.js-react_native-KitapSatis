import {LOGOUT_USER_SUCCESS, LOGOUT_USER, LOGOUT_USER_FAIL} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const Logout = () => {
  return async (dispatch) => {
    dispatch({type: LOGOUT_USER});
    AsyncStorage.clear()
    RooterNavigation.reset("LoginPage");
    dispatch({type: LOGOUT_USER_SUCCESS});
  };
};

