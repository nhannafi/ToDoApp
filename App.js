import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput} from 'react-native';
import AddNewList from './components/AddNewList';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import OutlineButton from './components/OutlineButton';

import {NavigationContainer} from '@react-navigation/native'
import UpdateList from './components/UpdateList';

import Fire from './fire';

const Stack = createStackNavigator()

export default function App({navigation}) {
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
        getLists()
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
    <View style={{display:'flex'}}
    >
      <Text>Liste des taches : </Text>
      <Text>tâche : {list.item.title}</Text> 
      <Text> completed : {list.item.completed.toString()}</Text> 
    </View>
  );

  const renderList = ( list ) => (
    <View>
      {
      !update ?
      <>
      <Text>{list.item.name}</Text> 
      <FlatList
        data={list.item.todos}
        renderItem={renderTodo}
        keyExtractor={(list) => list.id}/>
        <OutlineButton onClick={() => setUpdate(true)} title={'modifier'}/>
        <OutlineButton onClick={() => (deleteList(list.item.id))} title={'supprimer'}/>
        </> 
        :
        <>
      <TextInput
        onChangeText={name => ({name})}
        defaultValue={list.item.name}
        placeholder="Nom"
        keyboardType="default"
        multiline={true}
      />
      <OutlineButton onClick={() => updateList(list.item.id, list.item.name)} title={'valider'}/>
      <OutlineButton onClick={() => closeUpdate(!update)} title={'annuler'}/>
      </>
      }
    </View>
    
  );
 
  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <AddNewList></AddNewList>
  
      <FlatList data={lists} renderItem={renderList} keyExtractor={(list) => list.id}/>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
