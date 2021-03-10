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
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
//import {socket} from "../../functions/SocketIo";
import io from 'socket.io-client/dist/socket.io';
import {downloadImage} from '../../functions/downloadFunctions';
export default class MessageRoomComponents extends Component {
  state = {
    title: '',
    university: '',
    situation: false,
    url: '',
  };
  async componentDidMount() {
    socket = io('http://localhost:80');
    
    socket.emit('GetProductDetail', {Id: this.props.data.productId});
    socket.on('SendProductDetail', async (data) => {
      this.setState({
        title: data.data.productTitle,
        university: data.data.university,
        situation: data.data.situation,
      });
      const photoUrl = await downloadImage(data.data._id);
      this.setState({url: photoUrl});
    });
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navi.navigation.navigate('MessageContent', {
            roomId: this.props.data._id,
            phtourl: this.state.url,
            title: this.state.title,
            university: this.state.university,
            productId: this.props.data.productId,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#FFF',
            width: width * 1,
            height: 120,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: 200,
              height: 100,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 17,
                  color: '#000000',
                }}>
                {this.state.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 3,
                  fontFamily: 'Avenir-Medium',
                  fontSize: 14,
                  color: '#000000',
                }}>
                {this.state.university}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {this.state.situation ? (
                <Text
                  style={{
                    fontFamily: 'Avenir-Medium',
                    fontSize: 14,
                    color: '#1FA91C',
                  }}>
                  Satışta
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: 'Avenir-Medium',
                    fontSize: 14,
                    color: 'red',
                  }}>
                  Satıldı
                </Text>
              )}

              <Text
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 14,
                  color: '#000000',
                }}>
                22.11.2012
              </Text>
            </View>
          </View>

          <View style={{width: 70, height: 100}}>
            {this.state.url == '' ? (
              <Image style={{width: 70, height: 100}} />
            ) : (
              <Image
                style={{width: 70, height: 100}}
                source={{uri: this.state.url}}
              />
            )}
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#633974',
            borderBottomWidth: 1,
          }}
        />
      </TouchableOpacity>
    );
  }
}
