import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);

export default class Department extends Component {
  render() {
    return (
      <View style={{flexDirection: 'column',marginTop:20}}>
        <View>
          <Text
            style={{
              fontFamily: 'Avenir-Black',
              fontSize: 23,
              color: '#000000',
            }}>
            {' '}
            Üniversitem
          </Text>
        </View>
        <TouchableOpacity>
          <View
            style={{
              width: width*0.9,
              backgroundColor: '#FACD5C',
              height: 70,
              borderRadius: 7,
              justifyContent: 'center',
              marginTop: 20,
              
            }}>
            <Text
            numberOfLines={1}
              style={{
                fontSize: 22,
                textAlign: 'center',
                fontFamily: 'Avenir-Heavy',
                color: '#6B4DAD',
                opacity: 1,
              }}>
              Sakarya Üniversitesi
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}



/*    <View style={{flexDirection: 'column'}}>
        <View>
          <Text
            style={{
              fontFamily: 'Avenir-Black',
              fontSize: 23,
              color: '#000000',
            }}>
            {' '}
            Bölümler
          </Text>
        </View>
        <TouchableOpacity>
          <View
            style={{
              width: 210,
              backgroundColor: '#FACD5C',
              height: 70,
              borderRadius: 7,
              justifyContent: 'center',
              marginTop: 20,
              marginLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                textAlign: 'center',
                fontFamily: 'Avenir-Heavy',
                color: '#6B4DAD',
                opacity: 1,
              }}>
              Bilgisayar Müh
            </Text>
          </View>
        </TouchableOpacity>
      </View>
   */