import {
  UPDATE_PRODUCT,
  UPDATE_SITUATION_PRODUCT,
  UPDATE_SITUATION_PRODUCT_SUCCESS,
  DOWNLOAD_PHOTO,
  DOWNLOAD_PHOTO_SUCCESS,
  PRODUCT_ADD_AVAILABLES,
} from './types';
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

export const UpdateProduct = (
  id,
  productTitle,
  productName,
  author,
  productDetail,
  productPrice,
  university,
  universityId,
  situation,
) => {
  return async (dispatch) => {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    if (
      productTitle != '' &&
      productName != '' &&
      author != '' &&
      productDetail != '' &&
      productPrice > 0 &&
      university != ''
    ) {
      dispatch({type: UPDATE_SITUATION_PRODUCT});
      const res = await axios.patch(
        'https://kitapsatis.herokuapp.com/api/product/updateProduct/' + id,
        {
          productTitle,
          productName,
          author,
          productDetail,
          productPrice,
          university,
          universityId,
          situation,
        },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        },
      );
      console.log(res.data, 'update hata');
      if (res.data.ok == 1) {
        setTimeout(function () {
          dispatch({type: UPDATE_SITUATION_PRODUCT_SUCCESS});
        }, 5000);
        toastAlert('ürün güncellendi ve yayına alındı');
        RooterNavigation.navigate('UserProfile');
      } else {
        toastAlert('Hata oluştu');
      }
    } else if (productPrice == 0) {
      toastAlert('Ürünün fıyatı boş ve sıfır olamaz');
    } else {
      toastAlert('Boş bırakılan yerleri doldurunuz');
    }
  };
};

export const UpdateSituationProduct = (id, situation) => {
  return async (dispatch) => {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    dispatch({type: UPDATE_SITUATION_PRODUCT});
    const res = await axios.patch(
      'https://kitapsatis.herokuapp.com/api/product/updateSituationProduct/' + id,
      {
        situation,
      },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + userToken,
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

export const DeleteProduct = (id, photoArray) => {
  return async (dispatch) => {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    dispatch({type: UPDATE_SITUATION_PRODUCT});

    await Promise.all(
      photoArray.map(async (x) => {
        await deleteImage(id, x.address);
      }),
    );

    const res = await axios.get(
      'https://kitapsatis.herokuapp.com/api/product/dellProduct/' + id,
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      },
    );

    if (res.data) {
      dispatch({type: UPDATE_SITUATION_PRODUCT_SUCCESS});
      toastAlert('ürünün silindi');
      RooterNavigation.navigate('UserProfile');
    } else {
      toastAlert('Hata oluştu');
    }
  };
};

export const CreateNewProduct = (
  productTitle,
  author,
  productDetail,
  productPrice,
  university,
  universityId,
  photoArray,
) => {
  return async (dispatch) => {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    const length = await arrayLength(photoArray);
    if (
      productTitle != '' &&
      author != '' &&
      productDetail != '' &&
      productPrice > 0 &&
      university != '' &&
      length != 0
    ) {
      dispatch({type: UPDATE_SITUATION_PRODUCT});
      const res = await axios.post(
        'https://kitapsatis.herokuapp.com/api/product/newProduct?count=' + length,
        {
          productTitle,
          author,
          productDetail,
          productPrice,
          university,
          universityId
        },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        },
      );
      console.log(res.data, 'yeni data');
      if (res) {
        counter = 0;
        await Promise.all(
          photoArray.map(async (x) => {
            (counter = counter + 1),
              await uploadImage(x, counter, res.data._id);
          }),
        );
        //counter = 1;

        dispatch({type: UPDATE_SITUATION_PRODUCT_SUCCESS});
        toastAlert('ürün yayına alındı');

        RooterNavigation.pop();
      } else {
        toastAlert('Hata oluştu');
      }
    } else if (productPrice == 0) {
      toastAlert('Ürünün fıyatı boş ve sıfır olamaz');
    } else {
      toastAlert('Boş bırakılan yerleri doldurunuz');
    }
  };
};

export const GetAvailables = () => {
  return async (dispatch) => {
    dispatch({type: PRODUCT_ADD_AVAILABLES});
  };
};

export const DownloadFirstPhoto = (id, count) => {
  return async (dispatch) => {
    dispatch({type: DOWNLOAD_PHOTO});
    const images = [];

    await Promise.all(
      count.map(async (x) => {
        const photoUrl = await downloadImage(id, x.address);
        images.push({image: photoUrl});
      }),
    );
    console.log(images, 'action');

    //console.log(photoUrl,"exporttttttt");
    dispatch({type: DOWNLOAD_PHOTO_SUCCESS, payload: images});
  };
};

async function uploadImage(image, counter, id) {
  return new Promise((resolve, reject) => {
    console.log(counter, 'sayac');
    let imgUri = image.path;
    let uploadBlob = null;
    const uploadUri =
      Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    console.log(uploadUri, Platform.OS);

    const imageRef = app
      .storage()
      .ref('product/')
      .child(id + counter);

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

async function deleteImage(id, number) {
  const imageName = id + number;
  console.log(imageName, 'ımage name', number, ' ', id);
  let imageRef = app.storage().ref('product/' + imageName);
  const photoUrl = imageRef
    .delete()
    .then(() => {
      console.log('silindi');
    })
    .catch((e) => {
      console.log('getting downloadURL of image error => ', e);
      return false;
    });
  return true;
}

async function downloadImage(id, number) {
  const imageName = id + number;
  let imageRef = app.storage().ref('product/' + imageName);
  const photoUrl = imageRef
    .getDownloadURL()
    .then((url) => {
      //console.log(url,"foto download")
      return url;
    })
    .catch((e) => console.log('getting downloadURL of image error => ', e));
  return photoUrl;
}

function arrayLength(photoArray) {
  let counter = 0;
  for (let i = 0; i < photoArray.length; i++) {
    if (photoArray[i]) {
      counter += 1;
    }
  }
  return counter;
}

function toastAlert(dataString) {
  Toast.showWithGravity(dataString, Toast.SHORT, Toast.TOP);
}
