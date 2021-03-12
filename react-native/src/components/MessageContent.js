import React, {Component} from 'react';

import io, {url} from 'socket.io-client/dist/socket.io';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
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
import {sendMessage, getMessage,PlusCounterProduct} from '../redux/actions';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

class MessageContent extends Component {
  state = {
    text: '',
    UId: '',
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('idKitapHAC');
    this.setState({UId: userId});
    this.props.getMessage(this.props.route.params.roomId);
    console.log(this.props.route.params);
  }

  sendMessageLocal() {
    this.props.sendMessage(this.props.route.params.roomId, this.state.text);
    this.setState({text: ''});
    setTimeout(() => {
      this.flatListRef.scrollToEnd();
    }, 200);
  }
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF'}}>
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
        {!this.props.loading ? (
          <UIActivityIndicator></UIActivityIndicator>
        ) : (
          <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                width: width * 1,
                alignItems: 'center',
                height: 140,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
              onPress={()=>{this.props.PlusCounterProduct(this.props.route.params.productId)}}
                style={{
                  shadowColor: '#6C3483',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 5.46,

                  elevation: 9,
                  flexDirection: 'row',
                  backgroundColor: '#FFFFFF',
                  width: width * 0.7,
                  height: 120,
                  width: width * 0.8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    width: 100,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    height: 100,
                  }}>
                  <Image
                    style={{width: 70, height: 100}}
                    source={{uri: this.props.route.params.phtourl}}
                  />
                </View>
                <View
                  style={{
                    width: width * 0.4,
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    height: 100,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 17,
                      color: '#000000',
                    }}>
                    {this.props.route.params.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 15,
                      color: '#000000',
                    }}>
                    {this.props.route.params.university}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              ref={(ref) => (this.flatListRef = ref)}
              data={this.props.messageData}
              renderItem={({item}) => (
                <View style={{marginBottom: 10, marginRight: 10}}>
                  {item.sendId == this.state.UId ? (
                    <View style={{flexDirection: 'row-reverse'}}>
                      <View
                        style={{backgroundColor: '#743294', borderRadius: 5}}>
                        <Text
                          style={{
                            paddingHorizontal: height * 0.015,
                            paddingVertical: height * 0.007,
                            backgroundColor: '#743294',
                            margin: 4,
                            elevation: 2,
                            color: '#FFFFFF',
                          }}>
                          {item.text}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            color: '#B3B6B7',
                            textAlign: 'right',
                            marginHorizontal: 2,
                          }}>
                          {((d = new Date(item.time)), d.toLocaleString())}{' '}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row', marginLeft: 10}}>
                      <View
                        style={{backgroundColor: '#2D7C69', borderRadius: 5}}>
                        <Text
                          style={{
                            paddingHorizontal: height * 0.015,
                            paddingVertical: height * 0.007,

                            margin: 4,
                            elevation: 2,
                            color: '#FFFFFF',
                          }}>
                          {item.text}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            color: '#B3B6B7',
                            textAlign: 'left',
                            marginHorizontal: 2,
                          }}>
                          {((d = new Date(item.time)), d.toLocaleString())}{' '}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 100,
          }}>
          <View
            style={{
              backgroundColor: '#EAEAEA',
              width: width * 0.8,
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <TextInput
              autoFocus={true}
              value={this.state.text}
              onChangeText={(text) => this.setState({text})}
              multiline={true}
              style={{
                width: width * 0.8,
                paddingBottom: 20,
                fontFamily: 'AvenirNext-DemiBold',
                fontSize: 17,
                color: '#633974',
              }}></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.state.text.trim() == '' ? null : this.sendMessageLocal();
            }}
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'AvenirNext-DemiBold',
                fontSize: 15,
                color: '#2471A3',
              }}>
              Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({chatResponse}) => {
  const loading = chatResponse.loading;
  const messageData = chatResponse.getMessage;

  return {messageData, loading};
};
export default connect(mapStateToProps, {
  sendMessage,
  getMessage,
  PlusCounterProduct
})(MessageContent);

/*
<Text>HASAN</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.sendMessage(this.props.route.params.roomId, 'denme1')
          }>
          <Text>CANSUUUUUU</Text>
        </TouchableOpacity>*/

/*

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
import AsyncStorage from '@react-native-community/async-storage';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
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
import {sendMessage, getMessage} from '../redux/actions';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

class MessageContent extends Component {
  state = {
    text: '',
    UId: '',
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('idKitapHAC');
    this.setState({UId: userId});
    this.props.getMessage(this.props.route.params.roomId);
    this.flatListRef.scrollToEnd()
  }

  sendMessageLocal() {
    this.props.sendMessage(this.props.route.params.roomId, this.state.text);
    this.setState({text: ''});
    this.flatListRef.scrollToEnd()
  }
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF'}}>
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
        {!this.props.loading ? (
          <UIActivityIndicator></UIActivityIndicator>
        ) : (
          <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
            <FlatList
              ref={(ref)=>this.flatListRef=ref}
              data={this.props.messageData}
              renderItem={({item}) => (
                <View style={{marginBottom: 10, marginRight: 10}}>
                  {item.sendId == this.state.UId ? (
                    <View style={{flexDirection: 'row-reverse'}}>
                      <View
                        style={{backgroundColor: '#743294', borderRadius: 5}}>
                        <Text
                          style={{
                            paddingHorizontal: height * 0.015,
                            paddingVertical: height * 0.007,
                            backgroundColor: '#743294',
                            margin: 4,
                            elevation: 2,
                            color: '#FFFFFF',
                          }}>
                          {item.text}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            color: '#B3B6B7',
                            textAlign: 'right',
                            marginHorizontal: 2,
                          }}>
                          {((d = new Date(item.time)), d.toLocaleString())}{' '}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row', marginLeft: 10}}>
                      <View
                        style={{backgroundColor: '#2D7C69', borderRadius: 5}}>
                        <Text
                          style={{
                            paddingHorizontal: height * 0.015,
                            paddingVertical: height * 0.007,

                            margin: 4,
                            elevation: 2,
                            color: '#FFFFFF',
                          }}>
                          {item.text}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            color: '#B3B6B7',
                            textAlign: 'left',
                            marginHorizontal: 2,
                          }}>
                          {((d = new Date(item.time)), d.toLocaleString())}{' '}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 100,
          }}>
          <View
            style={{
              backgroundColor: '#EAEAEA',
              width: width * 0.8,
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <TextInput
            autoFocus={true}
              value={this.state.text}
              onChangeText={(text) => this.setState({text})}
              multiline={true}
              style={{
                width: width * 0.8,
                paddingBottom: 20,
                fontFamily: 'AvenirNext-DemiBold',
                fontSize: 17,
                color: '#633974',
              }}></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.state.text.trim() == '' ? null : this.sendMessageLocal();
            }}
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'AvenirNext-DemiBold',
                fontSize: 15,
                color: '#2471A3',
              }}>
              Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({chatResponse}) => {
  const loading = chatResponse.loading;
  const messageData = chatResponse.getMessage;
  console.log(messageData);
  return {messageData, loading};
};
export default connect(mapStateToProps, {
  sendMessage,
  getMessage,
})(MessageContent);
/*
<Text>HASAN</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.sendMessage(this.props.route.params.roomId, 'denme1')
          }>
          <Text>CANSUUUUUU</Text>
        </TouchableOpacity>*/
