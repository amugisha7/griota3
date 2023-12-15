import { View, Text, Image, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { griotaStyles } from '../../../assets/styles/style';
import CustomNumberInput from '../../components/CustomNumberInput';
import NewCustomButton from '../../components/NewCustomButton';

const ConfirmPhoneNumber = ({navigation}) => {

  const route = useRoute()
  const [errorMessage, setErrorMessage] = useState()
  const [status, setStatus] = useState('Confirm Phone Number')
  const [code, setCode] = useState()

  const phoneNumber = route?.params?.phoneNumber
  const firstName = route?.params?.firstName
  const otherName = route?.params?.otherName
  const stageIdNumber = route?.params?.stageIdNumber
  const nationalIdNumber = route?.params?.nationalIdNumber
  const selectedStage = route?.params?.selectedStage
  const stageIdPicURL = route?.params?.stageIdPicURL
  const nationalIdPicURL = route?.params?.nationalIdPicURL
  const mobileMoneyName = route?.params?.mobileMoneyName

  const confirmingCode = async () => {
    setStatus("Confirming...")
    try{
      const confirmation = await Auth.confirmSignUp(`+256${phoneNumber.slice(1)}`, code);
      if (confirmation)
      {
        setStatus("Confirm Phone Number")
        navigation.navigate('CreateNewPin', {
          phoneNumber, firstName, otherName, selectedStage, stageIdNumber, stageIdPicURL, 
          mobileMoneyName, nationalIdNumber, nationalIdPicURL
        })
      }
    }
    catch(e){
      setErrorMessage('Error. Please contact support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)    
    }
  }
  const goToRegisterPage = () => {navigation.navigate('Register')}
  
  const resendCode = async () => {
    try{
      const newCode = await Auth.resendSignUp(`+256${createdUserName.slice(1)}`);
      console.log('new code ', newCode)
    }
    catch(e){
      setLoginError('Error. Please contact support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)    
    }
  }

  return (
      <ScrollView>
        <View style={styles.container }>
          <Text style={griotaStyles.title}>Confirm Phone Number</Text>
          {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
          <View style={{width: 300, gap: 30}}>
            <CustomNumberInput handleChange={setCode} numberOfInputs={6}
              label={'Enter the 6-digit code sent to your phone number'}
            />
            <NewCustomButton buttonText={status} 
              disabled={status === 'Confirming...'} onPress={confirmingCode} />
          </View>
          <View style={{marginTop: 40}}>
            <Text>Didn't Receive Message?</Text>
          </View>
          <View style={{width: '50%'}}>
            <CustomButton onPress={resendCode} buttonFunction={'Resend Code'} type='SECONDARY'/>
          </View>
          <View style={{width: '50%'}}>
            <CustomButton onPress={goToRegisterPage} buttonFunction={'Change Number'} type='SECONDARY'/>
          </View>
        
        </View>
      </ScrollView>
    
  )
}
export default ConfirmPhoneNumber

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
      fontSize: 24,
      fontWeight: 600,
  },
  link: {
    color: 'blue',
  }
  
})

