import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function App() {
  let [greeting, setGreeting] = useState("Hello");

  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function App2() {
  let [greeting, setGreeting] = useState("Hello");
  let [counter, setCounter] = useState(0);

  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <Text>You've pressed the button {counter} times!</Text>
      <Button
        title="More!"
        onPress={()=>{
          setCounter(counter + 1);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function App3() {
  let [greeting, setGreeting] = useState("Hello");
  let [counter, setCounter] = useState(0);

  useEffect(()=> {
    console.log("I'm using an effect!");
  });

  console.log("about to render");
  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <Text>You've pressed the button {counter} times!</Text>
      <Button
        title="More!"
        onPress={()=>{
          setCounter(counter + 1);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function App4() {
  let [greeting, setGreeting] = useState("Hello");
  let [counter, setCounter] = useState(0);

  useEffect(()=> {
    let intervalTimerID = setInterval(()=>{
      setCounter(counter => counter + 1);
    }, 1000);
    return (()=>{
      clearInterval(intervalTimerID);
    })

  }, []);

  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <Text>You've pressed the button {counter} times!</Text>
      <Button
        title="More!"
        onPress={()=>{
          setCounter(counter => counter + 1);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
//export default App2;
//export default App3;
//export default App4;
