import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import Colors from "./Colors";
const OutlineButton = ({onClick, title}) => {
    return(
        <View>
            <TouchableOpacity onPress={onClick}>
                <Text>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OutlineButton