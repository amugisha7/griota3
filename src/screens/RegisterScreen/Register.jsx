import { View, Text, Image, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown';
import CustomImageUpload from "../../components/CustomImageUpload/CustomImageUpload";
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import {Auth} from 'aws-amplify'; 
import { griotaStyles } from '../../../assets/styles/style';
import { registeredStages } from '../../Lists/registeredStages';

const Register = ({navigation}) => {

  const [errorMessage, setErrorMessage] = useState()
  const [selectedStage, setSelectedStage] = useState()
  const [stageIdCardPicBlob, setStageIdCardPicBlob] = useState()

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      phoneNumber: '',
      firstName: '',
      otherName: '',
      stageId: ''
    }
  });

  const PHONE_REGEX = /^07\d{8}$/

  const goToPrivacyPolicy =()=>{
    Alert.alert(
      'Privacy',
      'Please visit our website www.griota.com to read our privacy policy'
    )
  }

  const goToTermsOfUse =()=>{
    Alert.alert(
      'Terms of Use',
      'Please visit our website www.griota.com to read our privacy policy'
    )
  }

  const goToSignIn = () => {navigation.navigate('SignIn')}

  const registerUser = async (data) => {
    const {phoneNumber, firstName, otherName, stageId} = data;
    // create user in GraphQL and save stageId to cloudinary. 
    try{
      await Auth.signUp(`+256${phoneNumber.slice(1)}`, phoneNumber)
      navigation.navigate('ConfirmPhoneNumber', {phoneNumber})
    } 
    catch(e){
      setErrorMessage(e.message);
    }
  }

  return (
      <ScrollView>
        <View style={styles.container }>
          <Image source={Logo} style={styles.logo}/>
          <Text style={styles.title}>Create an Account</Text>
          {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
          <CustomInput
            name='phoneNumber'
            placeholder='Phone Number (07xxxxxxxx)'
            mylabel='Enter the Phone Number you will use to receive loans and make payment'
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
          <CustomDropDown
              items={registeredStages}
              setSelectedItem={setSelectedStage} 
              mylabel={'Select Your Stage'}
            />
            <CustomInput
              name='firstName'
              mylabel='Enter your first name'
              control={control}
              placeholder=''
              rules={{
                required: "This field is required",
              }}
            />
            <CustomInput
              name='otherName'
              mylabel='Enter your other names'
              control={control}
              placeholder=''
              rules={{
                required: "This field is required",
              }}
            />
            <CustomInput
              name='stageId'
              mylabel='Enter your Stage ID as shown on your stage card'
              control={control}
              placeholder=''
              rules={{
                required: "This field is required",
              }}
            />
            <CustomImageUpload
                mylabel={'Upload picture of your Stage Card'}
                setBlobValue={setStageIdCardPicBlob}/>
          {selectedStage === 'Select from list' ?
            <Text style={[griotaStyles.errors, {marginVertical: 20}]}>Please select a stage to proceed</Text> : 
            <CustomButton onPress={handleSubmit(registerUser)} buttonFunction={'Register'}/>}
          <Text style={{fontSize: 12}}>By registering you accept the{' '}
            <Text style={styles.link} onPress={goToTermsOfUse}>Terms of Use{' '}</Text>and {' '}
            <Text style={styles.link} onPress={goToPrivacyPolicy}>Privacy Policy</Text>
          </Text>
          <View style={{marginTop: 20}}>
            <Text>Already have an account?</Text>
          </View>
          <View style={{width: '50%'}}>
            <CustomButton onPress={goToSignIn} buttonFunction={'Sign In'} type='SECONDARY'/>
          </View>
        
        </View>
      </ScrollView>
    
  )
}
export default Register

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

