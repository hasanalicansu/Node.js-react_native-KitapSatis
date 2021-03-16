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
import AsyncStorage from '@react-native-community/async-storage';
import {SearchProduct} from '../../redux/actions';
import {connect} from 'react-redux';
class Department extends Component {
  state = {
    universite: '',
    universiteId: 0,
  };
  async componentDidMount() {
    const userUni = await AsyncStorage.getItem('uniKitapHAC');
    const userUniId = await AsyncStorage.getItem('uniIdKitapHAC');
   
    this.setState({universite: userUni, universiteId: userUniId});
  }
  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <TouchableOpacity
          onPress={() => {
            this.props.SearchProduct('', this.state.universiteId, 0);
            this.props.navi.navigation.navigate('Search');
          }}>
          <View
            style={{
              width: width * 0.7,
              
              height: 50,
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'Avenir-Black',
                color: '#FACD5C', 
                marginHorizontal: 20,
                shadowColor: '#F3DCFC',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                elevation: 15,
                
              }}>
              {this.state.universite}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, {
  SearchProduct,
})(Department);
