import React from 'react';
import 'react-native-gesture-handler';
import {View, Text, TouchableOpacity } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

const Stack = createStackNavigator()

export default function UpdateList({ navigation }){
 return (
  <View>
         <Stack.Screen name="Retour" component={UpdateList}/>
  </View>
 );

}

