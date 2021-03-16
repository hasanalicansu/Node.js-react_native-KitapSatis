import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;
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


export default class Settings extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../assets/back.png')}
              style={{
                width: 20,
                height: 20,
                marginTop: 9,
                marginLeft: 20,
                marginBottom: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', flex: 1, marginTop: 30}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              marginHorizontal: 20,
              marginTop: 5,
            }}>
            <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate("AvatarSettings")}}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 22,
                    color: '#2B1717',
                    textAlign: 'center',
                  }}>
                  Profil fotoğrafı değiştir
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={require('../assets/next.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
