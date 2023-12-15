import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NewCustomButton = ({buttonText, disabled, onPress}) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} 
        style={[styles[`pressable_${disabled}`] , styles.pressable]}>
        <Text style={styles.text}>{buttonText}</Text>
    </Pressable>
  )
}

export default NewCustomButton

const styles = StyleSheet.create({
    pressable_false: {
        backgroundColor: 'blue'
      },
    pressable_true: {
        backgroundColor: 'grey'
    },
    pressable: {
        width: '100%', alignItems: 'center', padding: 15,
    },
    text: {
        fontWeight: '600',
        color: 'white',
    },
})