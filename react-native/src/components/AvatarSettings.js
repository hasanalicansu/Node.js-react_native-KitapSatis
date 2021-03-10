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
import ImagePicker from 'react-native-image-crop-picker';

import {NewProfilePhoto} from '../redux/actions';
import {connect} from 'react-redux';

class AvatarSettings extends Component {
  state = {
    ProfilePhoto: '',
  };
  async componentDidMount() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      this.setState({ProfilePhoto: image});
     
      this.props.NewProfilePhoto(image);
    });
  }
  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#5A1BEE',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        {this.props.loading ? (
          <PacmanIndicator></PacmanIndicator>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.pop();
              }}
              style={{
                width: 200,
                height: 50,
                backgroundColor: '#FACD5C',
                
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}>
              <Text
                style={{
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: 22,
                  color: '#000',
                  textAlign: 'center',
                }}>
                Geri dön
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({avatarResponse}) => {
  const loading = avatarResponse.loading;
 
  return {loading};
};

export default connect(mapStateToProps, {NewProfilePhoto})(AvatarSettings);
