import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import { 
  initializeFirestore, collection, getDocs, query,
  doc, addDoc, getDoc, onSnapshot
} from "firebase/firestore";
import { firebaseConfig } from './Secrets';

let app;
if (getApps().length == 0){
  app = initializeApp(firebaseConfig);
} 
const db = initializeFirestore(app, {
  useFetchStreams: false
});


export default function App() {

  const [inputText, setInputText] = useState('');
  const [authorText, setAuthorText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(()=>{

  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Message:</Text>
        <TextInput
          style={styles.inputBox}
          value={inputText}
          onChangeText={(text)=>setInputText(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>From:</Text>
        <TextInput
          style={styles.inputBox}
          value={authorText}
          onChangeText={(text)=>setAuthorText(text)}
        />
      </View>
      <View>
        <Button
          title="Send"
          onPress={()=>{
            setMessages(oldMessages=>{
              let newMessages = Array.from(oldMessages);
              let ts = Date.now();
              newMessages.push({
                author: authorText,
                text: inputText,
                timestamp: ts,
                key: '' + ts
              });
              return newMessages;
            });
            setInputText('');
          }}
        />
      </View>
      <View style={styles.messageBoardContainer}>
        <FlatList
          data={messages}
          renderItem={({item})=>{
            console.log(item);
            return (
              <View style={[
                styles.messageContainer
              ]}>
                <Text style={styles.messageText}>
                  {item.author}: {item.text}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '15%'
  },
  inputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: '90%',
  },
  inputBox: {
    width: '60%', 
    borderColor: 'black',
    borderWidth: 1, 
    height: 40
  },
  messageBoardContainer: {
    flex: 0.6,
    width: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    margin: '3%'
  },
  messageContainer: {
    flex: 0.05,
    padding: '2%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%'
  },
  messageText: {
    fontSize: 18
  }
});
