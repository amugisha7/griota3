import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomImageUpload from '../../components/CustomImageUpload/CustomImageUpload'
import CustomInput from '../../components/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown'

import { griotaStyles } from '../../../assets/styles/style'

const FormScreen5 = (
  {
    receiveFormData5
  }) => 
{
    const { control, handleSubmit, watch  } = useForm({
      defaultValues: {
        businessActivity: '',
      }
    });
        
  return (
    <View >
      <View >
        <Text style={griotaStyles.title}>Next of Kin</Text>
      </View>  
      <View>
                
        <CustomInput 
            name='nextOfKinName'
            mylabel='What is the full name of your next of kin?'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />
        
        <CustomInput 
            name='nextOfKinRelationship'
            mylabel='What is your relationship with the next of kin?'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />

        <CustomInput 
            name='nextOfKinPhoneNumber'
            mylabel='What is the phone number of the next of kin?'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />

      </View>
      <CustomButton onPress={handleSubmit(receiveFormData5)} buttonFunction={'Next'}/>   
    </View>
  )
}

export default FormScreen5

