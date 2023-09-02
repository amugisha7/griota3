import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style';
import CustomButton from '../../components/CustomButton/CustomButton';

const ApplicationReceived = ({navigation}) => {

  return (
    <View style={{padding: 20}}>
        <Text style={griotaStyles.title}>Application Received</Text>
        <Text style={[griotaStyles.text, {fontWeight: 600}]}> Our team will contact you within 2 to 4 hours as soon as a decision has been made. </Text>
        <Text style={griotaStyles.text}> {`Our working hours are 8am to 5pm, Monday to Friday.`} </Text>
        <CustomButton onPress={()=>{
          navigation.navigate('WelcomeScreen');
          }} buttonFunction={'EXIT'} />
    </View>
  )
}

export default ApplicationReceived

const styles = StyleSheet.create({
    
})