import {GET_MAIN_PRODUCT} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const GetMainProduct =  () => {
    return async (dispatch) => {
      const userToken = await AsyncStorage.getItem('tokenKitapHAC');
      const resNew = await axios.get('https://xxxxxxxx.herokuapp.com/api/product/GetTenLastProduct', {
        headers: {
          Authorization: "Bearer "+userToken,
        },
      });
      const resMost = await axios.get('https://xxxxxxxx.herokuapp.com/api/product/GetTenMostProduct', {
        headers: {
          Authorization: "Bearer "+userToken,
        },
      });
      res={"resNew":resNew.data,"resMost":resMost.data}
      
      dispatch({type: GET_MAIN_PRODUCT, payload: res})
    };
  };