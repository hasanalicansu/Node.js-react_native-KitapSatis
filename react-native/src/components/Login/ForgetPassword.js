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

import {ForgetPasswordFunction} from '../../redux/actions';
import {connect} from 'react-redux';

class ForgetPassword extends Component {
  state = {
    email: '',
  };

  send() {
    const {email} = this.state;
    this.props.ForgetPasswordFunction(email);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#2D4059',
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
                    source={require('../../assets/Reading_book_Two_Color.png')}
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
                      onPress={() => this.send()}
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
                        Gönder
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({forgetPasswordResponse}) => {
    
  const loading = forgetPasswordResponse.loading;
  return {loading};
};

export default connect(mapStateToProps, {ForgetPasswordFunction})(
  ForgetPassword
);
