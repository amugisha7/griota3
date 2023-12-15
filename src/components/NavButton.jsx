import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native';

const NavButton = ({buttonText, buttonColor, buttonDisabled, buttonChange}) => {
    return (
      <Pressable onPress={buttonChange} disabled={buttonDisabled}
        style={[styles.pressable, {backgroundColor: buttonColor}]}>
        <Text style={{color: 'white'}}>{buttonText}</Text>
      </Pressable>
    )
  };

export default NavButton

const styles = StyleSheet.create({
    pressable: {
        width: '40%', alignItems: 'center', padding: 15, 
      }
})