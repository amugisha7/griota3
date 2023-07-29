import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";

const RegisterPayment = ({ firstName, otherName, stage, stageAddress, mobileMoneyName }) => {

  const NUMBER_REGEX = /^\d+$/
  const [status, setStatus] = useState('Register Payment')
  const [bodaLoanStatement, setBodaLoanStatement] = useState()

  const makePayment = async(paymentAmount)=>{
    try {
      const paymentThenStatement = await API.graphql(graphqlOperation(
        ``
      ))
      if(paymentThenStatement){
        //create push notification to admin of the application details
        console.log('Boda statement: ', paymentThenStatement)
        setBodaLoanStatement(paymentThenStatement)
      }
    }
    catch(e){
      setErrorMessage(e)
    }
  }

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      paymentAmount: '',
    }
  });

  const registerPaymentAmount = (data)=>{
    setStatus('Retrieving Loan Details');
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
          <CustomButton onPress={handleSubmit(registerPaymentAmount)} buttonFunction={status} />
        </View>
      </View>
  )
}

export default RegisterPayment

const styles = StyleSheet.create({})