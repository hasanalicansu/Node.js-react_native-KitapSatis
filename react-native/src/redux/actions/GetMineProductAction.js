import {GET_PRODUCT_SOLD_OWN,GET_PRODUCT_SALE_OWN} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const GetOwnProductOnSale =  (id) => {
  return async (dispatch) => {
   try {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
   
    const res = await axios.get('https://xxxxxxxx.herokuapp.com/api/product/GetOwnerProductOnSale', {
      headers: {
        Authorization: "Bearer "+userToken,
      },
    });
    
   
    
    dispatch({type: GET_PRODUCT_SALE_OWN, payload: res.data})
   } catch (error) {
   
    console.log(error);
   }
  };
};


export const GetOwnProductSold =  (id) => {
    return async (dispatch) => {
      const userToken = await AsyncStorage.getItem('tokenKitapHAC');
     try {
      
      const res = await axios.get('https://xxxxxxxx.herokuapp.com/api/product/GetOwnerProductSold', {
        headers: {
          Authorization: "Bearer "+userToken,
        },
      });
     
      
      dispatch({type: GET_PRODUCT_SOLD_OWN, payload: res.data})
     } catch (error) {
      
      console.log(error);
     }
    };
  };
  
  