import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import CustomImageUpload from '../../components/CustomImageUpload/CustomImageUpload'
import CustomInput from '../../components/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown'
import { businessType } from '../../Lists/BusinessTypes'
import { businessLocations } from '../../Lists/BusinessLocations'

import { griotaStyles } from '../../../assets/styles/style'

const FormScreen1 = (
  {
    navigation, selectedBusinessLocation, setSelectedBusinessLocation, 
    selectedBusienssType, setSelectedBusinessType, 
    recieveFormData1
  }) => 
{
    const [count, setCount] = useState(0)
        
    // const [nationalID, setNationalID] = useState(null)
    
    const { control, handleSubmit, watch  } = useForm({
      defaultValues: {
        businessActivity: '',
      }
    });
        
    // const uploadS3 = async()=>{
    //     console.log(userPhoneNumber+'nationalID', nationalID)
    //     console.log(userPhoneNumber+'nextOfKinNationalID', nextOfKinID)
    //     await Storage.put(userPhoneNumber+'nationalIDtest', nationalID)
    //     await Storage.put(userPhoneNumber+'nextOfKinNationalIDtest', nextOfKinID)
    // }

  return (
    <View>
      <View>
        <Text style={griotaStyles.title}>Apply for a Working Capital Loan</Text>
        <Text style={griotaStyles.text}>Please fill out this form completely to apply for a working capital loan.</Text>
        <Text style={griotaStyles.text}>Incomplete or misleading information may lead to your loan application being rejected.</Text>
        <Text style={griotaStyles.text}>Your information will be protected as per our privacy policy. </Text>
      </View>
      <View>
        <CustomDropDown 
          items={businessType} 
          selectedItem={selectedBusienssType}
          setSelectedItem={setSelectedBusinessType} 
          mylabel='What does your businesss do?'
          required
        />
        
        <CustomInput 
            name='businessActivity'
            mylabel='Describe the actual products/services that your business sells to make money'
            placeholder='' 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />

        <CustomDropDown 
          mylabel='Where is your business located?'
          items={businessLocations} 
          setSelectedItem={setSelectedBusinessLocation} 
          required
        />

      </View>
      <CustomButton onPress={handleSubmit(recieveFormData1)} buttonFunction={'Next'}/>   
    </View>
  )
}

export default FormScreen1