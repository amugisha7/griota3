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

  const [loginError, setLoginError] = useState(null)
  const [accountCreatedMessage, setAccountCreatedMessage] = useState(null)
  const [createdUserName, setCreatedUserName] = useState(null)

  useEffect(()=>{
    setAccountCreatedMessage(route?.params?.accountCreatedMessage); 
    setCreatedUserName(route?.params?.createdUserName);
  }, accountCreatedMessage)

  const { control, handleSubmit} = useForm({
    defaultValues: {
      username: createdUserName ? createdUserName : '',
      password: ''
    }
  });

  const Registering = () => navigation.navigate('Register')

  const ForgotPasswordPressed = () => {navigation.navigate('Forgot Password')}

  const SigningIn = async (data) => {
    try { 
      const response = await Auth.signIn(data.username, data.password)
      
      navigation.navigate('Tester')
    }
    catch (err) {
      err && setLoginError(err)
    }
    
  }

  const PHONE_REGEX = /^0\d{9}/

  return (
      <View style={styles.container }>
        <Image source={Logo} style={styles.logo} resizeMode='contain'/>
        

        {accountCreatedMessage &&  <Text>{accountCreatedMessage}</Text>}
        <CustomInput 
          name='username' 
          placeholder='Phone Number (+256712345678)' 
          control={control}
          // rules={{
          //   required: "This field is required", 
          //   pattern: {
          //     value: PHONE_REGEX,
          //     message: 'Invalid Phone Number (use format 0712345678)'
          //   },
          // }}
          // type={'tel'}
        />
        
        <CustomInput 
          name='password'
          placeholder={'Password'} 
          control={control}
          secureTextEntry={true}
          rules={{
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Too short"
            }
          }}
        />
        <CustomButton onPress={handleSubmit(SigningIn)} buttonFunction={'Sign In'}/>

        {/* <Text style={[styles.link, {marginTop: 20, marginBottom: 20}]} onPress={ForgotPasswordPressed}>Forgot Password</Text> */}
        <View style={{marginTop: 20}}>
          <Text>Don't yet have an account?</Text>
        </View>
        <View style={{width: '50%'}}>
          <CustomButton onPress={Registering} buttonFunction={'Register'} type='SECONDARY'/>
        </View>
        <View>
          { loginError && <Text style={griotaStyles.errors}>Login Failed </Text>}
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

