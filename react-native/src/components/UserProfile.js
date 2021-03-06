import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {downloadAvatar} from '../functions/downloadFunctions';
import {connect} from 'react-redux';
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;
import {Logout} from '../redux/actions';
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

class UserProfile extends Component {
  state = {
    name: '',
    surname: '',
    university: '',
    avatarUrl: '',
  };
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('idKitapHAC');
    const nameT = await AsyncStorage.getItem('nameKitapHAC');
    const surnameT = await AsyncStorage.getItem('surnameKitapHAC');
    const universityT = await AsyncStorage.getItem('universityKitapHAC');
    const url = await downloadAvatar(userId);

    this.setState({
      name: nameT,
      surname: surnameT,
      university: universityT,
      avatarUrl: url,
    });

    console.log(nameT, surnameT, universityT);
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
              
            }}>
            <View style={{flexDirection: 'column',width:width*0.5,justifyContent:"space-around"}}>
              <Text
              numberOfLines={2}
                style={{
                  fontFamily: 'Avenir-Black',
                  fontSize: 30,
                  color: '#000000',
                }}>
                {this.state.name} {this.state.surname} 
              </Text>
              
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 15,
                  color: '#626262',
                  marginLeft: 2,
                  marginTop: 10,
                  
                }}>
                {this.state.university}
              </Text>
            </View>
            <View style={{width: 115, height: 115, borderRadius: 20,backgroundColor:"orange"}}>
              {this.state.avatarUrl == '' ? (
                <MaterialIndicator></MaterialIndicator>
              ) : (
                <View>
                  
                  {this.state.avatarUrl? <Image
                    style={{width: 115, height: 115, borderRadius: 20}}
                    source={{uri: this.state.avatarUrl}}></Image>:<Image
                    style={{width: 115, height: 115, borderRadius: 20}}
                    source={require("../assets/adam.jpg")}></Image>}
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 40,
              
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Settings');
              }}
              style={{
                width: width*0.5,
                height: 50,
                backgroundColor: '#373EEC',
                opacity: 0.7,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}>
              <Text
              numberOfLines={1}
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 22,
                  color: '#F8F8F8',
                  textAlign: 'center',
                }}>
                AYARLAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.Logout();
              }}
              style={{justifyContent: 'center'}}>
              <Image
                style={{width: 45, height: 45, tintColor: '#FF2121'}}
                source={require('../assets/logout.png')}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: 80,
             
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('OnSale');
              }}
              style={{
                width: width * 0.4,
                height: 65,
                backgroundColor: '#FACD5C',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}>
              <Text
              numberOfLines={1}
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 22,
                  color: '#373EEC',
                  textAlign: 'center',
                  opacity: 0.7,
                }}>
                Satışta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Sold');
              }}
              style={{
                width: width * 0.4,
                height: 65,
                backgroundColor: '#D6D6D6',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}>
              <Text
              numberOfLines={1}
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 22,
                  color: '#373EEC',
                  textAlign: 'center',
                  opacity: 0.7,
                }}>
                Satıldı
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.props.loading ? (
          <View
            style={{
              zIndex: 10,
              position: 'absolute',
              width: width * 1,
              height: height * 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <View style={{height: 40, marginBottom: 10}}>
                <UIActivityIndicator size={40}></UIActivityIndicator>
              </View>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 17,
                }}>
                Çıkış yapılıyor
              </Text>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({logoutResponse}) => {
  const loading = logoutResponse.loading;
  return {loading};
};

export default connect(mapStateToProps, {Logout})(UserProfile);
