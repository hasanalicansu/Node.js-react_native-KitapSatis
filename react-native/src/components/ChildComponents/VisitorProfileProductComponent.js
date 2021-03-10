import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
import {MaterialIndicator} from 'react-native-indicators';
import {downloadImage} from '../../functions/downloadFunctions';
export default class VisitorProfileProductComponent extends Component {
  state = {
    image: '',
  };
  async componentDidMount() {
    const photoUrl = await downloadImage(this.props.data._id);
    this.setState({image: photoUrl});
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navi.navigation.push('ProductDetail', {
            data: this.props.data,
          })
        }>
        <View
          style={{
            width: width * 0.75,
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
              alignItems: 'center',
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
                  <MaterialIndicator color={'#B03B3B'}></MaterialIndicator>
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
            <View
              style={{
                marginLeft: 15,
                flexDirection: 'column',

                width: width * 0.5,
              }}>
              <View>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 18,
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
                <View style={{width: 143}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'Avenir-Medium',
                      fontSize: 16,
                      color: '#626262',
                    }}>
                    {this.props.data.university}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'Avenir-Medium',
                      fontSize: 16,
                      color: '#626262',
                    }}>
                    {this.props.data.category}
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
                <TouchableOpacity
                  onPress={() => {
                    this.props.navi.AddFavoriteProduct(this.props.data._id);
                  }}
                  style={{
                    justifyContent: 'center',
                    marginTop: 30,
                    marginRight: 10,
                  }}>
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
              <View></View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
