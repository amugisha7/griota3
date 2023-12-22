import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { API, graphqlOperation } from "aws-amplify";
import CustomNumberInput from '../../../components/CustomNumberInput';
import CustomDropDown from '../../../components/CustomDropDown/CustomDropDown';
import { useRoute } from '@react-navigation/native';

const CreateAdminUser = ({navigation}) => {

//states
  const [status, setStatus] = useState('Create Admin User')
  const [phoneNumber, setPhoneNumber] = useState()
  const [userLevel, setUserLevel] = useState()
  const [errorMessage, setErrorMessage] = useState()
//concstants
  const route = useRoute()
  const level = route?.params?.level
  const PHONE_REGEX = /^07\d{8}$/
//functions
  const registerAdminUser = async()=>{
    setStatus('Processing...')
    const selectedLevel = userLevel === 'LEVEL 1: FIELD AGENT' ? 1 : 2
    try {
      const newAdminUser = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          createAdminstrator(input: {
            id: "${phoneNumber}", 
            phoneNumber: "${phoneNumber}", 
            level: ${selectedLevel}
          }) {
            id
          }
        }`
      ))
      if(newAdminUser) {
        console.log('newAdminUser::: ', newAdminUser);        
        setStatus('SUCCESS')
        setTimeout(()=> navigation.navigate('AdminScreen', {level}), 3000)
      }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }

  return (
    <ScrollView>
      <View style={{padding: 22}}>
      {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
        <Text style={griotaStyles.title}>Create Admin User</Text>
        <CustomDropDown
          items={['<-- Select -->', 'LEVEL 1: FIELD AGENT', 'LEVEL 2: OFFICE ADMIN']}
          setSelectedItem={setUserLevel} 
          mylabel={'Select User type'}
        />
        <CustomNumberInput handleChange={setPhoneNumber} numberOfInputs={10}
          label={`Admin User Phone Number`}
        />
        {!PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 && <Text style={griotaStyles.errors}>Invalid Phone Number</Text>}
        { phoneNumber && userLevel && userLevel !== '<-- Select -->' &&
          PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 &&
          <CustomButton onPress={registerAdminUser} buttonFunction={status} />}
      </View>
    </ScrollView>
  )
}

export default CreateAdminUser

const styles = StyleSheet.create({})