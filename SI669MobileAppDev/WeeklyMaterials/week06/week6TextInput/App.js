import React from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity } from 'react-native';


class DummyInput extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Type here"
        />
      </View>
    )
  }

}

class BasicInput extends React.Component {

  constructor() {
    super();
    this.state = {
      currentText: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.currentText}</Text>
        <TextInput
          placeholder="Type here"
          onChangeText={textValue => this.setState({currentText: textValue})}
        />
      </View>
    )
  }
}

class HelloName extends React.Component {
  
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello, {this.state.firstName} {this.state.lastName}!
        </Text>
        <View>
          <Text>First Name: </Text>
          <TextInput
            placeholder="enter first name"
            onChangeText={textValue => this.setState({firstName: textValue})}
          />
        </View>
        <View>
          <Text>Last Name: </Text>
          <TextInput
            placeholder="enter last name"
            onChangeText={textValue => this.setState({lastName: textValue})}
          />
        </View>
      </View>
    )
  }
}

class HelloNameDestruct extends React.Component {
  
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  render() {
    let {firstName, lastName} = this.state;
    return (
      <View style={styles.container}>
        <Text>
          Hello, {firstName} {lastName}!
        </Text>
        <View>
          <Text>First Name: </Text>
          <TextInput
            placeholder="enter first name"
            onChangeText={textValue => this.setState({firstName: textValue})}
          />
        </View>
        <View>
          <Text>Last Name: </Text>
          <TextInput
            placeholder="enter last name"
            onChangeText={textValue => this.setState({lastName: textValue})}
          />
        </View>
      </View>
    )
  }
}

class HelloName2 extends React.Component {
  
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  // implement handleChangeFirstName here
  
  render() {
    let {firstName, lastName} = this.state;
    return (
      <View style={styles.container}>
        <Text>
          Hello, {firstName} {lastName}!
        </Text>
        <View>
          <Text>First Name: </Text>
          <TextInput
            placeholder="enter first name"
            onChangeText={this.handleChangeFirstName}
          />
        </View>
        <View>
          <Text>Last Name: </Text>
          <TextInput
            placeholder="enter last name"
            onChangeText={textValue => this.setState({lastName: textValue})}
          />
        </View>
      </View>
    )
  }
}

class SaveApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputContents: '',
      savedContents: ''
    };
  }

  handleChange = (text) => {
    this.setState({inputContents: text});
  } 

  handlePress = () => {
    this.setState({savedContents: this.state.inputContents});
  }

  render() {  
    return (
      <View style={styles.container}>
        <Text>
          {this.state.savedContents}
        </Text>
        <TextInput
          onChangeText={this.handleChange}
          placeholder="Type here!"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.button}>
            <Text>Save</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 50
  },

  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    fontSize: 40,
    width: '95%'
  },
  button: {
    margin: 40,
    height: 40,
    width: 80,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10
  }
});


// export default DummyInput;
// export default HelloName;
// export default HelloNameDestruct;
export default HelloName2;
// export default SaveApp;
