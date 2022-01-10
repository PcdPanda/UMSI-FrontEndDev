import firebaseConfig from "./Secrets.js";
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, doc, query, deleteDoc, setDoc, Transaction} from "firebase/firestore"
import { useState } from "react";


const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  useFetchStreams: false
});


let nextKey = 1;
function getNextKey(){
    return nextKey++;
}

class DataModel{
    constructor(){
        this.toDoList = [];
        this.subscribers = [];
        this.sortHighToLow = true;
        this.showChecked = true;
        this.data = [];
    }

    setToDoList(toDoList){
        this.toDoList = toDoList;
        this.updateSubscribers();
    }

    changeChecked(){
        this.showChecked = !this.showChecked;
        this.updateSubscribers();
    }

    changeSort(){
        this.sortHighToLow = !this.sortHighToLow;
        this.updateSubscribers();
    }

    updateSubscribers(){
        for(let sub of this.subscribers)sub();
        for(let item of this.toDoList){
            setDoc(doc(db, "ListMaker3000", item.key.toString()), item);
        }
    }

    addSubscribers(sub){
        this.subscribers.push(sub);
    }

    getToDoList(){
        if(this.sortHighToLow){
            this.toDoList.sort((a, b)=>{return b.priority.length - a.priority.length});
        }
        else{
            this.toDoList.sort((a, b)=>{return a.priority.length - b.priority.length});
        }
        if(this.showChecked)return Array.from(this.toDoList);
        else return Array.from(this.toDoList.filter((a)=>(!a.checked)));
    }

    addItem(Item){
        Item.key = getNextKey();
        this.toDoList.push(Item);
        this.updateSubscribers();
    }

    checkItem(key){
        const idx= this.toDoList.findIndex(ele=>(ele.key==key));
        this.toDoList[idx].checked = !this.toDoList[idx].checked;
        this.updateSubscribers();
    }

    deleteItem(key){
        const idx= this.toDoList.findIndex(ele=>(ele.key==key));
        this.toDoList.splice(idx, 1);
        deleteDoc(doc(db, "ListMaker3000", key.toString()));
        this.updateSubscribers();

    }

    updateItem(key, item){
        const idx= this.toDoList.findIndex(ele=>(ele.key==key));
        this.toDoList[idx] = item;
        this.updateSubscribers();
    }
}

let dataModel;

export function getDataModel(){
    const q = query(collection(db, "ListMaker3000"));
    if(!dataModel){
        dataModel = new DataModel();
        getDocs(q).then(
            (querySnapshot)=>{
                let toDoList = [];
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    nextKey = Math.max(parseInt(data.key) + 1, nextKey);
                    toDoList.push(data);
                })
                dataModel.setToDoList(toDoList);
            });

    }
    return dataModel;
};

