import React, {Component} from 'react';
import {Image, Button, TouchableOpacity, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


export default class OnboardingComponents extends Component {
  render() {
    return <Onboarding
    showDone={false}
    showSkip={false}
    nextLabel={"İleri"}
    pages={[
      {
        title: 'Hey!',
        subtitle: 'Hoşgeldin!',
        backgroundColor: '#7D30FA',
        image: (
          <Image
            style={{width: 250, height: 250}}
            source={require('../assets/BookLover_2.png')}
          />
        ),
      },
      {
        title: 'İhtiyacın olmayan kitabı sat',
        subtitle: 'Ders kitaplarını satarak arkadaşlarına yardımcı ol',
        backgroundColor: '#FACD5C',
        image: (
          <Image
            style={{width: 250, height: 250}}
            source={require('../assets/MoneyJar_Isometric.png')}
          />
        ),
      },
      {
        title: 'Üniversiteni seç',
        subtitle: 'Üniversitende ihtiyacın olacak kitapları kolay ve ucuza bul',
        backgroundColor: '#F8B53A',
        image: (
          <Image
            style={{width: 250, height: 250}}
            source={require('../assets/School_Monochromatic.png')}
          />
        ),
      },
      {
        title: 'ÜCRETSİZ KAYIT OL',
        subtitle: (
          <TouchableOpacity
            style={{height: 50, backgroundColor: 'orange',borderRadius:5,alignItems:"center",justifyContent:"center"}}
            
            
            onPress={() => {
              this.props.navigation.navigate("LoginPage")
            }}>
            <Text style={{color: '#003c8f',textAlign:"center",marginHorizontal:30,fontSize:17,fontWeight:"800"}}>Haydi başlayalım</Text>
          </TouchableOpacity>
        ),
        backgroundColor: '#2D4059',
        image: (
          <Image
            style={{width: 250, height: 250}}
            source={require('../assets/ProfileCreate.png')}
          />
        ),
      },
    ]}
  />;
  }
}
