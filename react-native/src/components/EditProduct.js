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
import {UpdateProduct, DownloadFirstPhoto} from '../redux/actions';
import {connect} from 'react-redux';
import {PacmanIndicator} from 'react-native-indicators';
import localData from '../localJson/universityData.json';
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);

class EditProduct extends Component {
  state = {
    university: this.props.route.params.data.university,
    universityId: this.props.route.params.data.universityId,

    photo: '',
    photo2: '',
    photo3: '',

    illustration: 1,
    title: this.props.route.params.data.productTitle,
    detail: this.props.route.params.data.productDetail,
    author: this.props.route.params.data.author,
    price: this.props.route.params.data.productPrice,
    name: 'name',

    photoArray: [],
  };
  async componentDidMount() {
    this.props.DownloadFirstPhoto(
      this.props.route.params.data._id,
      this.props.route.params.data.productPhoto,
    );
  }

  update() {
    this.props.UpdateProduct(
      this.props.route.params.data._id,
      this.state.title,
      this.state.name,
      this.state.author,
      this.state.detail,
      Number(this.state.price),
      this.state.university,
      this.state.universityId,
      true,
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
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
            Düzenle
          </Text>
        </View>

        <ScrollView>
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
                  placeholder="Başlık"
                  onChangeText={(title) => {
                    this.setState({title});
                  }}
                  value={this.state.title}
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
                  multiline
                  placeholder="Detay"
                  onChangeText={(detail) => {
                    this.setState({detail});
                  }}
                  value={this.state.detail}
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
                    this.setState(author);
                  }}
                  value={this.state.author}
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
                  onChangeText={(price) => {
                    this.setState({price});
                  }}
                  value={this.state.price.toString()}
                  keyboardType="numeric"
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
                              this.setState({
                                university: x.name,
                                universityId: x.uid,
                              });
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
              <View
                style={{
                  marginTop: 20,
                }}>
                <PacmanIndicator></PacmanIndicator>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.update();
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
                  Düzenle ve yayınla
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({productUpdateResponse, getImageResponse}) => {
  const loading = productUpdateResponse.loading;
  const images = getImageResponse.data;
  const loadingImage = getImageResponse.loading;
  
  return {loading, images, loadingImage};
};
export default connect(mapStateToProps, {UpdateProduct, DownloadFirstPhoto})(
  EditProduct,
);
