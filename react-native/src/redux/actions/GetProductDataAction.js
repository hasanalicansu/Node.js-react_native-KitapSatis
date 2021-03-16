import {GET_PRODUCT_OWNER,GET_PRODUCT_SALE_VISITOR} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const GetProductDataOwner =  (id) => {
    return async (dispatch) => {
      const userToken = await AsyncStorage.getItem('tokenKitapHAC');
      const res = await axios.get('https://xxxxxxxx.herokuapp.com/api/product/GetProductOwner/'+id, {
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
   
    const res = await axios.get('https://xxxxxxxx.herokuapp.com/api/product/GetVisitorProduct/'+id, {
      headers: {
        Authorization: "Bearer "+userToken,
      },
    });
   
    
    dispatch({type: GET_PRODUCT_SALE_VISITOR, payload: res.data})
   } catch (error) {
   
    console.log(error);
   }
  };
};


export const PlusCounterProduct =  (id) => {
  return  async() => {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    const res=await axios.get('https://xxxxxxxx.herokuapp.com/api/product/plusCounterProduct/'+id, {
      headers: {
        Authorization: "Bearer "+userToken,
      },
    });
    console.log(res.status);
    if (res.status==200) {
     
      RooterNavigation.navigate('ProductDetail', {
        data: res.data,
      });
    }
  };
};
