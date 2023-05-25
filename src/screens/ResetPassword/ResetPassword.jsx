import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { griotaStyles } from '../../../assets/styles/style';

const ResetPassword = ({navigation}) => {

  const [error, setError] = useState()
  const route = useRoute()
  const [createdUserName, setCreatedUserName] = useState(route?.params?.phoneNumber)
  
  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      username: createdUserName,
      code: '',
    }
  });
  
  const confirmingCode = async (data) => {
    const {code, password} = data;
    const accountCreatedMessage = 'Password changed successfully. Please log in.'
    
    try{
      const verifCode = await Auth.forgotPasswordSubmit(`+256${createdUserName.slice(1)}`, code, password);
      console.log('user verified')
      navigation.navigate('Sign In', {accountCreatedMessage, createdUserName})
    }
    catch(e){
      console.log(e.message)
    }
  }
  const goToForgotPassword = () => {navigation.navigate('Forgot Password')}
  
  const resendCode = async () => {
    try{
      await Auth.resendSignUp(`+256${createdUserName.slice(1)}`);
    }
    catch(e){
      setError(e.message)
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
        { error && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>ERROR: {error}</Text>}

        <Text style={styles.title}>Enter the code sent to your phone number</Text>
        <CustomInput 
          name='code'
          placeholder={'Code'}
          control={control}
          rules={{}}
        />

        <Text style={styles.title}>Create a New Password</Text>
        <CustomInput 
          name='password'
          placeholder={'Password'} 
          control={control}
          secureTextEntry={true}
          rules={{
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Too short",
            } 
          }}
        />

        <CustomButton onPress={handleSubmit(confirmingCode)} buttonFunction={'Confirm Phone Number'}/>

        <View style={{marginTop: 20}}>
          <Text>Didn't Receive Message?</Text>
        </View>
        <View style={{width: '50%'}}>
          <CustomButton onPress={resendCode} buttonFunction={'Resend Code'} type='SECONDARY'/>
        </View>

        <View style={{width: '50%'}}>
          <CustomButton onPress={goToForgotPassword} buttonFunction={'Change Number'} type='SECONDARY'/>
        </View>
        
      </View>
    
  )
}
export default ResetPassword

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

