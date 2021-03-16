import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import {
  DotIndicator,
  BallIndicator,
  WaveIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
} from 'react-native-indicators';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
import AsyncStorage from '@react-native-community/async-storage';
import {loginUser, loginWithToken} from '../../redux/actions';
import {connect} from 'react-redux';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  login() {
    const {email, password} = this.state;
    this.props.loginUser({email, password});
  }

  async componentDidMount() {
    this.props.loginWithToken();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#4F309C',
        }}>
        {this.props.tokenLoading ? (
          <PacmanIndicator color={'#FFB702'}></PacmanIndicator>
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={{width: width * 0.7, height: width * 0.7}}
                    source={require('../../assets/BookLover_3.png')}
                  />
                </View>
                <View>
                  <View style={{marginBottom: 15}}>
                    <TextInput
                      autoCapitalize="none"
                      maxLength={70}
                      onChangeText={(email) => {
                        this.setState({email});
                      }}
                      placeholder="E-Mail"
                      style={{
                        width: width * 0.8,
                        height: 60,
                        backgroundColor: '#6747B5',
                        borderRadius: 20,
                        fontSize: 20,
                        paddingLeft: 10,
                        color: '#BEA9F3',
                        fontFamily: 'AvenirNext-DemiBold',
                      }}></TextInput>
                  </View>
                  <View>
                    <TextInput
                      autoCapitalize="none"
                      maxLength={70}
                      secureTextEntry={true}
                      onChangeText={(password) => {
                        this.setState({password});
                      }}
                      placeholder="Şifre"
                      style={{
                        width: width * 0.8,
                        height: 60,
                        backgroundColor: '#6747B5',
                        borderRadius: 20,
                        fontSize: 20,
                        paddingLeft: 10,
                        color: '#000',
                        fontFamily: 'AvenirNext-DemiBold',
                      }}></TextInput>
                  </View>
                </View>

                {this.props.loading ? (
                  <View style={{height: 30, marginTop: 20}}>
                    <MaterialIndicator
                      size={30}
                      color={'purple'}></MaterialIndicator>
                  </View>
                ) : (
                  <View style={{alignItems: 'center', marginTop: 15}}>
                    <TouchableOpacity
                      onPress={() => this.login()}
                      style={{
                        width: width * 0.6,
                        backgroundColor: '#352068',
                        borderRadius: 20,
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          color: '#8A69D9',
                          fontFamily: 'AvenirNext-DemiBold',
                          fontSize: 25,
                          textAlign: 'center',
                        }}>
                        GO
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={{alignItems: 'center', marginTop: 13}}>
                  <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate("ForgetPassword")}}>
                    <Text
                      style={{
                        color: '#A49ABB',
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 17,
                        textAlign: 'center',
                      }}>
                      Şifremi unuttum?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                alignContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 17,
                    color: '#F3D6FA',
                  }}>
                  Yeni hesap
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('RegisterPage')}
                  style={{
                    backgroundColor: '#AB3EC3',
                    padding: 5,
                    marginLeft: 5,
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 17,
                      color: '#F3D6FA',
                    }}>
                    Oluştur
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({loginResponse, tokenLoginResponse}) => {
  const tokenLoading = tokenLoginResponse.loading;

  const loading = loginResponse.loading;
  return {loading, tokenLoading};
};

export default connect(mapStateToProps, {loginUser, loginWithToken})(LoginPage);
