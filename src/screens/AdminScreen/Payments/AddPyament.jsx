import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";
import RegisterPayment from './RegisterPayment';

const AddPayment = ({navigation}) => {

  const PHONE_REGEX = /^07\d{8}$/
  const [status, setStatus] = useState('Get Boda Info')
  const [firstName, setFirstName] = useState()
  const [otherName, setOtherName] = useState()
  const [stage, setStage] = useState()
  const [stageAddress, setStageAddress] = useState()
  const [mobileMoneyName, setMobileMoneyName] = useState()
  const [loanId, setLoanId] = useState()
  const [done, setDone] = useState()
  const [points, setPoints] = useState()
  const [bodaId, setBodaId] = useState()
  const [startDate, setStartDate] = useState()
  const [duration, setDuration] = useState()

  useEffect(()=>{
    done && setTimeout(()=> navigation.navigate('AdminScreen'), 1000)
  },[done])

  const getBodaDetails = async(data)=>{
    setStatus("Please Wait...")
    const {phoneNumber} = data; 
    try {
      const bodaLoanDetails = await API.graphql(graphqlOperation(
        `query MyQuery {
          getBoda(id: "${phoneNumber}") {
            firstname
            othername
            mobileMoneyName
            points
            stage {
              name
              address
            }
            loans {
              items {
                id
                duration
                startDate
              }
            }
          }
        }`
      ))
      if(bodaLoanDetails) {
        setStatus("Get Boda Info")
        setBodaId(phoneNumber)
        setLoanId(bodaLoanDetails.data.getBoda.loans.items[0].id)
        setStartDate(bodaLoanDetails.data.getBoda.loans.items[0].startDate)
        setDuration(bodaLoanDetails.data.getBoda.loans.items[0].duration)
        setFirstName(bodaLoanDetails.data.getBoda.firstname)
        setOtherName(bodaLoanDetails.data.getBoda.othername)
        setPoints(bodaLoanDetails.data.getBoda.points)
        setStage(bodaLoanDetails.data.getBoda.stage.name)
        setStageAddress(bodaLoanDetails.data.getBoda.stage.address)
        setMobileMoneyName(bodaLoanDetails.data.getBoda.mobileMoneyName ? 
          bodaLoanDetails.data.getBoda.mobileMoneyName : 
          `${bodaLoanDetails.data.getBoda.firstname} ${bodaLoanDetails.data.getBoda.othername}`)
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
          <Text style={griotaStyles.title}>Register a Payment</Text>
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
            firstName && <RegisterPayment
              firstName={firstName} otherName={otherName} loanId={loanId} setDone={setDone}
              stage={stage} stageAddress={stageAddress} mobileMoneyName={mobileMoneyName}
              points={points} bodaId={bodaId} startDate={startDate} duration={duration}/>
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default AddPayment

const styles = StyleSheet.create({})