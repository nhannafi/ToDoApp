import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';

export default function AddButton(props){
 return (
  <View>
   <TouchableOpacity onPress={props.onClick}>
    <Text style={{textAlign: 'center', marginTop:20}}>+</Text>
   </TouchableOpacity>
   <Text style={{ borderRadius:7, backgroundColor:'gainsboro', marginTop:20}}>{props.content}</Text>
  </View>
 );

}

