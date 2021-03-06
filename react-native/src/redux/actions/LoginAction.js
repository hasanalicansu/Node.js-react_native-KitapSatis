import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_REGISTER_PAGE,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  TOKEN_USER_SUCCESS,
  TOKEN_USER,
  TOKEN_USER_FAIL,
} from './types';
import * as RooterNavigation from '../../routers/RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

export const loginUser = ({email, password}) => {
  return async (dispatch) => {
    dispatch({type: LOGIN_USER});

    if (email === '' || password === '') {
      Alert.alert(
        'BOŞ ALAN',
        'Lütfen boş olan alanı doldurunuz',
        [{text: 'OK', onPress: () => loginFail(dispatch)}],
        {cancelable: false},
      );
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/login',
        data: {
          email: email,
          password: password,
        },
      })
        .then(async (user) => {
          console.log(user.data);
          const resToken = await saveData('tokenKitapHAC', user.data.token);
          const resName = await saveData('nameKitapHAC', user.data.user.name);
          const resId = await saveData('idKitapHAC', user.data.user._id);
          const resSurname = await saveData(
            'surnameKitapHAC',
            user.data.user.surname,
          );
          const resEmail = await saveData(
            'emailKitapHAC',
            user.data.user.email,
          );
          const resUniversity = await saveData(
            'universityKitapHAC',
            user.data.user.userUniversity,
          );
          console.log(resUniversity);
          readData();
        })
        .then(() => loginSuccess(dispatch))
        .catch(() => {
          Toast.showWithGravity('Giriş yapılamadı', Toast.SHORT, Toast.TOP),
            loginFail(dispatch);
        });
    }
  };
};

const registerLoginUser = (email) => {
  Alert.alert(
    'Kayıt Başarılı',
    email +
      ' Belirtilen E-mail ile başarılı bir şekilde hesap oluşturuldu, lütfen giriş yapınız',
    [
      {
        text: 'TAMAM',
        onPress: () => {
          RooterNavigation.navigate('LoginPage');
        },
      },
    ],
    {cancelable: false},
  );
};

export const RegisterUser = ({
  name,
  surname,
  email,
  password,
  userUniversity,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_USER,
      });
      console.log(name, surname, email, password, userUniversity);
      const res = await axios.post(
        'http://localhost:3000/api/users/createAccount',
        {
          name: name,
          surname: surname,
          email: email.toLowerCase(),
          password: password,
          userUniversity: userUniversity,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      if (res.status == 206) {
        console.log(res.status);
        Alert.alert(
          'HATA',
          res.data.msg,
          [
            {
              text: 'TAMAM',
              onPress: () =>
                dispatch({
                  type: REGISTER_USER_FAIL,
                }),
            },
          ],
          {cancelable: false},
        );
      } else if (res.status == 200) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
        });
        registerLoginUser(res.data.email);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    try {
      dispatch({type: TOKEN_USER});
      const token = await AsyncStorage.getItem('tokenKitapHAC');
      if (token) {
        const tokenGo = (await 'Bearer ') + token;
        const res = await axios.get(
          'http://localhost:3000/api/users/login/token',
          {
            headers: {
              Authorization: tokenGo,
            },
          },
        );

        if (
          res.data.msg == 'invalid token' ||
          res.data.msg == 'jwt expired' ||
          res.data.msg == 'jwt malformed'
        ) {
          return loginFail(dispatch);
        } else {
          dispatch({
            type: TOKEN_USER_SUCCESS,
          });
          return loginSuccess(dispatch);
        }
      } else {

        dispatch({
          type: TOKEN_USER_FAIL,
        });
        RooterNavigation.push('OnboardingComponents');
      }
    } catch (error) {
      loginFail(dispatch);
    }
  };
};

const saveData = async (dataName, data) => {
  try {
    await AsyncStorage.setItem(dataName, data);
    return true;
  } catch (e) {}
};

const readData = async () => {
  try {
    const userToken = await AsyncStorage.getItem('tokenKitapHAC');
    console.log(userToken);
  } catch (e) {
    alert('Failed to fetch the data from storage');
  }
};

const loginSuccess = (dispatch) => {
  console.log('darararö');
  dispatch({
    type: LOGIN_USER_SUCCESS,
  });
  //RooterNavigation.navigate('LoggedIn');
  RooterNavigation.reset("LoggedIn");
};

const loginFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL,
  });
};


/*
RooterNavigation.navigate('LoggedIn');

RooterNavigation.reset("LoggedIn");
 */