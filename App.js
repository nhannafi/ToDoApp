import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import AddNewList from './components/AddNewList';


import Fire from './fire';

export default function App() {
  const [name, setName]= useState(null);
  const [color, setColor] = useState('#000');
  const [addList, setAddList] = useState(false);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      <Text>{list.item.title}</Text> 
      <Text> state : { list.item.completed}</Text> 
    </View>
  );

  const renderList = ( list ) => (
    <View>
      <Text >{list.item.name}</Text> 
      <FlatList
        data={list.item.todos}
        renderItem={renderTodo}
        keyExtractor={(list) => list.id}
      />
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
