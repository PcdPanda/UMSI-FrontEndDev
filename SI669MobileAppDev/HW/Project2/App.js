import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet} from 'react-native';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator();

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Details" component={DetailScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
