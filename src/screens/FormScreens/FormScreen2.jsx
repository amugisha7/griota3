import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomImageUpload from '../../components/CustomImageUpload/CustomImageUpload'
import CustomButton from '../../components/CustomButton/CustomButton'
import { griotaStyles } from '../../../assets/styles/style'

const FormScreen2 = (
  {
    navigation, userPhoneNumber, 
    setBusinessAreaPicBlob, setOutsideOfBusinessPicBlob, 
    setOwnerInBusinessPicBlob, recieveFormData2
  }) => 
{
    // const uploadS3 = async()=>{
    //     console.log(userPhoneNumber+'nationalID', nationalID)
    //     console.log(userPhoneNumber+'nextOfKinNationalID', nextOfKinID)
    //     await Storage.put(userPhoneNumber+'nationalIDtest', nationalID)
    //     await Storage.put(userPhoneNumber+'nextOfKinNationalIDtest', nextOfKinID)
    // }

  return (
    <View >
      <View >
        <Text style={griotaStyles.title}>More Business Details</Text>
      </View>
      <View>

        <CustomImageUpload 
            mylabel={'Upload picture of your business area'} 
            setBlobValue={setBusinessAreaPicBlob}/>

        <CustomImageUpload 
            mylabel={'Upload picture of you in your business'} 
            setBlobValue={setOwnerInBusinessPicBlob}/>

        <CustomImageUpload 
            mylabel={'Upload picture of the outside of your business'} 
            setBlobValue={setOutsideOfBusinessPicBlob}/>

      </View>
      <CustomButton onPress={recieveFormData2} buttonFunction={'Next'}/>   
    </View>
  )
}

export default FormScreen2

