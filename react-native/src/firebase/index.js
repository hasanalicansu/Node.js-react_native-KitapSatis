import firebase from 'firebase';
import 'firebase/storage';

export const app = firebase.initializeApp({
  apiKey: 'XXXXXXXXXXXX',
  authDomain: 'kitap-xxxx.firebaseapp.com',
  projectId: 'kitap-xxxx',
  storageBucket: 'kitap-xxxx.appspot.com',
  messagingSenderId: 'XXXXXXXXXXXX',
  appId: 'XXXXXXXXXXXX',
  measurementId: 'XXXXXXXXXXXX',
});