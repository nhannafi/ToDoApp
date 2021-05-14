import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput} from 'react-native';
import AddNewList from './components/AddNewList';
import OutlineButton from './components/OutlineButton';


import Fire from './fire';


export default function App() {
  const [update, setUpdate]= useState(false);
  const [color, setColor] = useState('#000');
  const [addList, setAddList] = useState(false);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateList = (list) => {
    const firebase = new Fire(async error => {
        if (error) return Alert.alert('Une erreur est survenue')
        await firebase.updateList(list)
        setUpdate(false)
        return function unsubscribe() {
            firebase.detach()
        }
    })
}

const deleteList =(list) => {
  const firebase = new Fire(async error => {
    if (error) return Alert.alert('Une erreur est survenue')
    await firebase.deleteList(list)
    return function unsubscribe() {
        firebase.detach()
    }
})
}
const closeUpdate =()=>{
  setUpdate(false);
}

  useEffect(() => {
    firebase = new Fire((error) => {
      if(error){
        return alert("Une erreur est survenue");
      }
      firebase.getLists(lists => {
        setLists(lists);
        setLoading(false);
      });
      return function unsubscribe(){
        firebase.detach(); 
      };
    });
  }, []);

  const renderTodo = (list) => (
    <View>
      <Text style={{color:'cadetblue'}}>{list.item.title}</Text>
      <Text> completed : {list.item.completed.toString()}</Text> 
    </View>
  );

  const renderList = ( list ) => (
    <View >
      {
      !update ?
      <>
      <Text style={{marginTop:5, marginBottom:5, fontSize:30}}>{list.item.name}</Text> 
      <FlatList
        data={list.item.todos}
        renderItem={renderTodo}
        keyExtractor={(list) => list.id}
        />
        <View style={styles.boutons}> 
        <OutlineButton onClick={() => setUpdate(true)} title={'modifier'}/>
        <Text>   </Text>
        <OutlineButton onClick={() => (deleteList(list.item.id))} title={'supprimer'}/>
        </View>
        </> 
        :
        <>
      <TextInput
        onChangeText={name => ({name})}
        defaultValue={list.item.name}
        placeholder="Nom"
        keyboardType="default"
      />
      <OutlineButton onClick={() => updateList(list)} title={'valider'}/>
      <OutlineButton onClick={() => closeUpdate(!update)} title={'annuler'}/>
      </>
      }
    </View>
    
  );
 
  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <AddNewList></AddNewList>
  
      <FlatList data={lists} renderItem={renderList} keyExtractor={(list) => list.id} />
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginTop:10
  },
  boutons: {
    margin:4,
    padding:5,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
