import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';

export default function AddButton(props){
 return (
  <View>
   <TouchableOpacity>
    <Text style={{textAlign: 'center'}}>+</Text>
   </TouchableOpacity>
   <Text style={{ borderRadius:7, backgroundColor:'gainsboro'}}>{props.content}</Text>
  </View>
 );

}

