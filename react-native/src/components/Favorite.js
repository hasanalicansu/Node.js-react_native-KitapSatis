import React, {Component} from 'react';

import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
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

import {GetFavoriteProduct} from '../redux/actions';
import {connect} from 'react-redux';
import FavoriteComponents from './FavoriteComponents';

class Favorite extends Component {
  state={
    image:""
  }

  async componentDidMount() {
    await this.props.GetFavoriteProduct();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'column', marginTop: 5, flex: 1}}>
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
              Favoriler
            </Text>
          </View>
          {this.props.loading ? (
            <PacmanIndicator></PacmanIndicator>
          ) : (
            <View style={{
              flex: 1,
            }}>
              {!this.props.favoriteData ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Image
                    style={{width: width * 0.7, height: width * 0.7}}
                    source={require('../assets//BookLover.png')}></Image>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#626262',
                      }}>
                      Favorilere kitap eklemediniz
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{alignItems: 'center', flex: 1}}>
                  <FlatList
                    data={this.props.favoriteData}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ProductDetail', {
                            data: item,
                          })
                        }>
                          <FavoriteComponents data={item}></FavoriteComponents>
                        
                     
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({favoriteResponse}) => {
  const favoriteData = favoriteResponse.data;
  const loading = favoriteResponse.loading;
  
  return {favoriteData,loading};
};
export default connect(mapStateToProps, {
  GetFavoriteProduct
})(Favorite);
