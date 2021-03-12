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

import {PlusCounterProduct} from '../../redux/actions';
import {connect} from 'react-redux';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
  import {downloadImage} from "../../functions/downloadFunctions";
 class SearchComponents extends Component {
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
      <TouchableOpacity
        onPress={() => {
          this.props.PlusCounterProduct(this.props.data._id)
          
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
                  fontSize: 16,textAlign:"center"
                }}>
                {this.props.data.productTitle}
              </Text>
              <Text
              numberOfLines={2}
              style={{
                fontFamily: 'Avenir-Medium',
                fontSize: 16,
                color: '#626262',textAlign:"center"
              }}>
              {this.props.data.author}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: 'Avenir-Medium',
                fontSize: 16,
                color: '#626262',textAlign:"center"
              }}>
              {this.props.data.university}
            </Text>
            </View>
            
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


export default connect(null, {
  
  PlusCounterProduct
})(SearchComponents);
