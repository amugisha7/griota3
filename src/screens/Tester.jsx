import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput/CustomInput'
import { griotaStyles } from '../../../assets/styles/style';
import CustomDropDown from '../components/CustomDropDown/CustomDropDown';
import { useForm } from 'react-hook-form';
import CustomButton from '../components/CustomButton/CustomButton'


const Tester = () => {

  const [selection, setSelection] = useState(null)

  const { control, handleSubmit} = useForm({
    defaultValues: {
      businessName: ''
    }
  });

  const recieveFormData1 = (data) =>{
    console.log('business name is ', data.businessName)
    console.log('selected number is ', selection)
  }

  return (
    <View style={{padding: 20, backgroundColor: 'yellow', flex: 1}}>
      <Text>What is your business name? </Text>
      <CustomInput 
        name='businessName' 
        placeholder='Enter Your Business Name' 
        control={control}
      />
      <CustomDropDown 
        items={['one', 'two', 'three', 'four', 'five']}
        mylabel='Select a number'
        setSelectedItem={setSelection}
      />

    <CustomButton onPress={handleSubmit(recieveFormData1)} buttonFunction={'Submit'}/>   


    </View>
  )
}

export default Tester