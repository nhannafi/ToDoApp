import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2BZyeHB37L3YGGgNatJlrI0PmqGG-MV8",
    authDomain: "todoapp-2916c.firebaseapp.com",
    projectId: "todoapp-2916c",
    storageBucket: "todoapp-2916c.appspot.com",
    messagingSenderId: "855779877602",
    appId: "1:855779877602:web:8640f5e4fa4b454869f4bb"
  };

export default class Fire {
    constructor(callback){
        this.init(callback);
    }

    init(callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                callback(null);
            } else {
                firebase.auth().signInAnonymously.cath(error =>{
                    callback(error);
                });
            }
        })
    }
    addList(List) {
        let ref = this.ref;
        ref.add(list);
    }
    deleteList(list){
        let ref = this.ref;
        ref.doc(list.id).delete();
    }

    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }
    
    detach(){
        this.unsubscribe();
    }

    get ref(){
        return firebase.firestore().collection("lists");
    }

    getLists(callback){
        let ref = this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists =[];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });
            callback(lists);
        }, function(error){
            console.log(error);
        });
    }
}