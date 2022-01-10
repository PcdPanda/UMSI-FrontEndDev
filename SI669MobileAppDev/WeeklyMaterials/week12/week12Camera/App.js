import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';
import {getDataModel} from './DataModel';



function MainScreen({navigation}){
  const dataModel = getDataModel();
  const [image, setImage] = useState("");
  useEffect(()=>{
    dataModel.subscribeToImageUpdate(
      (imageObj) => {setImage(imageObj)}
    );
  }, []);
  return (
    <View style={styles.container}>
      <Image style={styles.mainImage} source={image}/>
      <Button title="Take a Picture!" onPress={()=>{navigation.navigate('Camera')}}></Button>
    </View>
  );
}

function CameraScreen({navigation}){
  const [hasPermission, setHasPermission] = useState(null);
  const dataModel = getDataModel();

  useEffect(()=>{
    async function getPermissions(){
      const {status} = await Camera.requestCameraPermissionsAsync(); // 要求获得照相机权限
      setHasPermission(status==='granted');
    }
    getPermissions();
  }, []);

  if(hasPermission === null){
    return <View></View>;
  }

  if(hasPermission === false){
    return <Text>No access to camera</Text>
  }
  let theCamera = undefined;
  return (
    <View style={styles.cameraContainer}>
      <Camera style={styles.camera} ratio='4:3' pictureSize='Medium' ref={ref=>theCamera=ref}/>
      <TouchableOpacity style={styles.cameraControls} onPress={async()=>{
          let picData = await theCamera.takePictureAsync();
          dataModel.updateImage(picData);
          navigation.goBack();
        }}>
        <Text style={styles.snapText}>Snap!</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;1. 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    height: 400,
    width: 300,
    resizeMode: 'contain'
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 0.85
  },
  cameraControls: {
    flex: 0.15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5%',
    width: '100%',
    backgroundColor: '#222'
  },
  snapText: {
    fontSize: 36,
    color: 'white'
  }
});
