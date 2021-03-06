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
      <SafeAreaView>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 28, fontFamily: 'AppleSDGothicNeo-Light'}}>
              Sirekt ismi
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Search');
            }}
            style={{
              width: width * 0.9,
              backgroundColor: '#E5E5E5',
              alignSelf: 'center',
              borderRadius: 13,
            }}>
            <View style={{margin: 10, flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, opacity: 6 / 10, marginLeft: 5}}
                source={require('../assets/loupe.png')}
              />
              <Text style={{fontSize: 18, color: '#777777', marginLeft: 5}}>
                Ara..
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView bounces={false}>
          <View style={{alignItems: 'center'}}>
            <Department navi={this.props}></Department>
          </View>

          <View style={{marginTop: 30, marginLeft: 25}}>
            <View>
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

          <View style={{marginTop: 50, marginLeft: 25}}>
            <View>
              <Text
                style={{
                  fontFamily: 'Avenir-Black',
                  fontSize: 23,
                  color: '#000000',
                }}>
                {' '}
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({getMainResponse}) => {
  const mainData = getMainResponse.data;
  return {mainData};
};
export default connect(mapStateToProps, {GetMainProduct})(Main);
