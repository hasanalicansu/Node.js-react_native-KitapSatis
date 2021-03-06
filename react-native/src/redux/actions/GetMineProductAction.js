import {GET_PRODUCT_SOLD_OWN,GET_PRODUCT_SALE_OWN} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const GetOwnProductOnSale =  (id) => {
  return async (dispatch) => {
   try {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    console.log("girdi");
    const res = await axios.get('http://localhost:3000/api/product/GetOwnerProductOnSale', {
      headers: {
        Authorization: "Bearer "+userToken,
      },
    });
    console.log(res.data,"kendi ürünüm satışta");
   
    
    dispatch({type: GET_PRODUCT_SALE_OWN, payload: res.data})
   } catch (error) {
    console.log("hata");
    console.log(error);
   }
  };
};


export const GetOwnProductSold =  (id) => {
    return async (dispatch) => {
      const userToken = await AsyncStorage.getItem('tokenKitapHAC');
     try {
      console.log("girdi");
      const res = await axios.get('http://localhost:3000/api/product/GetOwnerProductSold', {
        headers: {
          Authorization: "Bearer "+userToken,
        },
      });
      console.log(res.data,"kendi ürünüm satıldı");
     
      
      dispatch({type: GET_PRODUCT_SOLD_OWN, payload: res.data})
     } catch (error) {
      console.log("hata");
      console.log(error);
     }
    };
  };
  
  