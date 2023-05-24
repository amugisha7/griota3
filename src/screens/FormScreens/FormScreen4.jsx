import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomImageUpload from '../../components/CustomImageUpload/CustomImageUpload'
import CustomInput from '../../components/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown'
import { ageRange } from '../../Lists/Age'

import { griotaStyles } from '../../../assets/styles/style'

const FormScreen4 = (
  {
    receiveFormData4, setAge, setNationalIDFrontPicBlob
  }) => 
{
    const { control, handleSubmit, watch  } = useForm({
      defaultValues: {
        businessActivity: '',
      }
    });
        
  return (
    <View >
      <View>
        <Text style={griotaStyles.title}>Personal Details</Text>
      </View>  
      <View>
        <CustomDropDown 
          items={ageRange} 
          setSelectedItem={setAge} 
          mylabel={'How old are you?'}
          required
        />
        
        <CustomInput 
            name='fullName'
            mylabel='Full Name as shown on National ID:'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />
        
        <CustomInput 
            name='nationalIDNumber'
            mylabel='National ID Number:'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />

        <CustomImageUpload 
            mylabel={'Upload Picture of Front of Your National ID: '} 
            setBlobValue={setNationalIDFrontPicBlob}
        />
        
      </View>
      <CustomButton onPress={handleSubmit(receiveFormData4)} buttonFunction={'Next'}/>   
    </View>
  )
}

export default FormScreen4