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
  const [stageIdCardPicFile, setStageIdCardPicFile] = useState()
  const [idPicURL, setIdPicURL] =useState()

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      phoneNumber: '',
      firstName: '',
      otherName: '',
      idNumber: ''
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
  
  const uploadOneToCloudinary = async (file)=>{
    const formData = new FormData();
    let base64Img = `data:image/jpg;base64,${file.assets[0].base64}`
    formData.append("upload_preset", "lagiua2k")
    formData.append("file", base64Img);
    fetch('https://api.cloudinary.com/v1_1/djtx8rz4q/upload', {
      body: formData,
      method: "POST", 
    })
    .then(async r => {
      let data = await r.json()
      console.log('cloudinary resp: ', data.secure_url)
      setIdPicURL(data.secure_url)
    })
    .catch(e =>console.log('cloudinary error: ', e))
  }

  const registerUser = async(phoneNumber) =>{
    try{
      const {user} = await Auth.signUp(`+256${phoneNumber.slice(1)}`, phoneNumber)
    } 
    catch(e){
      console.log('unable to sign up ', e);
    }
  }
  
  const createBoda = async (data) => {
    const {phoneNumber, firstName, otherName, idNumber} = data;
    uploadOneToCloudinary(stageIdCardPicFile)
    .then(()=>registerUser(phoneNumber))
    .then(()=>navigation.navigate('ConfirmPhoneNumber', {
      phoneNumber, firstName, otherName, selectedStage, idNumber, idPicURL
    }))
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
              //Bulindo is equal to 01Bulindo in Amplify
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
              name='idNumber'
              mylabel='Enter your Stage ID as shown on your stage card'
              control={control}
              placeholder=''
              rules={{
                required: "This field is required",
              }}
            />
            <CustomImageUpload
                mylabel={'Upload picture of your Stage Card'}
                setBlobValue={setStageIdCardPicFile}/>
          {selectedStage === 'Select from list' ?
            <Text style={[griotaStyles.errors, {marginVertical: 20}]}>Please select a stage to proceed</Text> : 
            <CustomButton onPress={handleSubmit(createBoda)} buttonFunction={'Register'}/>}
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

