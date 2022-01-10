import {initializeApp, getApps} from 'firebase/app';
import {getStorage, uploadBytes, getDownloadURL, ref} from 'firebase/storage';
import {firebaseConfig} from './Secrets';
let app;
if (getApps.length==0){
  app = initializeApp(firebaseConfig);
}
const storage = getStorage(app);

class DataModel {
    constructor(){
        this.theImage = undefined;
        this.theCallback = undefined;
        this.currentPhotoRef = ref(storage, 'images/currentPhoto.jpg');
        const setupDownloadURL = async() => {
            this.downloadURL = await getDownloadURL(this.currentPhotoRef);
            this.theImage = {uri: this.downloadURL};
            if (this.theCallback){
                this.Callback(this.theImage);
            }
        }
        setupDownloadURL();
    }

    subscribeToImageUpdate = (callback) => {
        this.theCallback = callback;
    }

    updateImage = async (imageObject) => {
        try {
            const response = await fetch(imageObject.uri);
        //     const imageBlob = await response.blob();
            await uploadBytes(this.currentPhotoRef, imageBlob);
        }catch(e){
            console.log(e);
        }
        this.theImage = imageObject;
        if(this.theCallback){
            this.Callback(imageObject);
        }
    }
}

let theDataModel = undefined;
export function getDataModel(){
    if (!theDataModel){
        theDataModel = new DataModel();
    }
    return theDataModel;
}