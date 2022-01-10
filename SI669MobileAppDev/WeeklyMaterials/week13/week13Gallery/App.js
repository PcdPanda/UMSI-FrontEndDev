import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './LoginScreen';
import { MainScreen } from './MainScreen';
import { CameraScreen } from './CameraScreen';

import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage"]);
import {firebaseConfig} from "./Secrets";
const Stack = createNativeStackNavigator();

function App() {
  console.log(firebaseConfig);
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"   
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


