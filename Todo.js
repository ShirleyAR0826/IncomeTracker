import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Todo = ({todo}) => {
    return (
        <View>
            <Text>{todo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default Todo
