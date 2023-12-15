//class imports
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

//component imports
import { griotaStyles } from '../../../assets/styles/style';
import CustomButton from '../../components/CustomButton/CustomButton';

//MAIN FUNCTION
const ApplicationReceived = ({navigation}) => {

  //constants 
  const route = useRoute()
  const {firstName, otherName, applicationValue} = route?.params
  const checkMark = 'https://www.griota.com/wp-content/uploads/2023/12/checkmark.png'

  return (
    <View style={{padding: 22}}>
        <Text style={griotaStyles.title}>Application Received</Text>
        <Image source={{uri: checkMark}} 
            style={{width: 250, height: 250, alignSelf: 'center'}}/>
        <Text style={styles.text}>
          Dear {firstName} {otherName}, your application for a loan of UGX 
          {applicationValue.toLocaleString('en-US')} has been received.
        </Text>
        <Text style={[styles.text, {fontWeight: 600}]}> 
          Our team will contact you within 2 to 4 hours as soon as a decision has been made. </Text>
        <Text style={styles.text}> {`Our working hours are 8am to 5pm, Monday to Friday.`} </Text>
        <CustomButton onPress={()=>{
          navigation.navigate('WelcomeScreen');
          }} buttonFunction={'CLOSE'} />
    </View>
  )}

export default ApplicationReceived

const styles = StyleSheet.create({
  text: {
    lineHeight: 24,
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    textAlign: 'left',
    display: 'flex',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  }
})