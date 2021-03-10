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
  StyleSheet,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import localData from '../../localJson/universityData.json';
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

import {RegisterUser} from '../../redux/actions';
import {connect} from 'react-redux';

class RegisterPage extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    password: '',
    userUniversity: 'SAKARYA ÜNİVERSİTESİ',
    userUniversityId:176
  };

  register() {
    const {name, surname, email, password, userUniversity,userUniversityId} = this.state;
    this.props.RegisterUser({name, surname, email, password, userUniversity,userUniversityId});
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFB702',
        }}>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../../assets/back.png')}
              style={{
                width: 20,
                height: 20,
                marginLeft: 20,
              }}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:0
          }}>
          <View>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: width * 0.5, height: width * 0.5}}
                source={require('../../assets/ProfileCreate.png')}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <TextInput
                maxLength={70}
                onChangeText={(name) => {
                  this.setState({name});
                }}
                placeholder="Ad"
                placeholderTextColor="#A16B00"
                style={[
                  styles.TextInputStyle,
                  {width: width * 0.37},
                ]}></TextInput>
              <TextInput
                maxLength={70}
                onChangeText={(surname) => {
                  this.setState({surname});
                }}
                placeholder="Soyad"
                placeholderTextColor="#A16B00"
                style={[
                  styles.TextInputStyle,
                  {width: width * 0.37},
                ]}></TextInput>
            </View>
            <View>
              <View style={{marginBottom: 15}}>
                <TextInput
                  maxLength={70}
                  onChangeText={(email) => {
                    this.setState({email});
                  }}
                  placeholder="E-Mail"
                  placeholderTextColor="#A16B00"
                  autoCapitalize="none"
                  style={styles.TextInputStyle}></TextInput>
              </View>
              <View style={{marginBottom: 15}}>
                <TextInput
                  maxLength={70}
                  secureTextEntry={true}
                  onChangeText={(password) => {
                    this.setState({password});
                  }}
                  placeholder="Şifre"
                  autoCapitalize="none"
                  placeholderTextColor="#A16B00"
                  style={styles.TextInputStyle}></TextInput>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.RBSheetUniversity.open();
                  }}
                  style={[
                    styles.TextInputStyle,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#BEA9F3',
                      fontSize: 20,
                      fontFamily: 'Avenir-Medium',
                    }}>
                    {this.state.userUniversity}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.props.loading ? (
              <View style={{height: 30, marginTop: 20}}>
                <MaterialIndicator size={30} color={'red'}></MaterialIndicator>
              </View>
            ) : (
              <View style={{alignItems: 'center', marginTop: 15}}>
                <TouchableOpacity
                  onPress={() => this.register()}
                  style={{
                    width: width * 0.45,
                    backgroundColor: '#DC9301',
                    borderRadius: 20,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: '#FFAA00',
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 25,
                      textAlign: 'center',
                    }}>
                    Kayıt ol
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>

        <RBSheet
          ref={(ref) => {
            this.RBSheetUniversity = ref;
          }}
          height={height*0.85}
          openDuration={300}
          animationType={'fade'}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            },
          }}>
          <View style={{marginTop: 20}}>
            <FlatList
              data={localData}
              renderItem={({item}) => (
                <View style={{marginLeft: 20, marginBottom: 20}}>
                  <Text
                    style={{
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 20,
                      color: '#C70039',
                    }}>
                    {item.id}-{item.province}
                  </Text>

                  {item.universities.map((x) => {
                    return (
                      <TouchableOpacity
                        style={{marginTop: 7}}
                        onPress={() => {
                          this.setState({userUniversity: x.name,userUniversityId:x.uid});
                          this.RBSheetUniversity.close();
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontFamily: 'AvenirNext-DemiBold',
                            fontSize: 20,
                            color: '#656565',
                          }}>
                          {x.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInputStyle: {
    width: width * 0.8,
    height: 60,
    backgroundColor: '#FFE39C',
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 10,
    color: '#BEA9F3',
    fontFamily: 'AvenirNext-DemiBold',
  },
});

const mapStateToProps = ({registerResponse}) => {
  const loading = registerResponse.loading;
  return {loading};
};

export default connect(mapStateToProps, {RegisterUser})(RegisterPage);
