import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity} from "react-native";
import { Button, CheckBox, BottomSheet, ListItem} from "react-native-elements";
import { Ionicons, MaterialIcons, AntDesign  } from '@expo/vector-icons'; 
import { getDataModel } from './DataModel'

const dataModel = getDataModel();

function HomeScreen({navigation}){
    let [dataList, updateDataList] = useState(dataModel.getToDoList());
    const [isVisible, updateIsVisible] = useState(false);
    const [sheetList, updateSheetList] = useState(['Hide Completed', 'Sort Priority Low to High'])
    const hidePress = () => {
        updateIsVisible(false);
        dataModel.changeChecked();
        if(sheetList[0]=="Hide Completed"){
            updateSheetList(["Show Completed", sheetList[1]]);
        }
        else{
            updateSheetList(["Hide Completed", sheetList[1]]);
        }
    }

    const sortPress = () => {
        updateIsVisible(false);
        dataModel.changeSort();
        if(sheetList[1]=="Sort Priority Low to High"){
            updateSheetList([sheetList[0], "Sort Priority High to Low"]);
        }
        else{
            updateSheetList([sheetList[0], "Sort Priority Low to High"]);
        }
    }

    useEffect(()=>{
        dataModel.addSubscribers(
            ()=>{updateDataList(dataModel.getToDoList())}
        )},[]);

    return (<View style={styles.container}>
        <View style={styles.title}>
            <Text style={{fontSize: 24}}>ListMaker 3000</Text>
            <TouchableOpacity onPress={(value)=>{updateIsVisible(!isVisible)}}>
                <Ionicons name="ios-settings-sharp" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.listContainer}>
            <FlatList 
                data={dataList} 
                renderItem={({item}) => {return (
                    <View style={styles.contentStyle}>
                        <View style={styles.checkArea}>
                            <CheckBox checked={item.checked} onPress={()=>dataModel.checkItem(item.key)}/>
                        </View>
                        <View style={styles.textArea}>
                            <Text style={{fontSize:18}}>{item.text}</Text>
                        </View>
                        <View style={styles.statusArea}>
                            <Text style={{fontSize:18, flex:0.2}}>{item.priority}</Text>
                            <View style={styles.buttonArea}>
                                <Button
                                icon={<MaterialIcons name="edit" size={24} color="darkgrey"/>}
                                type="clear"
                                onPress={()=>{
                                    navigation.navigate('Details', {item: item});
                                }}
                                />
                                <Button
                                icon={<MaterialIcons name="delete" size={24} color="darkgrey"/>}
                                type="clear"
                                onPress={()=>{
                                    dataModel.deleteItem(item.key);
                                }}
                                />
                            </View>
                        </View>      
                    </View>
                );}}>
            </FlatList>
        </View>
        <Button title="Add Item" onPress={()=>{navigation.navigate("Details")}}></Button>
        <BottomSheet isVisible={isVisible} >
            <View style={styles.bottomTitle}>
                <Text style={[styles.bottomText, {color:"white"}]}>Settings</Text>
                <TouchableOpacity onPress={()=>{updateIsVisible(false)}}>
                    <AntDesign name="closesquare" size={30} color="#2986cc"/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={hidePress}>
                <View style={styles.bottomContent}>
                    <Text style={styles.bottomText}>{sheetList[0]}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={sortPress}>
                <View style={styles.bottomContent}>
                    <Text style={styles.bottomText}>{sheetList[1]}</Text>
                </View>
            </TouchableOpacity>
        </BottomSheet>
    </View>)
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column'
    },
    title:{
        flex: 0.2,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        paddingLeft: "10%",
    },
    line:{
        marginTop: 1,
        height: 1,
        marginTop: "10%",
        marginBottom: "10%",
        width: "90%",
        backgroundColor: "gray"
    },
    listContainer: {
        flex: 0.5,
        width: "90%",
        alignItems: "center",
    },
    contentStyle:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        width: 300,
    },
    itemText:{
        marginRight: "7.5%",
    },
    checkArea: {
        flex:0.2 
    },
    textArea: {
        flex:0.5
    },
    statusArea: {
        flex: 0.3,
        flexDirection: "row",
        alignItems: "center",
    }, 
    buttonArea: {
        flexDirection: "row",
        flex: 0.5,
    },
    bottomText:{
        fontSize: 20
    },
    bottomTitle: {
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
    bottomContent: {
        backgroundColor: "white",
        padding: 15
    }
  });