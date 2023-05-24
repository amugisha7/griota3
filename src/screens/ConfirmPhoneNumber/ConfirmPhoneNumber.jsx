import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';

const ConfirmPhoneNumber = ({navigation}) => {

  const route = useRoute()
  const createdUserName = route?.params?.username;
  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      username: createdUserName,
      code: '',
    }
  });
  
  const confirmingCode = async (data) => {
    const {code} = data;
    const accountCreatedMessage = 'Your Account was created Successfully. Please log in.'
    try{
      const verifCode = await Auth.confirmSignUp(createdUserName, code);
      console.log(verifCode)
      navigation.navigate('Sign In', {accountCreatedMessage, createdUserName})
    }
    catch(e){
      console.log(e.message)
    }
  }
  const goToRegisterPage = () => {navigation.navigate('Register')}
  
  const resendCode = async () => {
    try{
      await Auth.resendSignUp(createdUserName);
    }
    catch(e){
      console.log(e.message)
    }


  }

  return (
      <View style={styles.container }>
        <Image source={Logo} style={styles.logo}/>
        {/* <View style={{}}>
          <CustomInput
            name='username'
            control={control}
          />
        </View> */}
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

