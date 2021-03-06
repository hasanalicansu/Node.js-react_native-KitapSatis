import {
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_SUCCESS,
  } from './types';
  import * as RooterNavigation from '../../routers/RooterNavigation.js';
  import axios from 'axios';
  import {Alert} from 'react-native';
  import AsyncStorage from '@react-native-community/async-storage';
  import Toast from 'react-native-simple-toast';
import { add } from 'lodash';



export const SearchProduct = (title,universiteId,sıralama) => {
    return async (dispatch) => {
      const userToken = await AsyncStorage.getItem('tokenKitapHAC');
      let add=""
      if (universiteId!=0) {
        add+="&universiteId="+universiteId
      }
      if (sıralama!=0) {
        add+="&sortBy="+sıralama
      }
      universiteId="karadağ"
    
      dispatch({type: SEARCH_PRODUCT});
      
      const res = await axios.post(
        'https://xxxxxxxx.herokuapp.com/api/product/GetSearch'+'?s=n'+add,
        {
          title
        },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        },
      );



      if (res) {
        dispatch({type: SEARCH_PRODUCT_SUCCESS,payload: res.data});
      } else {
        toastAlert('Hata oluştu');
      }
    };
  };
  
  