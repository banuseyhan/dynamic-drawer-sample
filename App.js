import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/home-screen";
import LoginScreen from "./src/screens/login-screen";
import CustomDrawer from "./src/screens/components/customDrawer";
import { fireStore } from "./firebase-config";
import ProductScreen from "./src/screens/product-screen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    
  }

  drawerInitialize = () => {
    return (
      <Drawer.Navigator
       
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Product" component={ProductScreen} />
      </Drawer.Navigator>
    );
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" children={this.drawerInitialize} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
