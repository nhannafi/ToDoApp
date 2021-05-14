import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import AddButton from './AddButton';
import OutlineButton from './OutlineButton';
import Fire from '../fire';

export default function AddNewList(props){
 const [name, setName]= useState(null);
 const [color, setColor] = useState('#000');
 const [addList, setAddList] = useState(false);

 const submit=()=>{
  const firebase = new Fire(async error => {
    if (error) return Alert.alert('Oups', 'Une erreur est survenue')
    if (!name) return Alert.alert('Erreur', 'Vous devez insérer un nom')

    await firebase.addList({name, color, todos: []})
    setAddList(false);
    setName(null)
    setColor('#000')

    return function unsubscribe() {
        firebase.detach()
    }
})
}

const closeAddind =()=>{
  setAddList(false);
  setName(null);
}
 return (
  <View>
    {
      !addList ? 
      <AddButton onClick={() => setAddList(true)} content={"Ajouter une liste"}/>
      :
      <>
      <View>
        <TextInput
            onChangeText={name => setName(name)}
            value={name}
            style={{textAlign: 'center', marginTop:20}}
            placeholder="Nom"
            keyboardType="default"
        />
      </View>
      <OutlineButton onClick={() => submit()} title={'Ajouter'}/>
      <OutlineButton onClick={() => closeAddind(!addList)} title='Annuler'/>
      </>
      }
   </View>
 );

}