import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../assets/styles/style';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput/CustomInput'
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";

const ApplyForLoan = ({navigation}) => {

  const route = useRoute()
  const[stageSecurity, setStageSecurity] = useState(false)
  const[application, setApplication] = useState(false)
  const[paymentCommitment, setPaymentCommitment] = useState(false)
  const [status, setStatus] = useState('Submit Application')
  const [errorMessage, setErrorMessage] = useState()
  const [firstName, setFirstName] = useState()
  const [otherName, setOtherName] = useState()
  const [stage, setStage] = useState()
  const [idNumber, setIdNumber] = useState()
  const [pinCodeTest, setPinCodeTest] = useState()
  const [amplifyPin, setAmplifyPin] = useState()
  const PIN_REGEX = /\b\d{4}\b/;

  const phoneNumber = route?.params?.phoneNumber
  const pin = route?.params?.password
  
  useEffect(()=>{
    console.log(phoneNumber)
    getBodaDetails()
  },[])

  const getBodaDetails = async()=>{
    try {
      const boda = await API.graphql(graphqlOperation(
        `query MyQuery {
          getBoda(id: "${phoneNumber}") {
            firstname
            stage {
              name
            }
            othername
            idNumber
            pin
          }
        }`
      ))
      if(boda) {
        setFirstName(boda.data.getBoda.firstname)
        setOtherName(boda.data.getBoda.othername)
        setStage(boda.data.getBoda.stage.name)
        setIdNumber(boda.data.getBoda.idNumber)
        setAmplifyPin(boda.data.getBoda.pin)
      }
    }
    catch(e)
    {
      console.log('unable to retrieve boda details ', e)
    }
  }

  const { control, handleSubmit, reset} = useForm({
    defaultValues: {
      pinCode: '',
    }
  });

  const registerApplication = async()=>{
    try {
      const application = await API.graphql(graphqlOperation(
        `mutation MyMutation2 {
          createApplication(input: {status: "new", bodaApplicationsId: "${phoneNumber}"}) {
            createdAt
            boda {
              id
            }
          }
        }`
      ))
      if(application){
        //create push notification to admin of the application details
        console.log('Application Made', application)
      }
    }
    catch(e){
      setErrorMessage('ERROR: Please contact Support')
      setTimeout(()=> navigation.navigate('SignIn'), 3000)
    }
  }

  const SubmitApplication = (data)=>{
    setStatus('Submitting');
    const {pinCode } = data; 
    setPinCodeTest(pinCode)
    if (pinCode === pin || pinCode === amplifyPin){
        registerApplication()
        .then(()=>navigation.navigate('ApplicationReceived'))
        .then(()=>setStatus('Submit Application'))
    }else{
      setStatus('Submit')
      reset({pinCode: ''})
    }
  }

  return (
    <ScrollView>
      <View style={{padding: 22}}>
        {!firstName ? <Text style={griotaStyles.title}>Loading...</Text> :
        <View>
          <Text style={griotaStyles.title}>Apply for a Loan</Text>
          <Text style={griotaStyles.label}>Application</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>My name is {firstName} {otherName}. </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>I ride a Boda-Boda at stage {stage} </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>My Stage ID number is: {idNumber}. </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <CheckBox
                disabled={false}
                value={application}
                onValueChange={(newValue) => setApplication(newValue)}
            />
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}> I hereby Apply for a Loan of UGX 100,000</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <CheckBox
                disabled={false}
                value={paymentCommitment}
                onValueChange={(newValue) => setPaymentCommitment(newValue)}
            />
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>I commit to pay back 4,000 per day for the next 30 days.</Text>
          </View>
          <View style={{display: 'flex',  flexDirection: 'row', marginBottom: 10}}>
            <CheckBox
                disabled={false}
                value={stageSecurity}
                onValueChange={(newValue) => setStageSecurity(newValue)}
            />
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>I agree that my stage position may be sold to clear the loan if I fail to pay. </Text>
          </View>
          {(stageSecurity && application && paymentCommitment) && <View>
              <CustomInput
                  name='pinCode'
                  placeholder={'PIN Code'}
                  secureTextEntry={true}
                  control={control}
                  mylabel="Enter Your PIN Code"
                  rules={{
                    required: "PIN Code required",
                    minLength: {
                      value: 4,
                      message: "Too short"
                    },
                    maxLength: {
                      value: 4,
                      message: "Only 4 digits allowed"
                    },
                    pattern: {
                      value: PIN_REGEX,
                      message: 'Must be 4-digit Number'
                    },
                  }}
                />
              <CustomButton onPress={handleSubmit(SubmitApplication)} buttonFunction={status} />
              {errorMessage &&
                <Text style={griotaStyles.errors}>{errorMessage}</Text>}
          </View>}
        </View>
            }
      </View>
    </ScrollView>
  )
}

export default ApplyForLoan

const styles = StyleSheet.create({})