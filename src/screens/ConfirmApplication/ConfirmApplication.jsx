//class imports
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox';
import { Image } from 'react-native';
import { API, graphqlOperation } from "aws-amplify";

//component imports
import { griotaStyles } from '../../../assets/styles/style'
import NavButton from '../../components/NavButton';
import { ScrollView } from 'react-native';

//MAIN FUNCTION
const ConfirmApplication = ({navigation}) => {
    
//constants
    const route = useRoute()
    const {loanAmount, loanDuration, instalment, firstName, otherName, 
      stage, nationalIdPic, commitments, phoneNumber} = route?.params
    const backButtonColor = '#00A9FF'
    const today = new Date()
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + loanDuration +1 );
    const totalPayment = instalment * loanDuration
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    
//states
    const [status, setStatus] = useState('APPLY')
    const[paymentCommitment, setPaymentCommitment] = useState(false)
    const[durationCommitment, setDurationCommitment] = useState(false)
    const[arrayCheck, setArrayCheck] = useState() 
    const[errorMessage, setErrorMessage] = useState() 

    useEffect(()=>{
      const arr = []
      for(let i=0; i<commitments.length; i++) {
        arr.push(false)
      }
      setArrayCheck(arr)      
    },[])
    
//functions
    const submitApplication = async() => {
        setStatus('Please wait...')
        try {
          const application = await API.graphql(graphqlOperation(
            `mutation MyMutation2 {
              createApplication(input: {
                status: "newApp", 
                bodaApplicationsId: "${phoneNumber}",
                loanAmount: ${loanAmount},
                loanInstalment: ${instalment},
                loanDurationDays: ${loanDuration},
              }) {
                createdAt
              }
            }`
          )) 
          if(application){
            setStatus('APPLY')
            navigation.navigate('ApplicationReceived', {firstName, otherName, loanAmount})
            //create push notification to admin of the application details
            console.log('Application Made', application)
          }
        }
        catch(e){
          setErrorMessage(`ERROR: ${e.message}`)
          setTimeout(()=>setErrorMessage(null), 5000)
        }
    }
    
  return (
    <ScrollView>
      <View style={[griotaStyles.container, {padding: 22}]}>
          <Text style={griotaStyles.title}>Loan Application</Text>
          <Image source={{uri: nationalIdPic}}
              style={{width: 300, height: 300, alignSelf: 'center'}}
              resizeMode='contain'/>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
              <Text style={[griotaStyles.label, {textAlign: 'center'}]}>
                My name is {firstName} {otherName}. </Text>
              <Text style={[griotaStyles.label, {textAlign: 'center', marginTop: -3}]}>
                I ride a Boda-Boda at {stage} </Text>
              <Text style={[griotaStyles.label, {textAlign: 'center', marginTop: -3}]}>
                I hereby apply for a Loan of UGX {loanAmount.toLocaleString('en-US')} </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <CheckBox
                disabled={false}
                value={paymentCommitment}
                onValueChange={(newValue) => setPaymentCommitment(newValue)}
            />
            <Text style={[styles.text]}>
              {`I commit to pay back ${instalment.toLocaleString('en-US')} per day for the next ${loanDuration} days.`} 
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <CheckBox
                disabled={false}
                value={durationCommitment}
                onValueChange={(newValue) => setDurationCommitment(newValue)}
            />
            <Text style={[styles.text]}>
              I will pay back a total of {totalPayment.toLocaleString('en-US')} before {dueDate.toLocaleDateString('en-UK', options)}. 
            </Text>
          </View> 
      {/* commitments */}
          {arrayCheck && commitments.map((commitment, ind)=>{
            return(
              <View key={ind} style={{display: 'flex', flexDirection: 'row', marginBottom: 10}} >
                <CheckBox
                    disabled={false}
                    value={arrayCheck[ind]}
                    onValueChange={(newValue) => {
                      const newState = [...arrayCheck]
                      newState[ind] = newValue
                      setArrayCheck(newState)
                    }}
                />
                <Text style={[styles.text]}>
                  {commitment.statement} </Text>
              </View>
            )
          })}
      {/*navigation buttions*/}
          <View style={styles.navContainer}>
              <NavButton buttonText={'BACK'}  buttonChange={()=> navigation.navigate('ApplyForLoan')}
              buttonColor={backButtonColor} buttonDisabled={false}
              />
              <NavButton buttonText={status}  buttonChange={submitApplication}
              buttonColor={!paymentCommitment || !durationCommitment || 
                !arrayCheck.every((e)=> e) || status === 'Please wait...' ? 'grey' : 'blue'}
              buttonDisabled={!paymentCommitment || !durationCommitment ||
                status === 'Please wait...' || !arrayCheck.every((e)=> e)
                  ? true : false}
              />
          </View>
          {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
      </View>
    </ScrollView>
  )
}

export default ConfirmApplication

const styles = StyleSheet.create({
    navContainer: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', 
        width: '100%', marginVertical: 40
      },
    text: {
        lineHeight: 24,
        fontSize: 16,
        color: 'black',
        marginTop: 5,
        textAlign: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        marginHorizontal: 10,
    }
})