import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";
import DatePickerComponent from '../../../components/DatePicker';

const RegisterLoan = ({ firstName, otherName, stage, stageAddress, mobileMoneyName, phoneNumber, setDone }) => {

  const NUMBER_REGEX = /^\d+$/
  const [status, setStatus] = useState('Register New Loan')
  const [loanStartDate, setLoanStartDate] = useState()

  const createLoan = async(loanAmount)=>{
    try {
      const newLoan = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          createLoan(input: {
            bodaLoansId: "${phoneNumber}", 
            principal: ${loanAmount}, 
            startDate: "${loanStartDate}", 
            status: "New", 
            duration: 30
          }) 
          {
            id
          }
        }
        `
      ))
      if(newLoan){
        //create push notification to admin of the application details
        setStatus('Loan Registered Successfully');
        console.log('Loan Details: ', newLoan.data.createLoan.id)
        setDone(newLoan.data.createLoan.id)
      }
    }
    catch(e){
      setErrorMessage(e)
    }
  }

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      loanAmount: '',
    }
  });

  const getLoanDetails = (data)=>{
    setStatus('Registering Loan...');
    const {loanAmount } = data; 
    loanStartDate && createLoan(loanAmount)
  }

  return (
      <View style={{padding: 22}}>
        <View>
          <Text style={griotaStyles.title}>Loan Details</Text>
        </View>
        <View>
          <Text style={griotaStyles.text}>Client Name: {firstName+''+otherName}</Text>
          <Text style={griotaStyles.text}>Mobile Money Name: {mobileMoneyName}</Text>
          <Text style={griotaStyles.text}>Stage Name: {`${stage} (${stageAddress})`}</Text>
          <CustomInput
            name='loanAmount'
            placeholder='100000'
            mylabel='Enter the Amount Being Borrowed'
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: NUMBER_REGEX,
                message: 'numbers only'
              },
            }}
          />
          <DatePickerComponent setTheDate={setLoanStartDate} dateLabel={'Loan Start Date:'}
            dateButtonText={'Change Loan Start Date'}/>
          <CustomButton onPress={handleSubmit(getLoanDetails)} buttonFunction={status} />
        </View>
      </View>
  )
}

export default RegisterLoan

const styles = StyleSheet.create({})