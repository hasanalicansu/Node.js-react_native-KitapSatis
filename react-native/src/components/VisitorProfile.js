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
            <View style={{flexDirection: 'column'}}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: 'Avenir-Black',
                  fontSize: 30,
                  maxWidth: 200,
                  color: '#000000',
                }}>
                {this.props.route.params.data.name}{" "} 
                {this.props.route.params.data.surname}
              </Text>

              <Text
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 17,
                  color: '#626262',
                  marginLeft: 2,
                  marginTop: 10,
                }}>
                Sakarya Üniversitesi
                
              </Text>
            </View>
            <View>
              <Image
                style={{width: 115, height: 115, borderRadius: 20}}
                source={require('../assets/adam.jpg')}></Image>
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
                    source={require('../assets//BookLover.png')}></Image>
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
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push('ProductDetail', {
                            data: item,
                          })
                        }>
                        <View
                          style={{
                            width: 300,
                            backgroundColor: '#FACD5C',
                            height: 150,
                            borderRadius: 7,
                            justifyContent: 'center',
                            marginTop: 20,
                            marginLeft: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              
                              alignItems:"center"
                            }}>
                            <View style={{marginLeft: 17}}>
                              <Image
                                style={{
                                  width: 60,
                                  height: 100,
                                  marginLeft: 5,
                                }}
                                source={require('../assets/dan_brown.jpg')}
                              />
                            </View>
                            <View
                              style={{
                                marginLeft: 15,
                                flexDirection: 'column',
                                
                                width: 200,
                              }}>
                              <View>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    fontFamily: 'AvenirNext-DemiBold',
                                    fontSize: 18,

                                    width: 150,
                                  }}>
                                  {item.productTitle}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View style={{width:143}}>
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      fontFamily: 'Avenir-Medium',
                                      fontSize: 16,
                                      color: '#626262',
                                    }}>
                                    {item.university}
                                  </Text>

                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      fontFamily: 'Avenir-Medium',
                                      fontSize: 16,
                                      color: '#626262',
                                    }}>
                                    {item.category}
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'AvenirNext-DemiBold',
                                      fontSize: 16,
                                      color: '#000000',
                                    }}>
                                    {item.productPrice} TL
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.props.AddFavoriteProduct(item._id);
                                  }}
                                  style={{
                                    justifyContent: 'center',
                                    marginTop: 30,
                                    marginRight:10
                                  }}>
                                  <Image
                                    style={{
                                      width: 35,
                                      height: 35,
                                      tintColor: '#FF4D4D',
                                    }}
                                    source={require('../assets/like.png')}
                                  />
                                </TouchableOpacity>
                              </View>
                              <View></View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
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
  console.log(dataSale, 'dataaa');
  return {dataSale};
};
export default connect(mapStateToProps, {
  GetVisitorSaleProduct,
  AddFavoriteProduct,
})(VisitorProfile);