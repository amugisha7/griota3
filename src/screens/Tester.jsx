import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput/CustomInput'
import { griotaStyles } from '../../../assets/styles/style';
import CustomDropDown from '../components/CustomDropDown/CustomDropDown';
import { useForm } from 'react-hook-form';
import CustomButton from '../components/CustomButton/CustomButton'
import CustomImageUpload from '../components/CustomImageUpload/CustomImageUpload'
import { Auth, API, Storage } from 'aws-amplify';
import { createLoanApplication } from '../graphql/mutations';

// import { S3Image } from 'aws-amplify-react-native'



const Tester = () => {

  const [name, setName] = useState(null)
  const [profilePicBlob, setProfilePicBlob] = useState(null)
  const [imageExtension, setImageExtension] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState()
  const [imageKey, setImageKey] = useState(null)

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

  

  const recieveFormData1 = async (data) =>{
    setName(data.userName)
    try{
      await Storage.remove(`${phoneNumber}ProfilePic.${imageExtension}`);
      const res = await Storage.put(`${phoneNumber}ProfilePic.${imageExtension}`, profilePicBlob)
      console.log('the key is ', res.key)
      console.log('username is ', data.userName)

      const newLoanApplication = await API.graphql({
        query: createLoanApplication,
        variables: {
          input: {
            "name": "Andrew Mugisha",
            "profilepic": "the profile pic"
          }
        }
      });
      console.log('new loan app ', newLoanApplication)
    } 
    catch(e) {
      console.log(e)
    }
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
        setImageExtension={setImageExtension}
      />

    <CustomButton onPress={handleSubmit(recieveFormData1)} buttonFunction={'Submit'}/>   



    </View>
  )
}

export default Tester