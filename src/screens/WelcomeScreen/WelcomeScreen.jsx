import { StyleSheet, Text, View, Button } from 'react-native'
import React, {  } from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import { useRoute } from '@react-navigation/native';

const WelcomeScreen = ({navigation}) => {

  const route = useRoute()
  const phoneNumber = route?.params?.phoneNumber
  const pin = route?.params?.password

  const applyForLoan = () =>{
    navigation.navigate('ApplyForLoan', {phoneNumber, pin})
  }
  
  const checkLoanBalance = () =>{
    navigation.navigate('CheckLoanBalance', {phoneNumber, pin})
  }
  
  return (
    <View style={{gap: 30, flexDirection: 'column', padding: 22}}>
      <Text style={griotaStyles.title}>Welcome</Text>
      <Button onPress={applyForLoan} title='Apply for Loan'></Button>
      <Button onPress={checkLoanBalance} title='Check Loan Balance'></Button>
    </View>
  )
}

export default WelcomeScreen