import React, {Component} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {MaterialIndicator} from 'react-native-indicators';
import {
  GetProductDataOwner,
  AddFavoriteProduct,
  DownloadFirstPhoto,
} from '../redux/actions';
import {connect} from 'react-redux';
import {socket} from '../functions/SocketIo';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
import AsyncStorage from '@react-native-community/async-storage';

class ProductDetail extends Component {
  async componentDidMount() {
    await this.props.GetProductDataOwner(
      this.props.route.params.data.productOwner,
    );
    this.props.DownloadFirstPhoto(
      this.props.route.params.data._id,
      this.props.route.params.data.productPhoto,
    );
    socket.on('SendRoomId', (data) => {
      console.log('detail', data.data._id);
      this.props.navigation.navigate('MessageContent', {
        roomId: data.data._id,
      });
    });
  }
  async sendMessage() {
    const userId = await AsyncStorage.getItem('idKitapHAC');
    socket.emit('NewMessageRoom', {
      userId: userId,
      productOwner: this.props.route.params.data.productOwner,
      productId: this.props.route.params.data._id,
    });
  }
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
        <View style={{marginLeft: 10, marginRight: 10}}>
          {this.props.loading ? (
            <View
              style={{
                width: width * 1,
                height: 240,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIndicator></MaterialIndicator>
            </View>
          ) : (
            <FlatListSlider
              data={this.props.images}
              height={240}
              width={200}
              onPress={(item) => {
                null;
              }}
              contentContainerStyle={{paddingHorizontal: 0}}
              animation
            />
          )}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'column', margin: 10, marginLeft: 15}}>
            <View style={{flexDirection: 'column', marginTop: 15}}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 22,
                }}>
                {this.props.route.params.data.productTitle}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 17,
                  color: '#626262',
                  marginLeft: 2,
                }}>
                {this.props.route.params.data.author}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 17,
                  color: '#626262',
                  marginLeft: 2,
                }}>
                {this.props.route.params.data.university}{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 15}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 22,
                    color: '#000000',
                  }}>
                  Detay
                </Text>
              </View>
              <View style={{marginLeft: 10, marginTop: 5, marginRight: 10}}>
                <Text style={{fontSize: 21, fontFamily: 'Avenir-Light'}}>
                  {this.props.route.params.data.productDetail}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('VisitorProfile', {
                  data: this.props.ownerData,
                });
              }}
              style={{flexDirection: 'row', marginTop: 30}}>
              <View>
                <Image
                  source={require('../assets/adam.jpg')}
                  style={{width: 65, height: 72, borderRadius: 20}}></Image>
              </View>
              <View style={{flexDirection: 'column', marginLeft: 10}}>
                <View>
                  <Text
                    style={{fontFamily: 'AvenirNext-DemiBold', fontSize: 20}}>
                    {this.props.ownerData.name} {this.props.ownerData.surname}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Avenir-Medium',
                      fontSize: 17,
                      color: '#626262',
                    }}>
                    Sakarya Üniversitesi
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              height: 95,
              width: width * 0.95,
              backgroundColor: '#5A1BEE',
              borderRadius: 13,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 25,
                  color: '#F8F8F8',
                }}>
                {this.props.route.params.data.productPrice} TL
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <Image
                source={require('../assets/chat.png')}
                style={{width: 38, height: 38, tintColor: '#F8F8F8'}}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.AddFavoriteProduct(this.props.route.params.data._id);
              }}>
              <Image
                source={require('../assets/like.png')}
                style={{width: 38, height: 38, tintColor: '#F8F8F8'}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({getProductDataResponse, getImageResponse}) => {
  const ownerData = getProductDataResponse;
  const images = getImageResponse.data;
  console.log(images, 'compooo');
  const loading = getImageResponse.loading;
  return {ownerData, images, loading};
};
export default connect(mapStateToProps, {
  GetProductDataOwner,
  AddFavoriteProduct,
  DownloadFirstPhoto,
})(ProductDetail);
