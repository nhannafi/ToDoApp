import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import Colors from "./Colors";
export default function ToAddList(props){
 return (
  <View>
   <TouchableOpacity>
    <Text style={{textAlign: 'center'}}>+</Text>
   </TouchableOpacity>
   <Text>{props.title}</Text>
  </View>
 );

}

