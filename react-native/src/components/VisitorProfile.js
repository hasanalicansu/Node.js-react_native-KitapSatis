import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
//BookLover
import {GetVisitorSaleProduct, AddFavoriteProduct} from '../redux/actions';
import {connect} from 'react-redux';
import VisitorProfileProductComponent from './ChildComponents/VisitorProfileProductComponent';

class VisitorProfile extends Component {
  async componentDidMount() {
    await this.props.GetVisitorSaleProduct(this.props.route.params.data._id);
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'column', flex: 1}}>
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
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <View
              style={{
                flexDirection: 'column',
                width: width * 0.5,
                justifyContent: 'space-around',
              }}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: 'Avenir-Black',
                  fontSize: 30,
                  color: '#000000',
                }}>
                {this.props.route.params.data.name}{' '}
                {this.props.route.params.data.surname}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 15,
                  color: '#626262',
                  marginLeft: 2,
                  marginTop: 10,
                }}>
                {this.props.route.params.data.userUniversity}
              </Text>
            </View>
            <View
              style={{
                width: 115,
                height: 115,
                borderRadius: 20,
                backgroundColor: 'orange',
              }}>
              <View>
                <Image
                  style={{width: 115, height: 115, borderRadius: 20}}
                  source={{uri: this.props.route.params.data.avatar}}></Image>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'column', flex: 1, marginTop: 20}}>
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
                  Kitaplar
                </Text>
              </View>

              {this.props.dataSale === [] ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Image
                    style={{width: width * 0.7, height: width * 0.7}}
                    source={require('../assets/BookLover.png')}></Image>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#626262',
                      }}>
                      Satılan kitap bulunmamaktadır
                    </Text>
                  </View>
                </View>
              ) : (
                <FlatList
                  data={this.props.dataSale}
                  renderItem={({item}) => (
                    <View style={{alignItems: 'center'}}>
                      <VisitorProfileProductComponent data={item} navi={this.props} ></VisitorProfileProductComponent>
                    </View>
                  )}
                  keyExtractor={(item) => item._id}
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({visitorProfileResponse}) => {
  const dataSale = visitorProfileResponse;
 
  return {dataSale};
};
export default connect(mapStateToProps, {
  GetVisitorSaleProduct,
  AddFavoriteProduct,
})(VisitorProfile);
