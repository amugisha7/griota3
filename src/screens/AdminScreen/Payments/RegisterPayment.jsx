import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";
import DatePickerComponent from '../../../components/DatePicker';

const RegisterPayment = ({ firstName, otherName, stage, stageAddress, mobileMoneyName, setDone, loanId }) => {

  const NUMBER_REGEX = /^\d+$/
  const [status, setStatus] = useState('Register Payment')
  const [paymentDate, setPaymentDate] = useState()

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
        setStatus("Payment Successful!")
        setTimeout(()=>setStatus("Register Another Payment"), 2000)
        console.log('Payment Details: ', newPayment)
        // setDone(newPayment)
      }
    }
    catch(e){
      console.log("Error making payment", e)
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
        <View>
          <Text style={griotaStyles.title}>Payment Details</Text>
        </View>
        <View>
          <Text style={griotaStyles.text}>Client Name: {firstName+''+otherName}</Text>
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
            dateButtonText={'Change Payment Date'}/>
          <CustomButton onPress={handleSubmit(registerPaymentAmount)} buttonFunction={status} />
          {status === "Register Another Payment" && <Text 
            onPress={()=>setDone('done')} 
            style={{marginVertical: 10, color: 'red'}}>Exit</Text>}
        </View>
      </View>
  )
}

export default RegisterPayment

const styles = StyleSheet.create({})