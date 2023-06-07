import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput/CustomInput'
import { griotaStyles } from '../../../assets/styles/style';
import CustomDropDown from '../components/CustomDropDown/CustomDropDown';
import { useForm } from 'react-hook-form';
import CustomButton from '../components/CustomButton/CustomButton'
import CustomImageUpload from '../components/CustomImageUpload/CustomImageUpload'
import { Amplify, Auth, API } from 'aws-amplify';
import { createLoanApplication } from '../graphql/mutations';
import 'react-native-url-polyfill/auto'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const Tester = () => {

  const [name, setName] = useState(null)
  const [profilePicBlob, setProfilePicBlob] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState()

  useEffect(()=>{
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        setPhoneNumber(user.attributes.phone_number)
      })
      .catch((err) => console.log(err));
  },[])

  const { control, handleSubmit} = useForm({
    defaultValues: {
      userName: ''
    }
  });
  const showOnconsole = () => console.log("Profile pic url: ", profilePicBlob)

  const uploadOneToCloudinary =(file, setBlob)=>{

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
        setBlob(data.secure_url)
      })
      .catch(e =>console.log('cloudinary error: ', e))
  }

  const recieveFormData1 = async (data) =>{
    setName(data.userName)
    uploadOneToCloudinary(profilePicBlob, setProfilePicBlob)
  }

  return (
    <View style={{padding: 20, backgroundColor: 'yellow', flex: 1}}>
      <Text>What is your name? </Text>
      <CustomInput 
        name='userName' 
        placeholder='Enter Your Name' 
        control={control}
      />
      <CustomImageUpload 
        mylabel={'Upload profile Picture'} 
        setBlobValue={setProfilePicBlob}
      />

    <CustomButton onPress={handleSubmit(recieveFormData1)} buttonFunction={'Submit'}/>   

    <Pressable onPress={showOnconsole}>
      <Text>Show url on console</Text>
    </Pressable>

    </View>
  )
}

export default Tester