import {AVATAR_USER_SUCCESS, AVATAR_USER, AVATAR_USER_FAIL} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

import RNFetchBlob from 'react-native-fetch-blob';
import {app} from '../../firebase';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

/*
export const UpdateSituationProduct = (id, situation) => {
  return async (dispatch) => {
    const userId = await AsyncStorage.getItem('tokenKitapHAC');
    dispatch({type: UPDATE_SITUATION_PRODUCT});
    const res = await axios.patch(
      'http://localhost:3000/api/product/updateSituationProduct/' + id,
      {
        situation,
      },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + userId,
        },
      },
    );
    console.log(res.data);
    if (res.data.ok == 1) {
      dispatch({type: UPDATE_SITUATION_PRODUCT_SUCCESS});
      toastAlert('ürünün durumu güncellendi');
      RooterNavigation.navigate('UserProfile');
    } else {
      toastAlert('Hata oluştu');
    }
  };
};
*/

export const NewProfilePhoto = (profilePhoto) => {
  return async (dispatch) => {
    try {
      const userId = await AsyncStorage.getItem('idKitapHAC');
      const userToken = await AsyncStorage.getItem('tokenKitapHAC');
      dispatch({type: AVATAR_USER});
      const res = await uploadImage(profilePhoto, userId);
      console.log(res, 'gelen');
      if (res.durum == true) {
        console.log('trueİçi');
        const resPhoto = await axios.patch(
          'https://kitapsatis.herokuapp.com/api/users/updateAvatar',
          {
            url: res.photoUrl,
          },
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
          },
        );

        console.log(resPhoto.status, 'değişimden gelen');
        if (resPhoto.status == 200) {
          await AsyncStorage.setItem("avatarHAC", res.photoUrl);
          dispatch({type: AVATAR_USER_SUCCESS});
          toastAlert('Profil fotoğrafı değiştirildi');
        } else {
          toastAlert('Hata oluştu');
          dispatch({type: AVATAR_USER_FAIL});
        }
        RooterNavigation.pop();
      }
    } catch (error) {
      toastAlert('Hata oluştu');
      dispatch({type: AVATAR_USER_FAIL});
    }
  };
};

async function uploadImage(image, id) {
  return new Promise((resolve, reject) => {
    let imgUri = image.path;
    let uploadBlob = null;
    const uploadUri =
      Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    console.log(uploadUri, Platform.OS);

    const imageRef = app.storage().ref('avatar/').child(id);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, {type: `${image.mime};BASE64`});
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, {
          contentType: image.mime,
          name: image.filename,
        });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        console.log(url);
        resolve({durum: true, photoUrl: url});
      })
      .catch((error) => {
        console.log(error);
        reject(false);
      });
  });
}

function toastAlert(dataString) {
  Toast.showWithGravity(dataString, Toast.SHORT, Toast.TOP);
}
