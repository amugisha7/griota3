import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style'

const ApplicationReceived = ({navigation}) => {
  return (
    <View>
        <Text style={griotaStyles.title}>Application Received</Text>
        <Text style={griotaStyles.text}>Please allow us to review the information you have submitted. </Text>
        <Text style={[griotaStyles.text, {fontWeight: 600}]}> Our team will contact you within 2 hours as soon as a decision has been made. </Text>
        <Text style={griotaStyles.text}> {`Our working hours are 8am – 5pm, Monday to Friday.`} </Text>
    </View>
  )
}

export default ApplicationReceived

const styles = StyleSheet.create({
    
})