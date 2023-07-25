import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotConnected = () => {
  setTimeout(()=>{
    return (
      <View style={{
          justifyContent: 'center',
      }}>
        <Text style={{
          fontSize: 24,
          color: 'red'
        }}>Internet Required. Please connect.</Text>
      </View>
    )
  }, 2000)
}

export default NotConnected

