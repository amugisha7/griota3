import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomImageUpload from '../../components/CustomImageUpload/CustomImageUpload'
import CustomInput from '../../components/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown'
import { durationInBsuiness } from '../../Lists/DurationInBusiness'

import { griotaStyles } from '../../../assets/styles/style'

const FormScreen3 = (
  {
    receiveFormData3, setDurationInBusiness
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
        <Text style={griotaStyles.title}>More Business Details</Text>
      </View>  
      <View>
        <CustomDropDown 
          items={durationInBsuiness} 
          setSelectedItem={setDurationInBusiness} 
          mylabel={'How long have you been in business?'}
          required
        />
        
        <CustomInput 
            name='salesLastWeek'
            mylabel='How much Total Sales did you make last week? (UGX)'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />
        
        <CustomInput 
            name='salesBeforeLastWeek'
            mylabel='How much Total Sales did you make the week before last week?(UGX) '
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />
        
      </View>
      <CustomButton onPress={handleSubmit(receiveFormData3)} buttonFunction={'Next'}/>   
    </View>
  )
}

export default FormScreen3

