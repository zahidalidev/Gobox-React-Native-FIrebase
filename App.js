import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { LogBox } from "react-native";

// screens
import LoginScreen from "./app/screens/auth/Index"
import HomeScreen from "./app/screens/HomeScreen"
import SplashScreen from "./app/screens/SplashScreen"
import AdminScreen from "./app/screens/AdminScreen"

LogBox.ignoreAllLogs()

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen" >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}