import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';

export default function ToAddList(list){
 return (
  <View>
   <TouchableOpacity>
    <Text style={{textAlign: 'center'}}>+</Text>
   </TouchableOpacity>
   <Text>{list.item.name}</Text>
  </View>
 );

}

