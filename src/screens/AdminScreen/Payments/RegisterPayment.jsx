import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import NewCustomButton from '../../../components/NewCustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";
import DatePickerComponent from '../../../components/DatePicker';
import { convertDateFormat } from '../../../resources/formatStatement';

const RegisterPayment = ({ firstName, otherName, stage, stageAddress, 
  points, mobileMoneyName, setDone, loanId, bodaId, startDate, duration }) => {

  const NUMBER_REGEX = /^\d+$/
  const [status, setStatus] = useState('Register Payment')
  const [paymentDate, setPaymentDate] = useState()
  const [paymentReceived, setPaymentReceived] = useState()
  const [paymentInTime, setPaymentInTime] = useState()
  const [plainDate, setPlainDate] = useState()

  //date checking for points award. 
  const endDate = new Date(convertDateFormat(startDate).slice(0, -1))
  endDate.setDate(endDate.getDate() + duration + 1);

  const checkDateForPoints = ()=>{
    const date = new Date(plainDate)
    setPaymentInTime(date < endDate)
  }
  
  useEffect(()=>{
    plainDate && checkDateForPoints()
  },[plainDate])

  useEffect(()=>{
    setPaymentReceived(false)
  },[loanId])

  const updatePoints = async(paymentAmount)=>{
    const newPoints = points + (paymentAmount / 100)
    try {
      const pointsUpdated = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          updateBoda(input: {
            id: "${bodaId}", 
            points: ${newPoints}
          }) {
            points
          }
        }`
      ))
      if(pointsUpdated) {
        //create push notification to admin of the application details
        setPaymentReceived(true)
        setStatus("Point Updated")
        setTimeout(()=>setStatus("Register Another Payment"), 2000)
      }
    }
    catch(e){
      console.log("Error updating points", e)
      setStatus("POINTS UPDATE FAILED")
      setTimeout(()=>setStatus("Register Another Payment"), 2000)
    }
  }

  const makePayment = async(paymentAmount)=>{
    try {
      const newPayment = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          createPayment(input: {
            paymentDate: "${paymentDate}", 
            paymentAmount: ${paymentAmount}, 
            loanPaymentsId: "${loanId}"}) 
          {
            id
          }
        }`
      ))
      if(newPayment){
        //create push notification to admin of the application details
        setStatus("Updating Points...")
        if(paymentInTime) {
          updatePoints(paymentAmount)
        }else{
          updatePoints(paymentAmount/10)
        }
      }
    }
    catch(e){
      console.log("Error making payment", e)
      setStatus("PAYMENT FAILED")
    }
  }

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      paymentAmount: '',
    }
  });

  const registerPaymentAmount = (data)=>{
    setStatus('Registering Payment...');
    const {paymentAmount } = data; 
    makePayment(paymentAmount)
  }

  return (
      <View style={{padding: 22}}>
        {paymentReceived && 
        <Text style={{color: '#007700', marginBottom: 20}}>
          Payment by {firstName+" "+otherName} Successful</Text>}
        <View>
          <Text style={griotaStyles.title}>Payment Details</Text>
        </View>
        <View>
          <Text style={griotaStyles.text}>Client Name: {firstName+' '+otherName}</Text>
          <Text style={griotaStyles.text}>Mobile Money Name: {mobileMoneyName}</Text>
          <Text style={griotaStyles.text}>Stage Name: {`${stage} (${stageAddress})`}</Text>
          <CustomInput
            name='paymentAmount'
            placeholder='4000'
            mylabel='Enter the Amount to Pay'
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: NUMBER_REGEX,
                message: 'numbers only'
              },
            }}
          />
          <DatePickerComponent setTheDate={setPaymentDate} dateLabel={'Payment Date'}
            dateButtonText={'Select Payment Date'} setPlainDate={setPlainDate}/>
          <NewCustomButton onPress={handleSubmit(registerPaymentAmount)} buttonText={status} disabled={!plainDate} />
          {status === "Register Another Payment" && <Text 
            onPress={()=>setDone('done')} 
            style={{marginVertical: 10, color: 'red'}}>Exit</Text>}
        </View>
      </View>
  )
}

export default RegisterPayment

const styles = StyleSheet.create({})