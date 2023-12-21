import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";
import CustomNumberInput from '../../../components/CustomNumberInput';
import CustomDropDown from '../../../components/CustomDropDown/CustomDropDown';
import { useRoute } from '@react-navigation/native';

const CreateStage = ({navigation}) => {

  const [status, setStatus] = useState('Register New Stage')
  const [message, setMessage] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [viceChairPhoneNumber, setViceChairPhoneNumber] = useState()
  const [divisionsList, setDivisionsList] = useState()
  const [selectedDivision, setSelectedDivision] = useState()

  const route = useRoute()
  const level = route?.params?.level

  const PHONE_REGEX = /^07\d{8}$/

  useEffect(()=>{
    getDivisions()
  },[])
  
  const getDivisions = async() => {
    try {
        const divisions = await API.graphql(graphqlOperation(
        `query MyQuery {
          listDivisions {
            items {
              name
            }
          }
        }`
        ))
        if(divisions) {
            const listOfDivisions = ['Select from list', 
            ...divisions.data.listDivisions.items.map(item => `${item.name}`).sort()]
            // listOfDivisions.unshift('Select from list')
            setDivisionsList(listOfDivisions)
        }
    }
    catch(e)
    {
      console.log('unable to get divisons', e)
    }
  }

  const registerNewStage = async(data)=>{
    const {stageName, stageLocation, chairman, viceChairman} = data
    setStatus('Registering...')
    const str = selectedDivision === 'Kira' 
      ? `address: "${stageLocation}"`
      : `stageGroupStagesId: "${stageLocation}" , address: "${stageLocation}` 
    try {
      const newStage = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          createStage(input: {
            chairmanPhoneNumber: "${phoneNumber}", 
            chairman: "${chairman}", 
            id: "${stageName} (${stageLocation})", 
            name: "${stageName} (${stageLocation})", 
            ${str},
            viceChairman: "${viceChairman}",  
            viceChairmanPhoneNumber: "${viceChairPhoneNumber}", 
          }) {
            name
            address
          }
        }`
      ))
      if(newStage) {
        setMessage(`${newStage.data.createStage.name} (${newStage.data.createStage.address}) Created`)
        setStatus('DONE')
        setTimeout(()=> navigation.navigate('AdminScreen', {level}), 3000)
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
      viceChairman: '',
    }
  });

  return (
      <ScrollView>
          <View style={{padding: 22}}>
            <View>
              <Text style={griotaStyles.title}>Create a Stage</Text>
              <CustomDropDown
                items={divisionsList ? divisionsList : ['list Loading... PLEASE WAIT']}
                setSelectedItem={setSelectedDivision} 
                mylabel={'Select Division'}
              />
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
              <CustomNumberInput handleChange={setPhoneNumber} numberOfInputs={10}
                label={`Stage Chairman's Phone Number:`}
              />
              {!PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 && <Text style={griotaStyles.errors}>Invalid Phone Number</Text>}
              <CustomInput
                name='viceChairman'
                mylabel='What is the Name of the Vice Chairman of the stage?'
                control={control}
                placeholder="Vice Chairman's Name"
                rules={{
                  required: "This field is required",
                }}
              />
              <CustomNumberInput handleChange={setViceChairPhoneNumber} numberOfInputs={10}
                label={`Stage Vice Chairman's Phone Number:`}
              />
              {!PHONE_REGEX.test(viceChairPhoneNumber) && String(viceChairPhoneNumber).length === 10 && <Text style={griotaStyles.errors}>Invalid Phone Number</Text>}
              {!message && selectedDivision && phoneNumber && viceChairPhoneNumber
                && PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 &&
                PHONE_REGEX.test(viceChairPhoneNumber) && String(viceChairPhoneNumber).length === 10 &&
                <CustomButton onPress={handleSubmit(registerNewStage)} buttonFunction={status} />}
              {message && <Text style={griotaStyles.successMessage}>{message}</Text>}
            </View>
          </View>
      </ScrollView>
  )
}

export default CreateStage

const styles = StyleSheet.create({})