import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { initializeApp, getApps } from 'firebase/app';
import { 
  initializeFirestore, collection, getDocs, query, orderBy, limit,
  where, doc, addDoc, getDoc, onSnapshot
} from "firebase/firestore";
import { firebaseConfig } from './Secrets';

let app;
if (getApps().length == 0){
  app = initializeApp(firebaseConfig);
} 
const db = initializeFirestore(app, {
  useFetchStreams: false
});

let snapshotUnsubscribe = undefined;

export default function App() {
  const boards = ['#all', '#general', '#announcements', '#random'];
  const [inputText, setInputText] = useState('');
  const [authorText, setAuthorText] = useState('');
  const [messages, setMessages] = useState([]);
  const [board, setBoard] = useState(boards[0]);
  const [sort, setSort] = useState("desc");

  function subscribeToSnapshot () {
    var q;
    if (snapshotUnsubscribe) {
      snapshotUnsubscribe();
    }
    if(board=="#all") q = query(
      collection(db, 'messageBoard'), 
      orderBy("timestamp", sort));
    else{
      q = query(
        collection(db, 'messageBoard'), 
        where("board", "==", board), 
        orderBy("timestamp", sort));
    }
    
    snapshotUnsubscribe = onSnapshot(q, (qSnap) => {
      let newMessages = [];
      qSnap.docs.forEach((docSnap)=>{
        let msg = docSnap.data();
        msg.key = docSnap.id;
        msg.timestamp = msg.timestamp.toDate();
        newMessages.push(msg);
      });
      setMessages(newMessages);
    });
  }

  useEffect(()=>{ 
    subscribeToSnapshot();
  }, [board, sort]);

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
            let newMsg = {
                author: authorText,
                text: inputText,
                timestamp: new Date(),
                board: board
            };
            addDoc(collection(db, "messageBoard"), newMsg);
            setInputText('');
          }}
        />
      </View>
      <View style={styles.boardSelectionContainer}>
        <FlatList
          contentContainerStyle={styles.boardSelectionContentContainer}
          data={boards}
          renderItem={({item})=>{
            return (
              <Button
                title={item}
                onPress={()=>{
                  setBoard(item)
                }}
                color={item===board?'red': 'gray'}
              />
            );
          }}
          keyExtractor={(item, index)=>item}
        />
      </View>
      <View style={styles.sortContainer}>
          <Text style={styles.sortText}>Sort by time sent:</Text>
          <View style={styles.sortButtonContainer}>
            <TouchableOpacity onPress={()=>setSort("desc")}>
            <FontAwesome5 name="sort-amount-down" size={24} color={sort=="desc"?"orange":"black"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSort("asc")}>
              <FontAwesome5 name="sort-amount-down-alt" size={24} color={sort=="asc"?"orange":"black"} />
            </TouchableOpacity>
          </View>
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={({item})=>{
            return (
              <View style={[
                styles.messageContainer
              ]}>
                <Text style={styles.messageText}>
                  {item.author}: {item.text} 
                  <Text style={{fontSize: 9}}> ( 
                  {item.timestamp
                    .toLocaleDateString('en-us', { 
                      month:"numeric", 
                      day:"numeric", 
                      hour:"numeric", 
                      minute:"numeric",
                      seconds: "numeric"
                    })} 
                  )</Text>
                </Text>
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
  boardSelectionContainer: {
    flex: 0.1, 
    //flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },  
  boardSelectionContentContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },  
  chatContainer: {
    flex: 0.6,
    width: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    margin: '3%'
  },
  sortContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  sortText: {
    color:"gray",
    fontSize: 20
  },  
  sortButtonContainer: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-around",
    alignContent: "flex-end",
    paddingTop: 5, 
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
