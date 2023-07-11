import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { griotaStyles } from '../../../assets/styles/style';

const ConfirmPhoneNumber = ({navigation}) => {

  const route = useRoute()
  const [errorMessage, setErrorMessage] = useState()
  const phoneNumber = route?.params?.phoneNumber
  const firstName = route?.params?.firstName
  const otherName = route?.params?.otherName
  const idNumber = route?.params?.idNumber
  const selectedStage = route?.params?.selectedStage
  const stageIdCardPicFile = route?.params?.idPicURL

  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: '',
    }
  });

  const confirmingCode = async (data) => {
    const {code} = data;    
    try{
      await Auth.confirmSignUp(`+256${phoneNumber.slice(1)}`, code);
      navigation.navigate('CreateNewPin', {
        phoneNumber, firstName, otherName, selectedStage, idNumber, stageIdCardPicFile
      })
    }
    catch(e){
      setErrorMessage(e.message)
    }
  }
  const goToRegisterPage = () => {navigation.navigate('Register')}
  
  const resendCode = async () => {
    try{
      const newCode = await Auth.resendSignUp(`+256${createdUserName.slice(1)}`);
      console.log('new code ', newCode)
    }
    catch(e){
      setErrorMessage(e.message)
    }
  }

  return (
      <View style={styles.container }>
        <Image source={Logo} style={styles.logo}/>
        
        {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}

        <Text style={styles.title}>Enter the code sent to your phone number</Text>
        <CustomInput 
          name='code'
          placeholder={'Code'}
          control={control}
          rules={{}}
        />
        <CustomButton onPress={handleSubmit(confirmingCode)} buttonFunction={'Confirm Phone Number'}/>

        <View style={{marginTop: 20}}>
          <Text>Didn't Receive Message?</Text>
        </View>
        <View style={{width: '50%'}}>
          <CustomButton onPress={resendCode} buttonFunction={'Resend Code'} type='SECONDARY'/>
        </View>

        <View style={{width: '50%'}}>
          <CustomButton onPress={goToRegisterPage} buttonFunction={'Change Number'} type='SECONDARY'/>
        </View>
        
      </View>
    
  )
}
export default ConfirmPhoneNumber

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 2,
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      width: '100%',
      // maxWidth: '600px',
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

