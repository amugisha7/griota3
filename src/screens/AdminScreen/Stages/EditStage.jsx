import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";
import { Table, Row, Rows } from 'react-native-reanimated-table';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomNumberInput from '../../../components/CustomNumberInput';

const EditStage = ({navigation}) => { 

  const route = useRoute()
  const [errorMessage, setErrorMessage] = useState()
  const [stageDetails, setStageDetails] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [viceChairPhoneNumber, setViceChairPhoneNumber] = useState()
  const [status, setStatus] = useState('CONFIRM UPDATE')

  const selectedStage = route?.params?.selectedStage
  const level = route?.params?.level
  
  useEffect(()=>{
    getStageDetails()
  },[])

  const PHONE_REGEX = /^07\d{8}$/

  const getStageDetails = async()=>{
    try {
      const stage = await API.graphql(graphqlOperation(
        `query MyQuery {
          getStage(id: "${selectedStage}") {
            chairman
            chairmanPhoneNumber
            viceChairman
            viceChairmanPhoneNumber
          }
        }`
      ))
      if(stage) {
        const obj = stage.data.getStage
        let arr = []
        let i = 0;
        let keys = ['Chairman', 'Chairman Phone', 'Vice Chairman', 'ViceChair Phone']
        for(const key in obj) {
          arr.push([keys[i], obj[key]])
          i=i+1
        }
        setStageDetails(arr);
        console.log('arr::: ', arr);
      }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }

  const updateStage = async(data)=>{
    const {chairman, viceChairman} = data
    setStatus('Updating...')

    try {
      const updatedStage = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          updateStage(input: {
            id: "${selectedStage}", 
            chairman: "${chairman}", 
            chairmanPhoneNumber: "${phoneNumber}", 
            viceChairman: "${viceChairman}", 
            viceChairmanPhoneNumber: "${viceChairPhoneNumber}", 
          }) {
            id
          }
        }
        `
      ))
      if(updatedStage) {
        console.log('updatedStage::: ', updatedStage);
        setStatus('SUCCESS')
        setTimeout(()=> navigation.navigate('AdminScreen', {level}), 3000)
      }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }


  const returnToWelcome = ()=> {
    navigation.navigate("AdminScreen/SelectStageToEdit", {level})
  }

  const { control, handleSubmit} = useForm({
    defaultValues: {
      chairman: '',
      viceChairman: '',
    }
  });

  return (
    <ScrollView>
      <View style={{padding: 22}}>
        {errorMessage && <Text style={griotaStyles.title}>{errorMessage}</Text>}
        {!stageDetails ? <Text style={griotaStyles.title}>Loading...</Text> :
        <View>
          <Text style={griotaStyles.title}>Edit {selectedStage}</Text>
          <Text style={griotaStyles.label}>Stage Details:</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Rows data={stageDetails} textStyle={styles.text} />
          </Table>
          <Text style={griotaStyles.label}>New Details:</Text>
          <CustomInput
                name='chairman'
                mylabel={`Update Chairman's Name`}
                control={control}
                placeholder="Chairman's Name"
                rules={{
                  required: "This field is required",
                }}
              />
              <CustomNumberInput handleChange={setPhoneNumber} numberOfInputs={10}
                label={`Update Chairman's Phone Number:`}
              />
              {!PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 && <Text style={griotaStyles.errors}>Invalid Phone Number</Text>}
              <CustomInput
                name='viceChairman'
                mylabel={`Update Vice-chairman's Name`}
                control={control}
                placeholder="Vice Chairman's Name"
                rules={{
                  required: "This field is required",
                }}
              />
              <CustomNumberInput handleChange={setViceChairPhoneNumber} numberOfInputs={10}
                label={`Update Vice Chairman's Phone Number:`}
              />
              {!PHONE_REGEX.test(viceChairPhoneNumber) && String(viceChairPhoneNumber).length === 10 && <Text style={griotaStyles.errors}>Invalid Phone Number</Text>}
              {phoneNumber && viceChairPhoneNumber
              && PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 &&
              PHONE_REGEX.test(viceChairPhoneNumber) && String(viceChairPhoneNumber).length === 10 
              &&<CustomButton onPress={handleSubmit(updateStage)} buttonFunction={status} />}
          <View style={{marginTop: 25}}>
              <CustomButton onPress={returnToWelcome} buttonFunction={"Exit"} />
              
          </View>
        </View>
        }
      </View>
    </ScrollView>
  )
}

export default EditStage

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: 'black', alignSelf: 'center' },
  textH: {margin: 6, color: 'blue', alignSelf: 'center', fontWeight: 600 }
});