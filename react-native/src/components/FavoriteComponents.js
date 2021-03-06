import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {DellFavoriteProduct} from '../redux/actions';
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

(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
import {downloadImage} from '../functions/downloadFunctions';

class FavoriteComponents extends Component {
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
          width: width * 0.9,
          backgroundColor: '#FF9A9A',
          height: 220,
          borderRadius: 5,
          justifyContent: 'center',
          marginTop: 20,

          opacity: 0.83,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{marginLeft: 17}}>
            {this.state.image == '' ? (
              <View
                style={{
                  width: 120,
                  height: 200,
                  marginLeft: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIndicator color={'#B03B3B'}></MaterialIndicator>
              </View>
            ) : (
              <Image
                style={{
                  width: 90,
                  height: 150,
                  marginLeft: 5,
                }}
                source={{uri: this.state.image}}
              />
            )}
          </View>

          <View style={{marginLeft: 15, flexDirection: 'column', width: width*0.55,justifyContent:"space-around",}}>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 18,

                  
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
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Avenir-Medium',
                    fontSize: 16,
                    color: '#626262',
                  }}>
                  {this.props.data.university}
                </Text>
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
            <TouchableOpacity
              onPress={() => {
                this.props.DellFavoriteProduct(this.props.data._id);
              }}
              style={{
                width: width * 0.5,
                height: 50,
                backgroundColor: '#C24D4D',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
                flexDirection: 'row',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 18,
                  fontFamily: 'AvenirNext-DemiBold',
                  textAlign: 'center',
                }}>
                Kaldır
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, {
  DellFavoriteProduct,
})(FavoriteComponents);
