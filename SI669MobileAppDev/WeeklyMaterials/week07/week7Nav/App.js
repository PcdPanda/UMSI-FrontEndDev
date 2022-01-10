import * as React from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen1( {navigation} ) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        })}
      />
    </View>
  );
}

function HomeScreen2( {navigation} ) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details for 86"
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'Eighty-six',
        })}
      />
      <Button
        title="Go to Details for 99"
        onPress={() => navigation.navigate('Details', {
          itemId: 99,
          otherParam: 'Ninety-nine',
        })}
      />
    </View>
  );
}

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    console.log("HomeScreen did mount");
    this.timer = setInterval(()=>{
      this.setState({
        counter: this.state.counter + 1
      })
    }, 1000); 
  }


  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>{this.state.counter}</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'Eighty-six',
          })}
        />
      </View>
    );
  }
}

function DetailsScreen2( { route, navigation } ) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      switchValue: false
    };
  }

  componentDidMount() {
    console.log("DetailsScreen did mount");
    this.timer = setInterval(()=>{
      this.setState({
        switchValue: !this.state.switchValue
      })
    }, 1000); 
  }

  render() {

    const { navigation } = this.props;
    const { itemId, otherParam } = this.props.route.params;
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {itemId}</Text>
        <Text>otherParam: {otherParam}</Text>
        <Switch value={this.state.switchValue}/>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Overview' }}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;