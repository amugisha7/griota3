import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import NewCustomButton from '../../../components/NewCustomButton';
import { API, graphqlOperation } from "aws-amplify";
import { useRoute } from '@react-navigation/native';
import DatePickerComponent from '../../../components/DatePicker';
import CustomNumberInput from '../../../components/CustomNumberInput';

const EditPayment = ({navigation}) => {

  const PHONE_REGEX = /^07\d{8}$/

  const [status, setStatus] = useState('Get Payment Details')
  const [deletingStatus, setDeletingStatus] = useState('DELETE')
  const [done, setDone] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [paymentDate, setPaymentDate] = useState()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [paymentsArray, setPaymentsArray] = useState([])
  const [paymentToEdit, setPaymentToEdit] = useState()
  const [noPaymentsFound, setNoPaymentsFound] = useState()
  const [name, setName] = useState(false)

  const route = useRoute()
  const level = route?.params?.level

  useEffect(()=>{
    done && setTimeout(()=> navigation.navigate('AdminScreen', {level}), 1000)
  },[done])

  useEffect(()=>{
    paymentToEdit && console.log('paymentToEdit::: ', paymentToEdit);
  },[paymentToEdit])

  const getPayment = async()=>{
    setStatus("Please Wait...")
    try {
      const payments = await API.graphql(graphqlOperation(
        `query MyQuery {
          getBoda(id: "${phoneNumber}") {
            firstname
            othername
            loans {
              items {
                payments(filter: {paymentDate: {eq: "${paymentDate}"}}) {
                  items {
                    id
                    paymentAmount
                  }
                }
              }
            }
          }
        }
        `
      ))
      if(payments.data.getBoda.loans.items[0].payments.items.length > 0) {
        setNoPaymentsFound(false)
        setName(`${payments.data.getBoda.firstname} ${payments.data.getBoda.othername}`)
        setPaymentsArray(payments.data.getBoda.loans.items[0].payments.items)
        setStatus('Get Payment Details')
      }else{
        setNoPaymentsFound(true)
        setStatus('Get Payment Details')
      }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }
  
  const deletePayment = async(id) => {
    setDeletingStatus('Deleting...')
    try {
      const deletedPayment = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          deletePayment(input: {id: "${id}"}) {
            id
          }
        }`
        ))
      if(deletedPayment) {
        setDeletingStatus('DELETE')
        setSuccessMessage('PAYMENT DELETED')
        setTimeout(()=>navigation.navigate('AdminScreen', {level}), 3000)
      }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }

  return (
    <ScrollView>
      <View style={{padding: 22}}>
      {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
      {successMessage && <Text style={[griotaStyles.label, 
        {marginVertical: 20, color: 'green'}]}>{successMessage}</Text>}
      <View>
        <Text style={griotaStyles.title}>Edit Payment</Text>
        <CustomNumberInput handleChange={setPhoneNumber} numberOfInputs={10}
            label={`Client's Phone Number`}
          />
          {!PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 && 
          <Text style={griotaStyles.errors}>Invalid Phone Number</Text>}
        <DatePickerComponent setTheDate={setPaymentDate} dateLabel={'Payment Date'}
          dateButtonText={'When was the payment made?'}/>

        <NewCustomButton onPress={getPayment} buttonText={status}
          disabled={!paymentDate || phoneNumber.toString().length !== 10 
            || !PHONE_REGEX.test(phoneNumber) } />
        {noPaymentsFound && <Text style={griotaStyles.label}>NO PAYMENTS FOUND</Text>}
        {paymentsArray.length >0 && 
        <View>
          <Text style={griotaStyles.label}>{`Payments by ${name}`}</Text>
          {paymentsArray.map((payment, i)=>(
          <View key={i} style={{display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 10}}>
            <Text style={griotaStyles.text}>{`${i+1}: Amount Paid: ${payment.paymentAmount.toLocaleString('en-US')}`}</Text>
            <Pressable style={{padding: 10, backgroundColor: 'red'}}
            onPress={()=>{
              deletePayment(payment.id)
              }}>
              <Text style={{color: 'white'}}>{deletingStatus}</Text></Pressable>
          </View>
          ))}
        </View>}
      </View>
      </View>
    </ScrollView>
  )
}

export default EditPayment

const styles = StyleSheet.create({})