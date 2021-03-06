
import React, { Component } from 'react'
import { View,SafeAreaView,Text, ImageBackground,Dimensions,Image} from 'react-native'
(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);

export default class ContentCreationillustration extends Component {
    render() {
        return (
            <View style={{alignItems:"center",justifyContent:"center",flex:1,backgroundColor:"#5A1BEE"}}>
                <Image style={{width:width*0.7,height:width*0.7}} source={require("../assets/ContentCreation.png")}></Image>
            </View>
        )
    }
}
