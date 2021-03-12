import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
import {
  AddFavoriteProduct,
  GetFavoriteProduct,
  PlusCounterProduct
} from '../../redux/actions';
import {connect} from 'react-redux';
import {downloadImage} from "../../functions/downloadFunctions";
import {
  DotIndicator,
  BallIndicator,
  WaveIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator
} from 'react-native-indicators';
class LastAdd extends Component {
  state = {
    image:"" };
  async componentDidMount() {
    const photoUrl = await downloadImage(this.props.data._id);
    this.setState({image: photoUrl});
  }

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <TouchableOpacity
          onPress={() => {
            this.props.PlusCounterProduct(this.props.data._id);
          }}>
          <View
            style={{
              width: 280,
              backgroundColor: '#E2E2E2',
              height: 150,
              borderRadius: 7,
              justifyContent: 'center',
              marginTop: 20,
              marginLeft: 10,
              
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 130,
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
              <View
                style={{marginLeft: 15, flexDirection: 'column', width: 150}}>
                <View>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 18,
                    }}>
                    {this.props.data.productTitle}
                  </Text>
                </View>
                <View style={{width: 150}}>
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
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#000000',
                      }}>
                      {this.props.data.productPrice} TL
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.AddFavoriteProduct(this.props.data._id);
                    }}
                    style={{justifyContent: 'center'}}>
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        tintColor: '#FE5C31',
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
      </View>
    );
  }
}

const mapStateToProps = ({favoriteResponse}) => {
  const mainData = favoriteResponse;
  return {mainData};
};
export default connect(mapStateToProps, {
  AddFavoriteProduct,
  GetFavoriteProduct,
  PlusCounterProduct
})(LastAdd);
