import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'



const CustomButton = ({onPress, buttonFunction, type}) => {

  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]} >{buttonFunction}</Text>
      
    </Pressable>
  )
  
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3D00FF',
        marginVertical: 10,
        width: '100%',    
        padding: 15,
        alignItems: 'center',
    },
    
    container_SECONDARY: {
        backgroundColor: '#F2F2F2',
              
    },
    container_DISABLED: {
        backgroundColor: '#bcbcbc'
    },
    text: {
        fontWeight: '600',
        color: 'white',
    },
    text_SECONDARY: {
        color: '#3D00FF',
        fontWeight: 600,
    },

  })
