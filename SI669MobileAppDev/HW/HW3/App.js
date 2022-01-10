import React from 'react';
import { StyleSheet, Text, View,
      TextInput, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * @param {string} text The string to reverse
 * @returns {string} The string, reversed
 */
function reverseText(text) {
  return text.split('').reverse().join('');
}

function onlyNumberLetter(text){
  return text.search("[^0-9|a-z|A-Z]") < 0;
}

function UpperLowerNumber(text){
  return (text.search("[a-z]") >= 0) && (text.search("\\d") >= 0) && (text.search("[A-Z]") >= 0); 
}

export default class classApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentInput: '',
      resultText: '',
      reverseText: false,
      reverseColors: false,
      resultStyle: styles.resultTextLight,
      enterPassword: '',
      reEnterPassword: '',
      match: {
        icon: "md-checkmark-circle",
        color: "green",
        textStyle: styles.textGreen,
      },
      passRequire1: {
        icon: "md-checkmark-circle",
        color: "green",
        textStyle: styles.textGreen,
      },
      passRequire2: {
        icon: "md-close-circle",
        color: "red",
        textStyle: styles.textRed,
      },
    }
  }
  
  handleChangeText = (text) => {
    this.setState({
      currentInput: text,
      resultText: this.state.reverseText ? reverseText(text) : text,
      reverseText: this.state.reverseText,
      reverseColors: this.state.reverseColors,
      resultStyle: this.state.resultStyle,
      enterPassword: this.state.enterPassword,
      reEnterPassword: this.state.reEnterPassword,
      match: this.state.match,
      passRequire1: this.state.passRequire1,
      passRequire2: this.state.passRequire2
    });
  }
  
  handleReverseText = (value) => {
    this.setState({
      currentInput: this.state.currentInput,
      resultText: value ? reverseText(this.state.currentInput) : this.state.currentInput,
      reverseText: value,
      reverseColors: this.state.reverseColors,
      resultStyle: this.state.resultStyle,
      enterPassword: this.state.enterPassword,
      reEnterPassword: this.state.reEnterPassword,
      match: this.state.match,
      passRequire1: this.state.passRequire1,
      passRequire2: this.state.passRequire2
    });
  }

  handleReverseColors = (value) => {
    this.setState({
      currentInput: this.state.currentInput,
      resultText: this.state.resultText,
      reverseText: this.state.reverseText,
      reverseColors: value,
      resultStyle: value ? styles.resultTextDark : styles.resultTextLight,
      enterPassword: this.state.enterPassword,
      reEnterPassword: this.state.reEnterPassword,
      match: this.state.match,
      passRequire1: this.state.passRequire1,
      passRequire2: this.state.passRequire2
    });
  }

  handleEnterPassword = (value) => {
    let match = {
      icon: "md-checkmark-circle",
      color: "green",
      textStyle: styles.textGreen,
    };
    let mismatch ={
      icon: "md-close-circle",
      color: "red",
      textStyle: styles.textRed,
    };
    let passRequire1 = JSON.parse(JSON.stringify(mismatch));
    let passRequire2 = JSON.parse(JSON.stringify(mismatch));
    if(onlyNumberLetter(value))passRequire1 = JSON.parse(JSON.stringify(match));
    if(UpperLowerNumber(value))passRequire2 = JSON.parse(JSON.stringify(match));
    if(value!=this.state.reEnterPassword)match = JSON.parse(JSON.stringify(mismatch));
    this.setState({
      currentInput: this.state.currentInput,
      resultText: this.state.resultText,
      reverseText: this.state.reverseText,
      reverseColors: this.state.reverseColors,
      resultStyle: this.state.resultStyle,
      enterPassword: value,
      reEnterPassword: this.state.reEnterPassword,
      match: match,
      passRequire1: passRequire1,
      passRequire2: passRequire2,
    });
  }

  handleReEnterPassword = (value) => {
    let match = {
      icon: "md-checkmark-circle",
      color: "green",
      textStyle: styles.textGreen,
    };
    if(value!=this.state.enterPassword){
      match = {
        icon: "md-close-circle",
        color: "red",
        textStyle: styles.textRed,
      };
    }
    this.setState({
      currentInput: this.state.currentInput,
      resultText: this.state.resultText,
      reverseText: this.state.reverseText,
      reverseColors: this.state.reverseColors,
      resultStyle: this.state.resultStyle,
      enterPassword: this.state.enterPassword,
      reEnterPassword: value,
      match: match,
      passRequire1: this.state.passRequire1,
      passRequire2: this.state.passRequire2
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./spookytext.png')}
          style={styles.logoImage}/>
        <View style={styles.inputArea}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Enter something:</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={this.handleChangeText}
              value={this.state.currentInput}
            />
          </View>
        </View>
        <View style={styles.switchArea}>
          <View style={styles.labeledSwitch}>
            <Text>Reverse text:</Text>
            <Switch
              value={this.state.reverseText}
              onValueChange={this.handleReverseText}
            />
          </View>
          <View style={styles.labeledSwitch}>
            <Text>Reverse colors:</Text>
            <Switch
              value={this.state.reverseColors}
              onValueChange={this.handleReverseColors}
            />
          </View>
        </View>
        <View style={styles.resultArea}>
          <Text style={styles.resultLabel}>Result: </Text>
          <Text style={this.state.resultStyle}>{this.state.resultText}</Text>
        </View>
        <View style={styles.passwordArea}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Enter password:</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={this.handleEnterPassword}
              value={this.state.enterPassword}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Re-enter password:</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={this.handleReEnterPassword}
              value={this.state.reEnterPassword}
            />
          </View>
        </View>
        <View style={styles.passwordMsg}>
            <Text>Passwords must:</Text>
            <View style={styles.passwordRow}>
              <Ionicons name={this.state.passRequire1.icon} size={20} color={this.state.passRequire1.color}/> 
              <Text style={this.state.passRequire1.textStyle}>contain only leters and numbers</Text>
            </View>
            <View style={styles.passwordRow}>
              <Ionicons name={this.state.passRequire2.icon} size={20} color={this.state.passRequire2.color}/> 
              <Text style={this.state.passRequire2.textStyle}>contain at least one upper case letter, lower case letter, and number</Text>
            </View>
            <View style={styles.passwordRow}>
              <Ionicons name={this.state.match.icon} size={20} color={this.state.match.color}/>
              <Text style={this.state.match.textStyle}>match</Text>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoImage: {
    flex: 0.25,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    width: '80%',
    height: undefined,
    resizeMode: 'contain'
  },
  inputArea: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  inputLabel: {
    flex: 0.4,
  },
  inputBox: {
    flex: 0.6,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 24,
    padding: 5,

  },
  switchArea: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20
  },
  labeledSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  resultArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  resultLabel: {
    flex: 0.4
  },
  resultTextLight: {
    flex: 0.6,
    height: 40,
    padding: 5,
    color: 'black',
    backgroundColor: 'orange',
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'black'
  },
  resultTextDark: {
    flex: 0.6,
    height: 40,
    padding: 5,
    color: 'orange',
    backgroundColor: 'black',
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'orange'
  },
  passwordArea: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  passwordMsg:{
    flex: 0.3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 0
  },
  passwordRow:{
    flexDirection: 'row',
  },
  textGreen: {
    color: "green",
  },
  textRed: {
    color: "red",
  }
});
