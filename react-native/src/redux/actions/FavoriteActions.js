import {GET_FAVORITE_PRODUCT, ADD_FAVORITE_PRODUCT} from './types';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

//const token =
 // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE4MDQwMjgyNzEwMDBiZGFhY2I1YTgiLCJpYXQiOjE2MTIxODc0ODMsImV4cCI6MTYxNDc3OTQ4M30.XORgDo8HTTKpEPE6b-seSPPF04Q2ZUeRDHpPbYDu2UQ';

async function GetFavoriteProductFunction() {
  try {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    const res = await axios.get(
      'https://kitapsatis.herokuapp.com/api/favorite/getFavorite',
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      },
    );
    return res;
  } catch (error) {
    Toast.showWithGravity('Problem oluştu 1' + error, Toast.SHORT, Toast.TOP);
  }
}

async function AddFavoriteProductFunction(id) {
  try {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    const res = await axios.get(
      'https://kitapsatis.herokuapp.com/api/favorite/addFavorite/' + id,
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      },
    );
    return res;
  } catch (error) {
    Toast.showWithGravity('Problem oluştu2 ' + error, Toast.SHORT, Toast.TOP);
  }
}

export const GetFavoriteProduct = () => {
  return async (dispatch) => {
    res = await GetFavoriteProductFunction();
    dispatch({type: GET_FAVORITE_PRODUCT, payload: res.data})
  };
};

export const AddFavoriteProduct = (id) => {
  return async (dispatch) => {
    res = await AddFavoriteProductFunction(id);

    if (res.status == 200) {
      Toast.showWithGravity('Favorilere eklendi', Toast.SHORT, Toast.TOP);
      //res2 = await GetFavoriteProductFunction();
      //dispatch({type: GET_FAVORITE_PRODUCT, payload: res2.data});
    } else if (res.status == 204) {
      Toast.showWithGravity(
        'Favorilere daha önce eklendi',
        Toast.SHORT,
        Toast.TOP,
      );
    }
  };
};

export const DellFavoriteProduct = (id) => {
  return async (dispatch) => {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    const res = await axios.get(
      'https://kitapsatis.herokuapp.com/api/favorite/deleteFavorite/' + id,
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      },
    );
    if (res.status == 200) {
      Toast.showWithGravity('Favorilerden silindi', Toast.SHORT, Toast.TOP);
      res2 = await GetFavoriteProductFunction();
      dispatch({type: GET_FAVORITE_PRODUCT, payload: res2.data});
    } else if (res.status == 204) {
      Toast.showWithGravity(
        'Silinirken problem oluştu',
        Toast.SHORT,
        Toast.TOP,
      );
    }
  };
};






/*


export const AddFavoriteProduct = (id) => {
  console.log('girdi 2');
  return async (dispatch) => {
    console.log('girdi');
    //const userToken = await AsyncStorage.getItem('token');
    const res = await axios.get(
      'https://kitapsatis.herokuapp.com/api/favorite/addFavorite/' + id,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    if (res.status == 200) {
      Toast.showWithGravity('Favorilere eklendi', Toast.SHORT, Toast.TOP);
    } else if (res.status == 204) {
      Toast.showWithGravity(
        'Favorilere daha önce eklendi',
        Toast.SHORT,
        Toast.TOP,
      );
    }
  };
};


*/
