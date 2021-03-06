import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
export default class SearchComponents extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navi.navigation.navigate('ProductDetail', {
            data: this.props.data,
          });
        }}
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          height: 220,
          width: width * 0.46,
          backgroundColor: 'orange',
          borderRadius: 7,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{width:width*0.2,backgroundColor:"",alignItems:"center"}}>
            <Image
              source={require('../../assets/dan_brown.jpg')}
              style={{width: 60, height: 100}}
            />
          </View>

          <View
            style={{
              width:width*0.2,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems:"center",
              backgroundColor:""
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 18,
                  color: '#000000',
                }}>
                {this.props.data.productPrice} TL
              </Text>
            </View>
            <TouchableOpacity>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  tintColor: '#FF4D4D',
                }}
                source={require('../../assets/like.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View >
          <View style={{flexDirection: 'column', marginTop: 10,width:width*0.40,backgroundColor:"",alignSelf:"center"}}>
            <View>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 16,
                }}>
                {this.props.data.productTitle}
              </Text>
              <Text
              numberOfLines={2}
              style={{
                fontFamily: 'Avenir-Medium',
                fontSize: 16,
                color: '#626262',
              }}>
              {this.props.data.author}
            </Text>
            </View>
            
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
