import {app} from '../firebase';

export const downloadImage = async (id) => {
  const imageName = id + 1;
  let imageRef = app.storage().ref('product/' + imageName);
  const photoUrl = imageRef
    .getDownloadURL()
    .then((url) => {
      return url;
    })
    .catch((e) => console.log('getting downloadURL of image error => ', e));
  return photoUrl;
};

export const downloadAvatar = async (id) => {
  const imageName = id;
  let imageRef = app.storage().ref('avatar/' + imageName);
  const photoUrl = imageRef
    .getDownloadURL()
    .then((url) => {
      return url;
    })
    .catch((e) => console.log('getting downloadURL of image error => ', e));
  return photoUrl;
};
