import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";
import RegisterLoan from './RegisterLoan';

const CreateLoan = ({navigation}) => {

  const PHONE_REGEX = /^07\d{8}$/
  const [status, setStatus] = useState('Get Boda Info')
  const [firstName, setFirstName] = useState()
  const [otherName, setOtherName] = useState()
  const [stage, setStage] = useState()
  const [stageAddress, setStageAddress] = useState()
  const [mobileMoneyName, setMobileMoneyName] = useState()
  const [bodaPhoneNumber, setBodaPhoneNumber] = useState()
  const [done, setDone] = useState()

  useEffect(()=>{
   done && setTimeout(()=> navigation.navigate('AdminScreen'), 3000)
  },[done])

  const getBodaDetails = async(data)=>{
    setStatus("Please Wait...")
    const {phoneNumber} = data; 
    setBodaPhoneNumber(phoneNumber)
    try {
      const boda = await API.graphql(graphqlOperation(
        `query MyQuery {
          getBoda(id: "${phoneNumber}") {
            firstname
            stage {
              name
              address
            }
            othername
            mobileMoneyName
          }
        }`
      ))
      if(boda) {
        setStatus("Get Boda Info")
        setFirstName(boda.data.getBoda.firstname)
        setOtherName(boda.data.getBoda.othername)
        setStage(boda.data.getBoda.stage.name)
        setStageAddress(boda.data.getBoda.stage.address)
        setMobileMoneyName(boda.data.getBoda.mobileMoneyName ? 
          boda.data.getBoda.mobileMoneyName : 
          `${boda.data.getBoda.firstname} ${boda.data.getBoda.othername}`)
      }
    }
    catch(e)
    {
      console.log('unable to retrieve boda details ', e)
    }
  }

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      phoneNumber: '',
    }
  });

  return (
    <ScrollView>
      <View style={{padding: 22}}>
        <View>
          <Text style={griotaStyles.title}>Register a New Loan</Text>
          <CustomInput
            name='phoneNumber'
            placeholder='Phone Number (07xxxxxxxx)'
            mylabel='Enter the Phone Number of the Client'
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
          <CustomButton onPress={handleSubmit(getBodaDetails)} buttonFunction={status} />
          {
            firstName && <RegisterLoan 
              firstName={firstName} otherName={otherName} phoneNumber={bodaPhoneNumber}
              stage={stage} stageAddress={stageAddress} mobileMoneyName={mobileMoneyName} setDone={setDone}/>
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateLoan

const styles = StyleSheet.create({})