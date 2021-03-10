import * as RooterNavigation from '../../routers/RooterNavigation';
import {GET_MESSAGE, SEND_MESSAGE} from './types';
import {app} from '../../firebase';
import AsyncStorage from '@react-native-community/async-storage';

export const getMessage = (roomId) => {
  const roomID = roomId;

  return (dispatch) => {
    app
      .database()
      .ref('/mesajlar/' + roomID)
      .on('value', (messageData) => {
        const messages = [];
       
        messageData.forEach((dataFriend) => {
          messages.push({
            id: dataFriend.key,
            ...dataFriend.val(),
          });
        }),
          dispatch({type: GET_MESSAGE, payload: messages});
      });
  };
};

export const sendMessage = (roomId, messageText) => {
  
  const time = new Date().getTime();

  const roomID = roomId;
  return async(dispatch) => {
    const userId = await AsyncStorage.getItem('idKitapHAC');
    app
      .database()
      .ref('/mesajlar/' + roomID)
      .push({
        sendId:userId,
        text: messageText,
        time,
      });
  };
};
