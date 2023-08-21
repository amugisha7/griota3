import { View, Text, Image, StyleSheet, Linking, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png'
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import {Auth, Notifications} from 'aws-amplify'; 
import { useRoute } from '@react-navigation/native';
import { griotaStyles } from '../../../assets/styles/style';
import { adminUsers } from '../../Lists/adminUsers';
import {checkPermissions} from '../../resources/requestPermissions'
import DeepLinking from 'react-native-deep-linking';

const SignInThenBalance = ({navigation}) => {
  
  const route = useRoute()
// // SETTING UP A ROUTE FOR NOTIFICATIONS: 
  DeepLinking.addRoute('/admin', (response) => {
    navigation.navigate("AdminScreen");
  });
  DeepLinking.addRoute('/register', (response) => {
    navigation.navigate("Register");
  });
  // evaluate every incoming URL
  const handleOpenURL = (event) => {
    DeepLinking.evaluateUrl(event.url);
  }
  // manage Linking event listener with useEffect
  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  const [loginError, setLoginError] = useState()
  const [status, setStatus] = useState('Sign In')

  useEffect(()=>{setLoginError(null)},[])

  useEffect(()=>{
    checkPermissions()
  },[])

  const { control, handleSubmit} = useForm({
    defaultValues: {
      password: '',
      username: ''
    }
  });

  const SigningIn = async (data) => {
    setStatus('Signing In...')
    const {username, password} = data
    const phoneNumber = username; 
    const pin = password; 
    try { 
      const user = await Auth.signIn(`+256${username.slice(1)}`, `00${password}`)
      user.attributes.phone_number === adminUsers.Admin1.PhoneNumber
      ? navigation.navigate('AdminScreen')
      : navigation.navigate('CheckLoanBalance', {phoneNumber, pin})
    }
    catch(e){
      setLoginError('Error. Please contact support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)    
    }
    finally{
      setStatus("Sign In")
    }
    
  }

  const PHONE_REGEX = /^07\d{8}$/
  const PIN_REGEX = /\b\d{4}\b/;

  return (
      <ScrollView>
        <View style={styles.container }>
          <Text style={griotaStyles.title}>Sign In to Check Loan Balance</Text>
        
          { loginError && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{loginError}</Text>}
        
          {/* {accountCreatedMessage &&  <Text style={{color: 'green', marginVertical: 20}}>{accountCreatedMessage}</Text>} */}
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
            placeholder={'PIN Code'}
            secureTextEntry={true}
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Too short"
              },
              maxLength: {
                value: 4,
                message: "Only 4 digits allowed"
              },
              pattern: {
                value: PIN_REGEX,
                message: 'Must be 4-digit Number'
              },
            }}
          />
          <CustomButton onPress={handleSubmit(SigningIn)} buttonFunction={status} />
          {/* <Text style={[styles.link, {marginTop: 20, marginBottom: 20}]} onPress={ForgotPasswordPressed}>Forgot Password</Text> */}
        
          <View style={{width: '50%', marginTop: 30}}>
            <CustomButton onPress={()=>navigation.navigate("WelcomeScreen")} buttonFunction={'Go Back'} type='SECONDARY'/>
          </View>
        
        </View>
      </ScrollView>
    
  )
}
export default SignInThenBalance

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 22
    },
    logo: {
        width: 100,
        height: 100,
    },
    link: {
      color: 'blue',
    }
    
})
