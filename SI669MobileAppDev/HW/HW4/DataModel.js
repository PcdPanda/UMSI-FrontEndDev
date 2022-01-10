
// utility function for getting unique keys
// will go away when we start using persistent storage
let nextKey = 1;
function getNextKey() {
  return '' + nextKey++;
}

class DataModel {

  constructor() {
    this.todoList = [];
    this.subscribers = []; 

    //hardcoded list for testing
    this.todoList.push({text: "Get milk", key: getNextKey(), check: false});
    this.todoList.push({text: "Pick up dry cleaning", key: getNextKey(), check: false});
    this.todoList.push({text: "Pay rent", key: getNextKey(), check: false});   
    this.show = false;
  }

  subscribeToUpdates(callback) {
    console.log("new subscriber: ", callback);
    this.subscribers.push(callback);
  }

  updateSubscribers() {
    for (let sub of this.subscribers) {
      sub(); // just tell them there's an update
    }
  }

  changeShow(){
    this.show = !this.show;
    this.updateSubscribers();
  }

  checkItem(key){
    let idx = this.todoList.findIndex((elem)=>elem.key===key);
    this.todoList[idx].check = !this.todoList[idx].check;
    this.updateSubscribers();
  }

  addItem(item) {
    item.key = getNextKey();
    item.check = false;
    this.todoList.push(item);
    this.updateSubscribers();
  }

  deleteItem(key) {
    let idx = this.todoList.findIndex((elem)=>elem.key===key);
    this.todoList.splice(idx, 1);
    this.updateSubscribers();
  }

  updateItem(key, newItem) {
    let idx = this.todoList.findIndex((elem)=>elem.key===key);
    this.todoList[idx] = newItem;
    this.updateSubscribers();
  }

  getItem(key) {
    let idx = this.todoList.findIndex((elem)=>elem.key===item.key);
    return(this.todoList[key]);
  }

  getTodoList() {
    return this.todoList;
  }

  getTodoListCopy() {
    return this.show?Array.from(this.todoList).filter(item=>!item.check):Array.from(this.todoList);
  }
}

let theDataModel;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}