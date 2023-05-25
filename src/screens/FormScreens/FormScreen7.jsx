import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomImageUpload from '../../components/CustomImageUpload/CustomImageUpload'
import CustomInput from '../../components/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown'
import { durations } from '../../Lists/Durations'


import { griotaStyles } from '../../../assets/styles/style'

const FormScreen7 = (
  {
    receiveFormData7, setReferee2KnownPeriod, setRef2NationalIDPic
  }) => 
{
    const { control, handleSubmit, watch  } = useForm({
      defaultValues: {
        businessActivity: '',
      }
    });
        
  return (
    <View >
       
        <Text style={griotaStyles.subtitle}>Second Referee</Text>
      <View>
                
        <CustomInput 
            name='referee2Name'
            mylabel='Full name of the Second Referee?'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />
        
        <CustomInput 
            name='referee2PhoneNumber'
            mylabel='Phone Number of Second Referee '
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />

        <CustomDropDown 
          items={durations} 
          setSelectedItem={setReferee2KnownPeriod} 
          mylabel={'How long has this Referee known you?'}
          required
        />

        <CustomInput 
            name='NINofReferee2'
            mylabel='National ID Number of Second Referee'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />

        <CustomImageUpload 
            mylabel={'Upload Picture of the Front of the National ID of your Second Referee'} 
            setBlobValue={setRef2NationalIDPic}
        />


      </View>
      <CustomButton onPress={handleSubmit(receiveFormData7)} buttonFunction={'Next'}/>   
    </View>
  )
}

export default FormScreen7

