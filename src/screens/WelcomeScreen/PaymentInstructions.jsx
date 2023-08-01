import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import CustomButton from '../../components/CustomButton/CustomButton'

const PaymentInstructions = ({navigation}) => {
  return (
    <ScrollView>
        <View style={{flexDirection: 'column', padding: 22}}>
          <Text style={griotaStyles.title}>How To Pay Loan</Text>
          <Text style={griotaStyles.label}>Using MTN MoMo Pay</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Dial *165*3# </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Merchant Code: 185344 (Andrew) </Text>
          </View>
          <Text style={griotaStyles.label}>Using Airtel Pay</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 40}}>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Dial *185*9# </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Merchant ID: 6240700 (Griota) </Text>
          </View>
          <CustomButton onPress={()=> navigation.navigate("WelcomeScreen")} buttonFunction={"Go Back"} />
        </View>
    </ScrollView>
  )
}

export default PaymentInstructions