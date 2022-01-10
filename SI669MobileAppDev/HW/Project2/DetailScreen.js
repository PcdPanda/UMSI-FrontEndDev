import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Button, CheckBox} from 'react-native-elements'
import {getDataModel} from './DataModel';


function DetailScreen({navigation, route}) {
    let editMode = (route.params != null);
    let item = route.params ? route.params.item : {text: "", priority: "!", checked: false};
    const [inputText, setInputText] = useState(item.text);
    const [inputPriority, setInputPriority] = useState(item.priority);
    const [inputCheck, setInputCheck] = useState(item.checked);
    let dataModel = getDataModel();
  
    return (
        <View style={styles.container}>
            <View style={{flex: 0.1}}></View>
            <View style={styles.inputArea}>
                <Text style={styles.inputLabel}>Item:</Text>
                <View style={styles.inputStyle}>
                    <Input 
                        placeholder="New Todo Item"
                        onChangeText={(text)=>{setInputText(text)}}
                        value={inputText}/>
                </View>
            </View>  
            <View style={styles.priorityArea}>
                <Text style={styles.inputLabel}>Priority:</Text>
                <View style={styles.inputStyle}>
                    <TouchableOpacity onPress={()=>setInputPriority("!")}>
                        <Text style={inputPriority=="!" ? styles.redPriority : styles.blackPriority}>!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setInputPriority("!!")}>
                        <Text style={inputPriority=="!!" ? styles.redPriority : styles.blackPriority}>!!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setInputPriority("!!!")}>
                        <Text style={inputPriority=="!!!" ? styles.redPriority : styles.blackPriority}>!!!</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.checkArea}>
                <Text style={styles.inputLabel}>Completed:</Text>
                <View style={styles.inputStyle}>
                    <CheckBox checked={inputCheck} onPress={(value)=>setInputCheck(!inputCheck)}></CheckBox>
                </View>
            </View>

            <View style={styles.buttonArea}>
                <Button
                containerStyle={styles.button}
                title="Cancel"
                onPress={()=>{navigation.navigate("Home");}}/>
                <Button
                containerStyle={styles.button}
                title={editMode ? "Save" : "Add Item"}
                onPress={()=>{
                    if (editMode) {
                        item = {text: inputText, priority: inputPriority, checked: inputCheck, key: route.params.item.key}
                        dataModel.updateItem(item.key, item);
                    } else {
                        dataModel.addItem({text: inputText, priority: inputPriority, checked: inputCheck}); 
                    }
                    navigation.navigate("Home");
                }}/>
            </View>
        </View>);
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 30
    },
    inputArea: {
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: "100%"
    },
    priorityArea: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%"
      },
    checkArea: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%"
    },
    buttonArea: {
      flex: 0.1,
      flexDirection: 'row',
      paddingTop: 30,
      justifyContent: 'space-between',
      width: '70%',
    },
    inputLabel: {
      flex: 0.4,
      textAlign: 'right',
      fontSize: 18,
      paddingRight: 10,
    //   paddingBottom: 10,
    },
    button: {
      width: '40%'
    },
    inputStyle:{
        flex: 0.6,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 10
    },
    redPriority:{
        flex: 0.6,
        color: "red",
        fontSize: 18,
        paddingRight: 10,
        marginRight: "5%",
        marginLeft: "5%"
    },
    blackPriority:{
        flex: 0.6,
        color: "black",
        fontSize: 18,
        paddingRight: 10,
        marginRight: "5%",
        marginLeft: "5%"
    }
  });
  