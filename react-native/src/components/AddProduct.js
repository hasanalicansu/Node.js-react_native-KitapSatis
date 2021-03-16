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

(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);

export default class AddProduct extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#5A1BEE',
            flexDirection: 'column',
          }}>
          <Image
            style={{width: width * 0.7, height: width * 0.7}}
            source={require('../assets/ContentCreation.png')}></Image>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PeoductCreater');
            }}
            style={{
              backgroundColor: '#8383EA',
              paddingHorizontal: 50,
              paddingVertical: 20,
              borderRadius: 7,
            }}>
            <Text
              style={{
                fontFamily: 'AvenirNext-DemiBold',
                fontSize: 20,
                color: '#F7F3FF',
              }}>
              KİTABINI SAT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
