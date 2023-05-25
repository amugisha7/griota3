import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomImageUpload from '../../components/CustomImageUpload/CustomImageUpload'
import CustomInput from '../../components/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown'
import { durations } from '../../Lists/Durations'


import { griotaStyles } from '../../../assets/styles/style'

const FormScreen6 = (
  {
    receiveFormData6, setReferee1KnownPeriod, setRef1NationalIDPic
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
        <Text style={griotaStyles.title}>Referee Details</Text>
        <Text style={griotaStyles.text}>Please provide details of two referees.</Text>
        <Text style={griotaStyles.text}>Each Referee must be someone who is doing business within 30 meters of your business location.</Text>
        <Text style={griotaStyles.text}>The Referee may be your customer or supplier; however the referee must not be your employee. </Text>

      </View>  
        <Text style={griotaStyles.subtitle}>First Referee</Text>
      <View>
                
        <CustomInput 
            name='referee1Name'
            mylabel='Full name of the First Referee?'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />
        
        <CustomInput 
            name='referee1PhoneNumber'
            mylabel='Phone Number of First Referee '
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />

        <CustomDropDown 
          items={durations} 
          setSelectedItem={setReferee1KnownPeriod} 
          mylabel={'How long has this Referee known you?'}
          required
        />

        <CustomInput 
            name='NINofReferee1'
            mylabel='National ID Number of First Referee'
            placeholder={''} 
            control={control}
            rules={{
              required: "This field is required",
            }}
        />

        <CustomImageUpload 
            mylabel={'Upload Picture of the Front of the National ID of your first Referee'} 
            setBlobValue={setRef1NationalIDPic}
        />


      </View>
      <CustomButton onPress={handleSubmit(receiveFormData6)} buttonFunction={'Next'}/>   
    </View>
  )
}

export default FormScreen6

