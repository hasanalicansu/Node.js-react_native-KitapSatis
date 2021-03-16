import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {GetOwnProductOnSale} from '../redux/actions';
import {connect} from 'react-redux';
import OnSaleComponents from './ChildComponents/OnSaleComponents';

class OnSale extends Component {
  componentDidMount() {
    this.props.GetOwnProductOnSale();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1,backgroundColor:"#FAFAFA"}}>
        <View style={{flexDirection: 'column', marginTop: 5, flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../assets/back.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 20,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Avenir-Black',
                fontSize: 23,
                color: '#373EEC',
                marginLeft: 10,
                opacity: 0.7,
              }}>
              {' '}
              Satışta
            </Text>
          </View>

          {this.props.onSaleData.length != 0 ? (
            <View style={{alignItems: 'center', flex: 1}}>
              <FlatList
                data={this.props.onSaleData}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('MineProductDetail', {
                        data: item,
                      })
                    }>
                    <OnSaleComponents data={item}></OnSaleComponents>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id}
              />
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Image
                style={{width: width * 0.7, height: width * 0.7}}
                source={require('../assets/MoneyJar_Isometric.png')}></Image>
              <View>
                <Text
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 20,
                    color: '#626262',
                  }}>
                  Satışta kitabınız bulunmamaktadır
                </Text>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({getMineProductResponse}) => {
  const onSaleData = getMineProductResponse;
  
  return {onSaleData};
};
export default connect(mapStateToProps, {GetOwnProductOnSale})(OnSale);
