import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddButton from './components/AddButton';
import Fire from './fire';

export default function App() {
  
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  var firebase = null;
  
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
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AddButton content={"Ajouter une liste"}/>
      
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
