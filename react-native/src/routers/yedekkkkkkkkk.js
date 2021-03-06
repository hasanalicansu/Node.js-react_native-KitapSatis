
const RooterComponent = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="TabBar">
          <Stack.Screen name="TabBar" component={TabBar} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="OnSale" component={OnSale} />
          <Stack.Screen name="Sold" component={Sold} />
          <Stack.Screen name="VisitorProfile" component={VisitorProfile} />
          <Stack.Screen name="MineProductDetail" component={MineProductDetail} />
          <Stack.Screen name="EditProduct" component={EditProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };







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
                source={require('../assets/user.png')}
                color={color}
                size={16}
              />
            ),
          }}
          name="UserProfile"
          component={UserProfile}
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
                source={require('../assets/logout.png')}
                color={color}
                size={16}
              />
            ),
          }}
          name="LoginPage"
          component={LoginPage}
        />
  
        <Tab.Screen
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
                source={require('../assets/logout.png')}
                color={color}
                size={16}
              />
            ),
          }}
          name="RegisterPage"
          component={RegisterPage}
        />
      </Tab.Navigator>
    );
  }
  