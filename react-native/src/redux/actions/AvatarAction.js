import {AVATAR_USER_SUCCESS, AVATAR_USER, AVATAR_USER_FAIL} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

import RNFetchBlob from 'react-native-fetch-blob';
import {app} from '../../firebase';
import {log} from 'react-native-reanimated';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const NewProfilePhoto = (profilePhoto) => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('idKitapHAC');
      dispatch({type: AVATAR_USER});
      await uploadImage(profilePhoto, userToken);

      dispatch({type: AVATAR_USER_SUCCESS});
      toastAlert('Profil fotoğrafı değiştirildi');

      RooterNavigation.pop();
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

    const imageRef = app
      .storage()
      .ref('avatar/')
      .child(id);

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
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });
}



function toastAlert(dataString) {
    Toast.showWithGravity(dataString, Toast.SHORT, Toast.TOP);
  }
  