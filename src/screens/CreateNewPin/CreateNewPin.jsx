import { View, Text, Image, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";
import { griotaStyles } from '../../../assets/styles/style';
import CustomNumberInput from '../../components/CustomNumberInput';
import NewCustomButton from '../../components/NewCustomButton';

const CreateNewPin = ({navigation}) => {

  const route = useRoute()
  const [errorMessage, setErrorMessage] = useState()
  const [succesMessage, setSuccessMessage] = useState()
  const [status, setStatus] = useState('Register PIN')
  const [ready, setReady] = useState()
  const [code1, setCode1] = useState()
  const [code2, setCode2] = useState()

  const phoneNumber = route?.params?.phoneNumber
  const firstName = route?.params?.firstName
  const otherName = route?.params?.otherName
  const nationalIdNumber = route?.params?.nationalIdNumber
  const selectedStage = route?.params?.selectedStage
  const mobileMoneyName = route?.params?.mobileMoneyName
  const stageIdPicURL = route?.params?.stageIdPicURL
  const nationalIdPicURL = route?.params?.nationalIdPicURL
  const type = 'boda';

  useEffect(()=>{
    SigningIn()
  },[])
  
  const SigningIn = async() => {
    try { 
      const signedInUser = await Auth.signIn(`+256${phoneNumber.slice(1)}`, phoneNumber)
      signedInUser && setReady(signedInUser)
    }
    catch(e){
      console.log('couldnt sign in' ,e )
    }
  }

  const uploadToAmplify = async(password) => {
    try {
      const boda = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          createBoda(input: {
            id: "${phoneNumber}",
            firstname: "${firstName}", 
            othername: "${otherName}", 
            phoneNumber: "${phoneNumber}", 
            picOfStageId: "${stageIdPicURL}", 
            type: "${type}", 
            stageBodasId: "${selectedStage}",
            pin: "${password}",
            mobileMoneyName: "${mobileMoneyName}"
            nationalIdNumber: "${nationalIdNumber}"
            picOfNationalId: "${nationalIdPicURL}"
            points: 700
          }){
            id
          }
        }`
      ))
      if(boda) {
        setSuccessMessage('PIN CHANGE SUCCESSFUL');
        setTimeout(()=>{navigation.navigate('ApplyForLoan', {phoneNumber, password})},1500)
      }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }

  const ChangePin = ()=>{
    setStatus('Please Wait...')
    const password = code1
    Auth.currentAuthenticatedUser()
      .then((user) => {
          return Auth.changePassword(user, phoneNumber, `00${password}`);
      })
      .then(()=>{
        uploadToAmplify(password);
      })
      .catch((e) => {
        setErrorMessage(`ERROR: ${e.message}`)
        setTimeout(()=>setErrorMessage(null), 5000)
      });
  }

  return (
      <ScrollView>
        <View style={styles.container }>
          <Text style={griotaStyles.title}>Create New PIN</Text>
          {!ready && <Text style={griotaStyles.label}>Loading...</Text>}
          {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}> {errorMessage} </Text>}
          {succesMessage &&  <Text style={{color: 'green', marginVertical: 20}}> {succesMessage} </Text>}
          {ready && <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={griotaStyles.label}>You Phone Number has been Verified.</Text>
            <Text style={griotaStyles.label}>Please set a New 4-Digit PIN Code.</Text>
            <View style={{width: 200, alignItems: 'center', marginTop: -60, marginBottom: 20}}>
              <CustomNumberInput handleChange={setCode1} numberOfInputs={4} />
            </View>
            <Text style={griotaStyles.label}>Confirm PIN Code.</Text>
            <View style={{width: 200, alignItems: 'center', marginTop: -60, marginBottom: 40}}>
              <CustomNumberInput handleChange={setCode2} numberOfInputs={4} />
            </View>
            {String(code2).length === 4 && (code1 !== code2)  &&
              <Text style={[griotaStyles.errors, {marginVertical: 20}]}> PINs must be the same! </Text>}
            <NewCustomButton onPress={ChangePin} buttonText={status}
              disabled={status !== 'Register PIN' || code1 !== code2 || String(code1).length !== 4}/>
          </View>}
        </View>
      </ScrollView>
    
  )
}
export default CreateNewPin

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 20,
      width: '100%',
      // maxWidth: '600px',
    },
    logo: {
      width: 100,
      height: 100
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        marginVertical: 5
    },
    link: {
      color: 'blue',
    }
    
})

