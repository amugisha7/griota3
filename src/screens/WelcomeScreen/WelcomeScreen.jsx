import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import React, {  } from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import Logo from '../../../assets/images/Griota_logo.png'

const WelcomeScreen = ({navigation}) => {

  const applyForLoan = () =>{
    navigation.navigate('SignInThenApply')
    // navigation.navigate('AddPayment') // remove this
  }
  
  const checkLoanBalance = () =>{
    navigation.navigate('SignInThenBalance')
  }
  
  const payLoan = () =>{
    navigation.navigate('PaymentInstructions')
  }

  const contactUs = () =>{
    navigation.navigate('ContactUs')
  }

  return (
    <ScrollView>
      <View style={{gap: 30, flexDirection: 'column', padding: 22}}>
        <Image source={Logo} style={styles.logo} resizeMode='contain'/>
        <Text style={griotaStyles.title}>Griota Boda Loans</Text>
        <Button onPress={applyForLoan} title='Apply for Loan'></Button>
        <Button onPress={checkLoanBalance} title='Check Loan Balance'></Button>
        <Button onPress={payLoan} title='Pay Loan'></Button>
        <Button onPress={contactUs} title='Contact Us'></Button>
      </View>
    </ScrollView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
      width: 100,
      height: 100,
      alignSelf: 'center'
  },
  link: {
    color: 'blue',
  }
  
})