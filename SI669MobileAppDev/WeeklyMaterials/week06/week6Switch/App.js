import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

/**
 * This file contains 4 versions of the app.
 * Uncomment the export default statement at the bottom
 * to run the version you want to see.
 */


class SwitchApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: true,
      switchStatus: 'on'
    }
  }

  handleValueChange = (value) => {
    let status = 'off';
    if (value) { status = 'on';}
    this.setState({
      switchValue: value,
      switchStatus: status
    });
  }

  render() {
    return (
      <View style={style.container}>
        <Text>The switch is {this.state.switchStatus}</Text>
        <Switch
          onValueChange={this.handleValueChange}
          value={this.state.switchValue}/>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black'
  }
});


class DarkModeApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
      switchStatus: 'Off',
      style: lightStyle,
    }
  }

  onValueChange = (value) => {
    let status = 'Off';
    let theStyle = lightStyle;
    if (value) { 
      status = 'On';
      theStyle = darkStyle;
    }

    this.setState((prevState) => {return {
      switchValue: value,
      switchStatus: status,
      style: theStyle
    }});
  }

  render() {
    return (
      <View style={this.state.style.container}>
        <Text style={this.state.style.text}>Dark Mode: {this.state.switchStatus}</Text>
        <Switch
          onValueChange={this.onValueChange}
          value={this.state.switchValue}/>
      </View>
    );
  }
}

const lightStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black'
  }
});

const darkStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
});

class DarkModeCondApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
    }
  }

  onValueChange = (value) => {
    this.setState({
      switchValue: value,
    });
  }

  render() {
    let modeText = "Off";
    if (this.state.switchValue) {
      modeText = "On";
    } 
    return (
      <View style={lightStyle.container}>
        <Text>
          Dark Mode: {modeText}        
        </Text>
        <Switch
          onValueChange={this.onValueChange}
          value={this.state.switchValue}/>
      </View>
    );
  }
}

class DarkModeCondApp2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
    }
  }

  onValueChange = (value) => {
    this.setState({
      switchValue: value,
    });
  }

  render() {
    return (
      <View style={[oneStyle.container, 
        this.state.switchValue ? 
          oneStyle.bgDark : 
          {}]}>
        <Text style={this.state.switchValue ?
          oneStyle.textDark :
          oneStyle.textLight}>
          Dark Mode: 
          {this.state.switchValue ?
            "On" :
            "Off"
          }
        </Text>
        <Switch
          onValueChange={this.onValueChange}
          value={this.state.switchValue}/>
      </View>
    );
  }
}

const oneStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
  },
  bgDark: {
    backgroundColor: 'black'
  },
  textLight: {
    color: 'black'
  },
  textDark: {
    color: 'white'
  }
});

//export default SwitchApp;
//export default DarkModeApp;
//export default DarkModeCondApp;
export default DarkModeCondApp2;
