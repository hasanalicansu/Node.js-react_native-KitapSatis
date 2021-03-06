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

import {UpdateSituationProduct,DeleteProduct,DownloadFirstPhoto} from '../redux/actions';
import {connect} from 'react-redux';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);



class MineProductDetail extends Component {
  state = {};
  async componentDidMount(){
    this.props.DownloadFirstPhoto(
    
      this.props.route.params.data._id,
      this.props.route.params.data.productPhoto,
    );
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

        {this.props.loadingImage ? (
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
              
              onPress={(item) => {null}}
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
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 17,
                  color: '#626262',
                  marginLeft: 2,
                }}>
                {this.props.route.params.data.category}
              </Text>
              <Text
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 17,
                  color: '#626262',
                  marginLeft: 2,
                }}>
                {this.props.route.params.data.productPrice} TL
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
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          {this.props.route.params.data.situation == true ? (
            <View>
              {this.props.loading == true ? (
                <PacmanIndicator></PacmanIndicator>
              ) : (
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
                  <TouchableOpacity
                    onPress={() => {
                      this.props.UpdateSituationProduct(
                        this.props.route.params.data._id,
                        false,
                      );
                    }}>
                    <Image
                      source={require('../assets/wallet.png')}
                      style={{
                        width: 38,
                        height: 38,
                        tintColor: '#F8F8F8',
                      }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('EditProduct', {
                        data: this.props.route.params.data,
                      });
                    }}>
                    <Image
                      source={require('../assets/settings.png')}
                      style={{
                        width: 38,
                        height: 38,
                        tintColor: '#F8F8F8',
                      }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => {
                    this.props.DeleteProduct(this.props.route.params.data._id,this.props.route.params.data.productPhoto)
                  }}>
                    <Image
                      source={require('../assets/delete.png')}
                      style={{
                        width: 38,
                        height: 38,
                        tintColor: '#F8F8F8',
                      }}></Image>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
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
            
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('EditProduct', {
                  data: this.props.route.params.data,
                });
              }}>
              <Image
                source={require('../assets/settings.png')}
                style={{
                  width: 38,
                  height: 38,
                  tintColor: '#F8F8F8',
                }}></Image>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
              this.props.DeleteProduct(this.props.route.params.data._id,this.props.route.params.data.productPhoto)
            }}>
              <Image
                source={require('../assets/delete.png')}
                style={{
                  width: 38,
                  height: 38,
                  tintColor: '#F8F8F8',
                }}></Image>
            </TouchableOpacity>
          </View>
       
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({productUpdateResponse,getImageResponse}) => {
  const loading = productUpdateResponse.loading;
  const images = getImageResponse.data;

  const loadingImage = getImageResponse.loading;

  return {loading,images,loadingImage};
};
export default connect(mapStateToProps, {UpdateSituationProduct,DeleteProduct,DownloadFirstPhoto})(
  MineProductDetail,
);
