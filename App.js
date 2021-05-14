import { StatusBar } from 'expo-status-bar';
import AddButton from "components/AddButton";
import React, { useEffect, useState } from 'react';
import {  StyleSheet,
          Text,
          View,
          FlatList,
          TextInput,
          Modal,
          Pressable,
        } from 'react-native';
import AddNewList from './components/AddNewList';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker'
import Fire from './fire';

const colors = {
  darkPrimary: '#303F9F',
  lightPrimary: '#C5CAE9',
  primary: '#3F51B5',
  text: '#FFFFFF',
  accent: '#536DFE',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textDivider: '#BDBDBD',
  success: '#00E676',
  darkSuccess: '#00C853',
  danger: '#f44336'
}
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
  
  if (loading){
    return(
        <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary}/>
        </View>
    );
}

  function toggleAddToDoModal(){
    setAddTodoVisible(!addTodoVisible);
  }
   
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
      <Modal
      animationType='slide'
      visible={addTodoVisible()}
      onRequestClose={ ()=>toggleAddToDoModal}
      style={{backgroundColor:addTodoVisible ? 'red': 'blue'}}
      >
        <StatusBar style="auto" />
        <AddNewList onClose ={()=> toogleAddTodoModal()}></AddNewList>
        
      </Modal>
      <View style={{ flexDirection:"row"}}>
          <Text style={styles.titre}>
            <Text style={{ fontWeight: "bold" , color: colors.primary}}>My To Do </Text> App
          </Text>
      </View>
      
      <FlatList 
      data={lists} 
      renderItem={renderList} 
      keyExtractor={(list) => list.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="always"  
      />
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 20,
    marginRight: 8
  },
  titre: {
      fontSize: 24,
  },
  buttonOpen: {
    backgroundColor: colors.primary
  },
  buttonClose: {
      backgroundColor: colors.darkPrimary
  },
  buttonDanger: {
      backgroundColor: colors.danger
  },
  buttonConfirm: {
    backgroundColor: colors.darkSuccess
},
});
