import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import CustomButton from '../../components/CustomButton/CustomButton'
import NewCustomButton from '../../components/NewCustomButton'

const ContactUs = ({navigation}) => {
  const admin = true
  return (
    <ScrollView>
        <View style={{flexDirection: 'column', padding: 22}}>
          <Text style={griotaStyles.title}>Contact Us</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 40}}>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Call/Whatsapp: 0782-892-283 </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Call/Whatsapp: 0702-717-017 </Text>
          </View>
          <CustomButton onPress={()=> navigation.navigate("WelcomeScreen")} buttonFunction={"Go Back"} />
          <NewCustomButton onPress={()=> navigation.navigate("SignInThenBalance", {admin})}
            buttonText={'Admin Login'} color={'green'} disabled={false}/>
        </View>
    </ScrollView>
  )
}

export default ContactUs