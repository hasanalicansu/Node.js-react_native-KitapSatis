import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import ContentCreationillustration from './ContentCreationillustration';
import {CreateNewProduct} from '../redux/actions';
import {connect} from 'react-redux';
import {PacmanIndicator} from 'react-native-indicators';
import localData from '../localJson/universityData.json';
(width = Dimensions.get('window').width),
(height = Dimensions.get('window').height);

class PeoductCreater extends Component {
  state = {
    university: 'SAKARYA ÜNİVERSİTESİ',
    universityId: 176,
    illustration: 0,
    title: '',
    detail: '',
    author: '',
    price: 0,
    photoArray: [],

  };

  async create() {
    this.props.CreateNewProduct(
      this.state.title,
      this.state.author,
      this.state.detail,
      Number(this.state.price),
      this.state.university,
      this.state.universityId,
      this.state.photoArray,
    );
  }
  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.pop();
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
        </SafeAreaView>
        <SafeAreaView style={{marginBottom: 30, marginTop: 20}}>
          <View style={{marginLeft: 40, marginBottom: 15}}>
            <Text
              style={{
                fontFamily: 'AvenirNext-DemiBold',
                fontSize: 20,
                color: '#D13841',
              }}>
              Fotoğraf
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then((image) => {
                  this.state.photoArray[0] = image;
                  this.setState({photoArray: this.state.photoArray});
                  console.log(this.state.photoArray, 'push');
                });
              }}>
              <View
                style={{
                  width: 90,
                  height: 120,
                  backgroundColor: '#E5E5E5',
                  justifyContent: 'center',
                  borderRadius: 13,
                }}>
                {!this.state.photoArray[0] ? (
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'AvenirNext-DemiBold',
                      color: '#777777',
                    }}>
                    Fotoğraf ekle
                  </Text>
                ) : (
                  <Image
                    style={{width: 90, height: 120, borderRadius: 13}}
                    source={{uri: this.state.photoArray[0].path}}></Image>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then((image) => {
                  console.log(image, 'burası');
                  this.state.photoArray[1] = image;
                  this.setState({photoArray: this.state.photoArray});
                  console.log(this.state.photoArray, 'push');
                  //this.setState({photo2: image});
                });
              }}>
              <View
                style={{
                  width: 90,
                  height: 120,
                  backgroundColor: '#E5E5E5',
                  justifyContent: 'center',
                  borderRadius: 13,
                }}>
                {!this.state.photoArray[1] ? (
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'AvenirNext-DemiBold',
                      color: '#777777',
                    }}>
                    Fotoğraf ekle
                  </Text>
                ) : (
                  <Image
                    style={{width: 90, height: 120, borderRadius: 13}}
                    source={{uri: this.state.photoArray[1].path}}></Image>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then((image) => {
                  console.log(image, 'burası');
                  this.state.photoArray[2] = image;
                  this.setState({photoArray: this.state.photoArray});
                  console.log(this.state.photoArray, 'push');
                  //this.setState({photo3: image});
                });
              }}>
              <View
                style={{
                  width: 90,
                  height: 120,
                  backgroundColor: '#E5E5E5',
                  justifyContent: 'center',
                  borderRadius: 13,
                }}>
                {!this.state.photoArray[2] ? (
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'AvenirNext-DemiBold',
                      color: '#777777',
                    }}>
                    Fotoğraf ekle
                  </Text>
                ) : (
                  <Image
                    style={{width: 90, height: 120, borderRadius: 13}}
                    source={{uri: this.state.photoArray[2].path}}></Image>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <View>
            <View style={{marginBottom: 5, marginLeft: 5}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 18,
                  color: '#D13841',
                }}>
                Kitap ismi
              </Text>
            </View>
            <View>
              <TextInput
                maxLength={70}
                onChangeText={(title) => {
                  this.setState({title});
                }}
                placeholder="Başlık"
                style={{
                  width: width * 0.8,
                  height: 60,
                  backgroundColor: '#E5E5E5',
                  borderRadius: 7,
                  fontSize: 20,
                  paddingLeft: 10,
                  color: '#000',
                  fontFamily: 'Avenir-Medium',
                }}></TextInput>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{marginBottom: 5, marginLeft: 5}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 18,
                  color: '#D13841',
                }}>
                Detay
              </Text>
            </View>
            <View>
              <TextInput
                maxLength={300}
                onChangeText={(detail) => {
                  this.setState({detail});
                }}
                multiline
                placeholder="Detay"
                style={{
                  width: width * 0.8,
                  height: 300,
                  backgroundColor: '#E5E5E5',
                  borderRadius: 7,
                  fontSize: 20,
                  paddingLeft: 10,
                  color: '#000',
                  fontFamily: 'Avenir-Medium',
                }}></TextInput>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{marginBottom: 5, marginLeft: 5}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 18,
                  color: '#D13841',
                }}>
                Yazar
              </Text>
            </View>
            <View>
              <TextInput
                onChangeText={(author) => {
                  this.setState({author});
                }}
                maxLength={70}
                placeholder="Yazar"
                style={{
                  width: width * 0.8,
                  height: 60,
                  backgroundColor: '#E5E5E5',
                  borderRadius: 7,
                  fontSize: 20,
                  paddingLeft: 10,
                  color: '#000',
                  fontFamily: 'Avenir-Medium',
                }}></TextInput>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{marginBottom: 5, marginLeft: 5}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 18,
                  color: '#D13841',
                }}>
                Fiyat
              </Text>
            </View>
            <View>
              <TextInput
                keyboardType="numeric"
                onChangeText={(price) => {
                  this.setState({price});
                }}
                placeholder="Fiyat TL"
                style={{
                  width: width * 0.8,
                  height: 60,
                  backgroundColor: '#E5E5E5',
                  borderRadius: 7,
                  fontSize: 20,
                  paddingLeft: 10,
                  color: '#000',
                  fontFamily: 'Avenir-Medium',
                }}></TextInput>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{marginBottom: 5, marginLeft: 5}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 18,
                  color: '#D13841',
                }}>
                Üniversite
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.RBSheetUniversity.open();
              }}
              style={{
                width: width * 0.8,
                height: 60,
                backgroundColor: '#E5E5E5',
                borderRadius: 7,
                paddingLeft: 10,
                color: '#000',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  backgroundColor: '#E5E5E5',
                  fontSize: 20,
                  color: '#000',
                  fontFamily: 'Avenir-Medium',
                }}>
                {this.state.university}
              </Text>
            </TouchableOpacity>
          </View>

          <RBSheet
            ref={(ref) => {
              this.RBSheetUniversity = ref;
            }}
            height={height*0.85}
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
                            this.setState({university: x.name,universityId:x.uid});
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

          {this.props.loading == true ? (
            <PacmanIndicator></PacmanIndicator>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.create();
              }}
              style={{
                backgroundColor: '#FACD5C',
                paddingHorizontal: 30,
                paddingVertical: 20,
                borderRadius: 7,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 20,
                  color: '#373EEC',
                }}>
                YAYINLA
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({productUpdateResponse}) => {
  const loading = productUpdateResponse.loading;
  return {loading};
};
export default connect(mapStateToProps, {CreateNewProduct})(PeoductCreater);
