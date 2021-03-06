import {GET_PRODUCT_OWNER,GET_PRODUCT_SALE_VISITOR} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const GetProductDataOwner =  (id) => {
    return async (dispatch) => {
      const userToken = await AsyncStorage.getItem('tokenKitapHAC');
      const res = await axios.get('http://localhost:3000/api/product/GetProductOwner/'+id, {
        headers: {
          Authorization: "Bearer "+userToken,
        },
      });
      
      dispatch({type: GET_PRODUCT_OWNER, payload: res.data})
    };
  };



export const GetVisitorSaleProduct =  (id) => {
  return async (dispatch) => {
   try {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    console.log("girdi");
    const res = await axios.get('http://localhost:3000/api/product/GetVisitorProduct/'+id, {
      headers: {
        Authorization: "Bearer "+userToken,
      },
    });
    console.log(res,"hako");
    console.log(res.data,"hasalica");
    
    dispatch({type: GET_PRODUCT_SALE_VISITOR, payload: res.data})
   } catch (error) {
    console.log("hata");
    console.log(error);
   }
  };
};


export const PlusCounterProduct =  (id,data) => {
  return  async() => {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    const res=await axios.get('http://localhost:3000/api/product/plusCounterProduct/'+id, {
      headers: {
        Authorization: "Bearer "+userToken,
      },
    });
    console.log(res.status);
    if (res.status==200) {
      RooterNavigation.navigate('ProductDetail', {
        data: data,
      });
    }
  };
};
