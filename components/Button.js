import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'

const Button = ({onClick, title}) => {
    return(
        <View>
            <TouchableOpacity onPress={onClick}>
                <Text>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button