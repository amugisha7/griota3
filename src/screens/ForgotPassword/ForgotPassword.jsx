import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';


const ForgotPassword = ({navigation}) => {

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      phoneNumber: ''
    }
  });
  
  const CodeRequested = (data) => {
    console.log(data)
    navigation.navigate('Confirm Phone Number')
  }

  const Cancel = ()=>{navigation.navigate('Sign In')}

  const PHONE_REGEX = /^0\d{9}/

  return (
      <View style={styles.container }>
        <Image source={Logo} style={styles.logo}/>
        <Text style={styles.title}>Enter your Phone Number
          <Text style={{fontSize: 14, color: 'blue'}}>
            A code to reset your password will be sent to you by SMS</Text>
        </Text>
        <CustomInput 
          name='phoneNumber' 
          placeholder='Phone Number (+256712345678)' 
          control={control}
          rules={{
            required: "This field is required", 
            pattern: {
              value: PHONE_REGEX,
              message: 'Invalid Phone Number (use format +256712345678)'
            },
          }}
          type={'tel'}
        />
        <CustomButton onPress={handleSubmit(CodeRequested)} buttonFunction={'Request Code'}/>
        
        <View style={{width: '50%'}}>
          <CustomButton onPress={Cancel} buttonFunction={'Cancel'} type='SECONDARY'/>
        </View>
        
      </View>
    
  )
}
export default ForgotPassword

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
        
        fontSize: 20,
        fontWeight: 600,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginVertical: 20,   
    },
    link: {
      color: 'blue',
    }
    
})

