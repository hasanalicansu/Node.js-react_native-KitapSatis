import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  autoFocus,
  FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchBar from './SearchPage/SearchBar';
import SearchComponents from './ChildComponents/SearchComponents';
import localData from '../localJson/universityData.json';
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
import {SearchProduct} from '../redux/actions';
import {connect} from 'react-redux';

class Search extends Component {
  state = {title: '', universite: '', sıralama: 0, universiteId: 0};

  search() {
    this.props.SearchProduct(
      this.state.title,
      this.state.universiteId,
      this.state.sıralama,
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  source={require('../assets/back.png')}
                  style={{width: 20, height: 20, marginTop: 9, marginLeft: 8}}
                />
              </TouchableOpacity>

              <TextInput
                onChangeText={(title) => {
                  this.setState({title});
                }}
                autoFocus={true}
                placeholder="Ara"
                style={{
                  width: width * 0.6,
                  backgroundColor: '#E5E5E5',
                  alignSelf: 'center',
                  borderRadius: 13,
                  height: 40,
                  paddingLeft: 15,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.search();
                }}
                style={{
                  justifyContent: 'center',
                  width: 70,
                  height: 40,
                  backgroundColor: '#2411FF',
                  opacity: 0.62,
                  alignItems: 'center',
                  borderRadius: 7,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontFamily: 'AvenirNext-DemiBold',
                  }}>
                  ARA
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.RBSheetUniversity.open();
                }}
                style={{
                  width: 105,
                  height: 30,
                  backgroundColor: '#5200FF',
                  opacity: 0.62,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                }}>
                <Text
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 17,
                    color: '#FFFFFF',
                  }}>
                  Üniversite
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.RBSheetSort.open();
                }}
                style={{
                  width: 110,
                  height: 30,
                  backgroundColor: '#5200FF',
                  opacity: 0.62,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                }}>
                <Text
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 17,
                    color: '#FFFFFF',
                  }}>
                  Sırala
                </Text>
              </TouchableOpacity>
            </View>

            <RBSheet
              ref={(ref) => {
                this.RBSheetUniversity = ref;
              }}
              height={height * 0.85}
              openDuration={300}
              animationType={'fade'}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                container: {
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                },
              }}>
              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() => {
                    this.setState({universiteId: 0});
                    this.RBSheetUniversity.close();
                  }}>
                  <Text
                    style={{
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 30,
                      color: '#C70039',
                    }}>
                    Sıfırla
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={localData}
                  renderItem={({item}) => (
                    <View style={{marginLeft: 20, marginBottom: 20}}>
                      <Text
                        style={{
                          fontFamily: 'AvenirNext-DemiBold',
                          fontSize: 20,
                          color: '#C70039',
                        }}>
                        {item.id}-{item.province}
                      </Text>

                      {item.universities.map((x) => {
                        return (
                          <TouchableOpacity
                            style={{marginTop: 7}}
                            onPress={() => {
                              this.setState({universiteId: x.uid});
                              this.RBSheetUniversity.close();
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontFamily: 'AvenirNext-DemiBold',
                                fontSize: 20,
                                color: '#656565',
                              }}>
                              {x.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </RBSheet>

            <RBSheet
              ref={(ref) => {
                this.RBSheetSort = ref;
              }}
              height={400}
              openDuration={300}
              animationType={'fade'}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                container: {
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                },
              }}>
              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({sıralama: -1});
                    this.RBSheetSort.close();
                  }}
                  style={{marginLeft: 20, marginBottom: 10}}>
                  {this.state.sıralama == -1 ? (
                    <Text
                      style={{
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: 'red',
                      }}>
                      Fiyata göre azalan
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#656565',
                      }}>
                      Fiyata göre azalan
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({sıralama: 1});
                    this.RBSheetSort.close();
                  }}
                  style={{marginLeft: 20, marginBottom: 10}}>
                  {this.state.sıralama == 1 ? (
                    <Text
                      style={{
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: 'red',
                      }}>
                      Fiyata göre artan
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#656565',
                      }}>
                      Fiyata göre artan
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({sıralama: 0});
                    this.RBSheetSort.close();
                  }}
                  style={{marginLeft: 20, marginBottom: 10}}>
                  <Text
                    style={{
                      fontFamily: 'AvenirNext-DemiBold',
                      fontSize: 20,
                      color: '#656565',
                    }}>
                    Sıfırla
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </View>
        </View>

        {this.props.loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <PacmanIndicator></PacmanIndicator>
          </View>
        ) : (
          <View style={{marginTop: 30, flex: 1}}>

            

            {this.props.searchData == 0 ? (
              <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Image
                style={{width: width * 0.8, height: width * 0.8}}
                source={require('../assets/search_null.png')}></Image>
              <View style={{marginHorizontal:width*0.1}}>
                <Text
                  style={{
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 20,
                    color: '#626262',
                    textAlign:"center"
                  }}>
                  Aradağınızı bulamadım. Yazarın ismini veya kitabın ismini yazarak tekrar deneyebilirsin
                </Text>
              </View>
            </View>
            ) : (
              <FlatList
                columnWrapperStyle={{
                  justifyContent: 'space-around',
                  marginBottom: 30,
                }}
                data={this.props.searchData}
                renderItem={({item}) => (
                  <SearchComponents
                    navi={this.props}
                    data={item}></SearchComponents>
                )}
                keyExtractor={(item) => item._id}
                numColumns={2}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({searchResponse}) => {
  const searchData = searchResponse.data;
  const loading = searchResponse.loading;
  console.log(searchData,"ss", loading);
  return {searchData, loading};
};
export default connect(mapStateToProps, {
  SearchProduct,
})(Search);

/*<SearchComponents
                  navi={this.props}
                  data={item}></SearchComponents> */
