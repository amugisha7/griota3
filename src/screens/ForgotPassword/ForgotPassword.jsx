import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { griotaStyles } from '../../../assets/styles/style';

const ForgotPassword = ({navigation}) => {

  const [error, setError] = useState()
  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      phoneNumber: ''
    }
  });
  
  const CodeRequested = async (data) => {
    const {phoneNumber} = data
    try {
      await Auth.forgotPassword(`+256${phoneNumber.slice(1)}`)
      navigation.navigate('ResetPassword', {phoneNumber})

    }
    catch(e){
      setError(e.message)
    }
  }

  const Cancel = ()=>{navigation.navigate('Sign In')}

  const PHONE_REGEX = /^07\d{8}$/

  return (
      <View style={styles.container }>
        <Image source={Logo} style={styles.logo}/>
        { error && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>ERROR: {error}</Text>}

        <Text style={styles.title}>Enter your Phone Number
          <Text style={{fontSize: 14, color: 'blue'}}>
            A code to reset your password will be sent to you by SMS</Text>
        </Text>
        <CustomInput 
          name='phoneNumber' 
          placeholder='Phone Number 07xxxxxxxx' 
          control={control}
          rules={{
            required: "This field is required", 
            pattern: {
              value: PHONE_REGEX,
              message: 'Invalid Phone Number (use format 07xxxxxxxx)'
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

