import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
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
import Department from './ChildComponents/Department';
import LastAdd from './ChildComponents/LastAdd';

import {GetMainProduct} from '../redux/actions';
import {connect} from 'react-redux';
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

class Main extends Component {
  componentDidMount() {
    this.props.GetMainProduct();
  }
  render() {
    return (
      <View style={{backgroundColor: '#FAFAFA', flex: 1}}>
        <View>
          <ImageBackground
            source={require('../assets/modern.jpg')}
            style={{width: width, height: (width * 2) / 3}}>
            <SafeAreaView style={{flex: 1}}>
              <View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontFamily: 'AppleSDGothicNeo-Light',
                      color:"#FFF"
                    }}>
                    Sirekt ismi
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Search');
                }}
                style={{
                  width: width * 0.9,
                  backgroundColor: '#E5E5E5',
                  alignSelf: 'center',
                  borderRadius: 13,
                  marginTop: 10,
                  opacity: 0.7,
                }}>
                <View style={{margin: 10, flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      opacity: 8 / 10,
                      marginLeft: 5,
                    }}
                    source={require('../assets/loupe.png')}
                  />
                  <Text style={{fontSize: 18, color: '#777777', marginLeft: 5}}>
                    Ara..
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View
                  style={{
                    alignItems: 'center',
                    alignContent: 'flex-end',
                    marginBottom: width * 0.1,
                    opacity: 0.9,
                  }}>
                  <Department navi={this.props}></Department>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>

        <ScrollView
          bounces={false}
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex: 1,
            backgroundColor: '#FFF',
            marginTop: -20,
            
          }}>
          <View style={{backgroundColor: '#FFF'}}>
            <View style={{marginLeft: 15, marginTop: 20}}>
              <Text
                style={{
                  fontFamily: 'Avenir-Black',
                  fontSize: 23,
                  color: '#000000',
                }}>
                Son Eklenenler
              </Text>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={this.props.mainData.resNew}
              renderItem={({item}) => (
                <LastAdd navi={this.props} data={item}></LastAdd>
              )}
              keyExtractor={(item) => item._id}
            />
          </View>

          <View style={{marginTop: 40, backgroundColor: '#FFF',marginBottom:30}}>
            <View style={{marginLeft: 15}}>
              <Text
                style={{
                  fontFamily: 'Avenir-Black',
                  fontSize: 23,
                  color: '#000000',
                }}>
                Çok ziyaret edilenler
              </Text>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={this.props.mainData.resMost}
              renderItem={({item}) => (
                <LastAdd navi={this.props} data={item}></LastAdd>
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({getMainResponse}) => {
  const mainData = getMainResponse.data;
  return {mainData};
};
export default connect(mapStateToProps, {GetMainProduct})(Main);

/*
 <View style={{alignItems: 'center'}}>
            <Department navi={this.props}></Department>
          </View>
 */
