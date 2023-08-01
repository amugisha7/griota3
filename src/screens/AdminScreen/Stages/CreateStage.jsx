import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";

const CreateStage = ({navigation}) => {

  const [status, setStatus] = useState('Register New Stage')
  const [message, setMessage] = useState()

  const PHONE_REGEX = /^07\d{8}$/

  const registerNewStage = async(data)=>{
    const {stageName, stageLocation, chairman, phoneNumber} = data
    setStatus('Registering')
    try {
      const newStage = await API.graphql(graphqlOperation(
        `mutation MyMutation2 {
            createStage(input: {
                address: "${stageLocation}", 
                chairman: "${chairman}", 
                chairmanPhoneNumber: "${phoneNumber}", 
                name: "${stageName} (${stageLocation})"
                id: "${stageName} (${stageLocation})"
            }) {
              name
              address
            }
          }`
      ))
      if(newStage) {
        setMessage(`${newStage.data.createStage.name} (${newStage.data.createStage.address}) Created`)
        setStatus('DONE')
        setTimeout(()=> navigation.navigate('AdminScreen'), 3000)
      }
    }
    catch(e)
    {
      console.log('unable to create stage ', e)
    }
  }

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      stageName: '',
      stageLocation: '',
      chairman: '',
      phoneNumber: '',
    }
  });

  return (
      <ScrollView>
          <View style={{padding: 22}}>
            <View>
              <Text style={griotaStyles.title}>Create a Stage</Text>
              <CustomInput
                name='stageName'
                mylabel='What is the name of the Stage'
                control={control}
                placeholder='Stage Name'
                rules={{
                  required: "This field is required",
                }}
              />
              <CustomInput
                name='stageLocation'
                mylabel='In which area is this stage located?'
                control={control}
                placeholder='Stage Location'
                rules={{
                  required: "This field is required",
                }}
              />
              <CustomInput
                name='chairman'
                mylabel='What is the Name of the Chairman of the stage?'
                control={control}
                placeholder="Chairman's Name"
                rules={{
                  required: "This field is required",
                }}
              />
              <CustomInput
                name='phoneNumber'
                placeholder='Phone Number (07xxxxxxxx)'
                mylabel='Enter the Phone Number of the Chairman of the Stage'
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: PHONE_REGEX,
                    message: 'Invalid Phone Number (use format 07xxxxxxxx)'
                  },
                }}
                type={'tel'}
              />
              {!message && <CustomButton onPress={handleSubmit(registerNewStage)} buttonFunction={status} />}
              {message && <Text style={griotaStyles.successMessage}>{message}</Text>}
            </View>
          </View>
      </ScrollView>
  )
}

export default CreateStage

const styles = StyleSheet.create({})