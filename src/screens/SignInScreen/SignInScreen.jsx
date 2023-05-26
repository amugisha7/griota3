import { View, Text, Image, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png'
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import {Auth} from 'aws-amplify'; 
import { useRoute } from '@react-navigation/native';
import { griotaStyles } from '../../../assets/styles/style';

const SignInScreen = ({navigation}) => {
  
  const route = useRoute()

  const [loginError, setLoginError] = useState()
  const [accountCreatedMessage, setAccountCreatedMessage] = useState(route?.params?.accountCreatedMessage)
  const [createdUserName, setCreatedUserName] = useState(route?.params?.createdUserName)
  const [status, setStatus] = useState('Sign In')

  useEffect(()=>{
    setAccountCreatedMessage(route?.params?.accountCreatedMessage); 
    setCreatedUserName(route?.params?.createdUserName);
  }, [accountCreatedMessage, createdUserName])

  const { control, handleSubmit} = useForm({
    defaultValues: {
      username: createdUserName ? createdUserName : '',
      password: ''
    }
  });

  const Registering = () => navigation.navigate('Register')

  const ForgotPasswordPressed = () => {navigation.navigate('Forgot Password')}

  const SigningIn = async (data) => {
    setStatus('Signing In...')
    const {username, password} = data
    try { 
      const response = await Auth.signIn(`+256${username.slice(1)}`, password)
      navigation.navigate('FormScreen')
      
    }
    catch(e){
      setLoginError(e.message)
    }
    finally{
      setStatus("Sign In")
    }
    
  }

  const PHONE_REGEX = /^07\d{8}$/

  return (
      <View style={styles.container }>
        <Image source={Logo} style={styles.logo} resizeMode='contain'/>
        
        { loginError && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>ERROR: {loginError}</Text>}
        
        {accountCreatedMessage &&  <Text style={{color: 'green', marginVertical: 20}}>{accountCreatedMessage}</Text>}
        <CustomInput 
          name='username' 
          placeholder='Phone Number (07xxxxxxxx)' 
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
        
        <CustomInput 
          name='password'
          placeholder={'Password'} 
          control={control}
          secureTextEntry
          rules={{
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Too short"
            }
          }}
        />
        <CustomButton onPress={handleSubmit(SigningIn)} buttonFunction={status} />

        <Text style={[styles.link, {marginTop: 20, marginBottom: 20}]} onPress={ForgotPasswordPressed}>Forgot Password</Text>
        <View style={{marginTop: 20}}>
          <Text>Don't yet have an account?</Text>
        </View>
        <View style={{width: '50%'}}>
          <CustomButton onPress={Registering} buttonFunction={'Register'} type='SECONDARY'/>
        </View>
        
      </View>
    
  )
}
export default SignInScreen

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
    },
    logo: {
        width: 100,
        height: 100,
    },
    link: {
      color: 'blue',
    }
    
})

