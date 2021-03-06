import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {connect} from 'react-redux';
import {log} from 'react-native-reanimated';
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

import {downloadImage} from '../../functions/downloadFunctions';

class OnSaleComponents extends Component {
  state = {
    image: '',
  };

  async componentDidMount() {
    const photoUrl = await downloadImage(this.props.data._id);
    console.log(photoUrl);
    this.setState({image: photoUrl});
  }

  render() {
    return (
        <View
        style={{
          width: 300,
          backgroundColor: '#FACD5C',
          height: 150,
          borderRadius: 7,
          justifyContent: 'center',
          marginTop: 20,
          marginLeft: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{marginLeft: 17}}>
          {this.state.image == '' ? (
              <View
                style={{
                  width: 60,
                  height: 100,
                  marginLeft: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIndicator color={"#B03B3B"}></MaterialIndicator>
              </View>
            ) : (
              <Image
                style={{
                  width: 60,
                  height: 100,
                  marginLeft: 5,
                }}
                source={{uri: this.state.image}}
              />
            )}
            
          </View>
          <View style={{marginLeft: 15, flexDirection: 'column'}}>
            <View>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 18,
                  marginRight: -15,
                  width: 150,
                }}>
                {this.props.data.productTitle}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Avenir-Medium',
                    fontSize: 16,
                    color: '#626262',
                  }}>
                  {this.props.data.author}
                </Text>
                <Text
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 16,
                    color: '#000000',
                  }}>
                  {this.props.data.productPrice} TL
                </Text>
              </View>
            </View>
            <View></View>
          </View>
        </View>
        
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: '#FF4D4D',
              }}
              source={require('../../assets/view.png')}
            />
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 5,
                fontSize: 16,
                fontFamily: 'Avenir-Light',
              }}>
              {this.props.data.counter}
            </Text>
          </View>
        
          <Text style={{fontSize: 16, fontFamily: 'Avenir-Light'}}>
            02.11.2010
          </Text>
        </View>
        </View>
          );
  }
}

export default connect(null, {
 
})(OnSaleComponents);
