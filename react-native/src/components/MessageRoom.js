import React, {Component} from 'react';
import io from 'socket.io-client/dist/socket.io';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import MessageRoomComponents from './ChildComponents/MessageRoomComponents';
import AsyncStorage from '@react-native-community/async-storage';
(width = Dimensions.get('window').width),
(height = Dimensions.get('window').height);
dataa = [1, 2];
import {socket} from "../functions/SocketIo";



export default class MessageRoom extends Component {
  state={roomData:[]}
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('idKitapHAC');
    socket.emit('GetMessageRoom',{userId:userId});
    socket.on("SendMessageRoom",(data)=>{
      //console.log("room",data);
      this.state.roomData=data;
      this.setState({roomData:data})
    })
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Avenir-Black',
                fontSize: 23,
                color: '#373EEC',
                marginLeft: 10,
                opacity: 0.7,
              }}>
              {' '}
              Mesajlar
            </Text>
          </View>
          <View style={{marginTop: 20,flex:1}}>
            <FlatList
            bounces={false}
              data={this.state.roomData.data}
              renderItem={({item}) => (<View>
                
                <MessageRoomComponents navi={this.props} data={item}></MessageRoomComponents>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
