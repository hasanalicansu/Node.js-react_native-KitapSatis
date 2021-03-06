import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RooterNavigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import Main from '../components/Main';
import Search from '../components/Search';
import {Icon, Image} from 'react-native';
import ProductDetail from '../components/ProductDetail';
import UserProfile from '../components/UserProfile';
import OnSale from '../components/OnSale';
import Sold from '../components/Sold';
import Favorite from '../components/Favorite';
import AddProduct from '../components/AddProduct';
import VisitorProfile from '../components/VisitorProfile';
import MineProductDetail from '../components/MineProductDetail';
import EditProduct from '../components/EditProduct';
import LoginPage from '../components/Login/LoginPage';
import RegisterPage from '../components/Login/RegisterPage';
import MessageRoom from '../components/MessageRoom';
import MessageContent from '../components/MessageContent';
import PeoductCreater from '../components/PeoductCreater';
import Settings from '../components/Settings';
import AvatarSettings from '../components/AvatarSettings';
import OnboardingComponents from '../components/OnboardingComponents';
function TabBar() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#5A1BEE',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Image
              style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
              source={require('../assets/home.png')}
              color={color}
              size={16}
            />
          ),
        }}
        name="Main"
        component={Main}
      />
      
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Image
              style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
              source={require('../assets/like.png')}
              color={color}
              size={16}
            />
          ),
        }}
        name="Favorite"
        component={Favorite}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Image
              style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
              source={require('../assets/add.png')}
              color={color}
              size={16}
            />
          ),
        }}
        name="AddProduct"
        component={AddProduct}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Image
              style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
              source={require('../assets/chat.png')}
              color={color}
              size={16}
            />
          ),
        }}
        name="MessageRoom"
        component={MessageRoom}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Image
              style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
              source={require('../assets/user.png')}
              color={color}
              size={16}
            />
          ),
        }}
        name="UserProfile"
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}

const RooterComponent = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="LoginPage">
       <Stack.Screen name="OnboardingComponents" component={OnboardingComponents} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="LoggedIn" component={LoggedIn} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};



function LoggedIn() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }} initialRouteName="TabBar">
        <Stack.Screen name="TabBar" component={TabBar} />
        
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AvatarSettings" component={AvatarSettings} />
        <Stack.Screen name="PeoductCreater" component={PeoductCreater} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="OnSale" component={OnSale} />
        <Stack.Screen name="Sold" component={Sold} />
        <Stack.Screen name="VisitorProfile" component={VisitorProfile} />
        <Stack.Screen name="MineProductDetail" component={MineProductDetail} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="MessageContent" component={MessageContent} />
    </Stack.Navigator>
  );
}
export default RooterComponent;
