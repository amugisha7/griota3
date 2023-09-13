import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import CustomButton from '../../components/CustomButton/CustomButton'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import airtel_logo from '../../../assets/images/Airtel_logo.png'
import mtn_logo from '../../../assets/images/Mtn_logo.png'
import Logo from '../../../assets/images/Griota_logo.png'

const PaymentInstructions = ({navigation}) => {

  const mtnPayment = ()=>{
    RNImmediatePhoneCall.immediatePhoneCall('*165*3*185344#');
  }
  const airtelPayment = ()=>{
    RNImmediatePhoneCall.immediatePhoneCall('*185*9*6240700#');
  }
  return (
    <ScrollView>
        <View style={{flexDirection: 'column', padding: 22}}>
          <Text style={griotaStyles.title}>Pay Your Griota Loan</Text>
          <Image source={mtn_logo} style={[styles.logo, {marginBottom: -20}]} resizeMode='contain'/>
          <Text style={[griotaStyles.label, {textAlign: 'center'}]}>Using MTN MoMo</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
            <Text style={[griotaStyles.text, {textAlign: 'center'}]}>Dial *165*3# </Text>
            <Text style={[griotaStyles.text, {textAlign: 'center'}]}>Merchant Code: 185344 (Andrew) </Text>
            <CustomButton onPress={mtnPayment} 
              buttonFunction={"Pay with MTN MOMO"} type={'MTN'}/>
          </View>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 40, marginTop: 20}}>
            <Image source={airtel_logo} style={[styles.logo,{marginBottom: -10}]} resizeMode='contain'/>
            <Text style={[griotaStyles.label, {textAlign: 'center'}]}>Using Airtel Pay</Text>
            <Text style={[griotaStyles.text, {textAlign: 'center'}]}>Dial *185*9# </Text>
            <Text style={[griotaStyles.text, {textAlign: 'center'}]}>Merchant ID: 6240700 (Griota) </Text>
            <CustomButton onPress={airtelPayment} 
              buttonFunction={"Pay with AIRTEL Money"} type={'AIRTEL'} />
          </View>
          <View style={{marginTop: 0}}>
            <CustomButton onPress={()=> navigation.navigate("WelcomeScreen")} 
            buttonFunction={"Go Back"} type={'SECONDARY'}/>
          </View>
        </View>
    </ScrollView>
  )
}

export default PaymentInstructions

const styles = StyleSheet.create({
    
  logo: {
      width: 100,
      height: 100,
      alignSelf: 'center'
  },
  
})