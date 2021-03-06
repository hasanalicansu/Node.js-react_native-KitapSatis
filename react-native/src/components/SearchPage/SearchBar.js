import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  autoFocus,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class SearchBar extends Component {
  state = {university: ''};
  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => {
              this.props.route.goBack();
            }}>
            <Image
              source={require('../../assets/back.png')}
              style={{width: 20, height: 20, marginTop: 9, marginLeft: 8}}
            />
          </TouchableOpacity>

          <TextInput
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
              this.RBSheetCategory.open();
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
              Bölüm
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
                this.RBSheetUniversity.close();
              }}
              style={{marginLeft: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 20,
                  color: '#656565',
                }}>
                Sakarya Üniversitesi
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>

        <RBSheet
          ref={(ref) => {
            this.RBSheetCategory = ref;
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
                this.RBSheetCategory.close();
              }}
              style={{marginLeft: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 20,
                  color: '#656565',
                }}>
                Bilgisayar Mühendisliği
              </Text>
            </TouchableOpacity>
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
                this.RBSheetSort.close();
              }}
              style={{marginLeft: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 20,
                  color: '#656565',
                }}>
                Fiyata göre artan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.RBSheetSort.close();
              }}
              style={{marginLeft: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 20,
                  color: '#656565',
                }}>
                Fiyata göre azalan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.RBSheetSort.close();
              }}
              style={{marginLeft: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 20,
                  color: '#656565',
                }}>
                En son eklenenler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.RBSheetSort.close();
              }}
              style={{marginLeft: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 20,
                  color: '#656565',
                }}>
                En eskiler
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  }
}
