import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class MainApp extends React.Component {

  constructor() {
    super();

    this.helloPhrases = [
      'Hello World!',
      'Hola Mundo!',
      'Hallo Welt!',
      '你好，世界!',
      '안녕 지구촌!', 
      'नमस्ते विश्व!'
    ];
    this.state = {
      index: 0
    }
    this.interval = setInterval(()=>{this.setState({index: this.state.index + 1});}, 1000);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view1}>
          <View style={styles.box1}>
            <Text style={styles.label1}>{this.helloPhrases[this.state.index % this.helloPhrases.length]}</Text>
          </View>
        </View>
        <View style={styles.view2}>
          <View style={styles.box2}>
            <Text style={styles.label2}>{this.helloPhrases[4]}</Text>
          </View>
          <View style={styles.box3}>
            <Text style={styles.label3}>{this.helloPhrases[3]}</Text>
          </View>
        </View>
        <View style={styles.view3}>
          <View style={styles.box4}>
            <Text style={styles.label4}>{this.helloPhrases[5]}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.label5}>{this.helloPhrases[1]}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  view1: {
    flex: 0.3,
    backgroundColor: 'grey',
    width: '90%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  box1: {
    flex: 0.7,
    width: "80%",
    backgroundColor: "black",
    justifyContent: "center"
  },
  box2: {
    flex: 0.4,
    height: "60%",
    backgroundColor: "white",
    justifyContent: "center"
  },
  box3: {
    flex: 0.4,
    height: "60%",
    backgroundColor: "green",
    justifyContent: "center"
  },
  box4: {
    flex: 0.4,
    height: "40%",
    backgroundColor: "purple",
    justifyContent: "center"
  },
  box5: {
    flex: 0.4,
    height: "40%",
    backgroundColor: "yellow",
    justifyContent: "center"
  },
  label1 : {
    fontSize: 44,
    color: 'pink',
    alignSelf: "center",
  }, 
  view2: {
    flex: 0.2,
    backgroundColor: 'gray',
    width: '90%',
    height: "90%",
    alignItems: 'center', 
    justifyContent: 'space-around',
    flexDirection: "row"
  },
  view3: {
    flex: 0.1,
    width: '90%',
    backgroundColor: 'gray',
    alignItems: 'center', 
    justifyContent: 'space-around',
    flexDirection: "row"
  },
  label2 : {
    fontSize: 20,
    color: 'green',
    alignSelf: "center"
  }, 
  label3 : {
    fontSize: 20,
    color: 'white',
    alignSelf: "center"
  }, 
  label4 : {
    fontSize: 14,
    color: 'yellow',
    alignSelf: "center"
  }, 
  label5 : {
    fontSize: 14,
    color: 'purple',
    alignSelf: "center"
  }
});

export default MainApp;
