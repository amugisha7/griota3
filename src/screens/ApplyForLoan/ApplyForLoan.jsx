import { StyleSheet, Text, View, ScrollView, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../assets/styles/style';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";
import LoanOfferCard from '../../components/LoanOfferCard';

const ApplyForLoan = ({navigation}) => {

  const route = useRoute()
  const [firstName, setFirstName] = useState()
  const [otherName, setOtherName] = useState()
  const [stage, setStage] = useState()
  const [nationalIdPic, setNationalIdPic] = useState()
  const [points, setPoints] = useState(0)
  const [loanOffers, setLoanOffers] = useState()
  const [loanAmount, setLoanAmount] = useState()
  const [instalment, setInstalment] = useState()
  const [loanDuration, setLoanDuration] = useState()
  const [commitments, setCommitments] = useState()

  BackHandler.addEventListener('hardwareBackPress', ()=> {
    navigation.navigate('WelcomeScreen')
  });

  const phoneNumber = route?.params?.phoneNumber

  useEffect(()=>{
    getBodaDetails()
    //remove next line
    // getLoanOffers()
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
            picOfNationalId
            points
          }
        }`
      ))
      if(boda) {
        setFirstName(boda.data.getBoda.firstname)
        setOtherName(boda.data.getBoda.othername)
        setStage(boda.data.getBoda.stage.name)
        setNationalIdPic(boda.data.getBoda.picOfNationalId)
        setPoints(boda.data.getBoda.points)
        getLoanOffers()
      }
    }
    catch(e)
    {
      console.log('unable to retrieve boda details ', e)
    }
  }
  const getLoanOffers = async()=>{
    try {
      const savedLoanOffers = await API.graphql(graphqlOperation(
        `query MyQuery {
          listLoanOffers {
            items {
              instalment
              loanAmount
              loanDurationDays
            }
          }
        }`
      ))
      if(savedLoanOffers) {
        setLoanOffers(savedLoanOffers.data.listLoanOffers.items);
        getCommitments()
        //remove the following line
        // points === undefined && setPoints(700)
      }
    }
    catch(e)
    {
      console.log('unable to get loan offers ', e)
    }
  }

  const getCommitments = async()=> {
    try {
      const commitmentArray = await API.graphql(graphqlOperation(
        `query MyQuery {
          listCommitments {
            items {
              statement
            }
          }
        }`
      ))
      if(commitmentArray) {
        setCommitments(commitmentArray.data.listCommitments.items);        
      }
    }
    catch(e)
    {
      console.log('unable to get commitments ', e)
    }
  }

  const applyForLoan = () => {
    navigation.navigate('ConfirmApplication', {loanAmount, loanDuration, commitments, 
      instalment, firstName, otherName, stage, nationalIdPic, phoneNumber});
  }

  return (
    <ScrollView>
      <View style={{padding: 22, paddingBottom: 60}}>
        {!commitments ? <Text style={griotaStyles.title}>Loading...</Text> :
        <View>
          <Text style={griotaStyles.title}>Select a Loan</Text>
          <Text style={[griotaStyles.label, {color: 'green', alignSelf: 'center'}]}> 
            {`Hi ${firstName}, you have ${points.toLocaleString('en-US')} Points.`}
          </Text>
      {/*Loan Offers*/}
          {loanOffers.map((offer, i)=> {return (
              <View key={i} style={{display: 'flex'}}>
                <LoanOfferCard amount={offer.loanAmount} duration={offer.loanDurationDays}
                  disabled={offer.loanAmount/100 > points} instalment={offer.instalment}
                  pointsNeeded={offer.loanAmount/100} applyForLoan={applyForLoan}
                  selected={loanAmount === offer.loanAmount} 
                  onPress={()=>{
                    setLoanAmount(offer.loanAmount)
                    setLoanDuration(offer.loanDurationDays)
                    setInstalment(offer.instalment)
                  }}
                />
              </View>
          )})}
      {/*how to get more points*/}
          <View style={{display: 'flex', flexDirection: 'column', marginVertical: 10}}>
            <Text style={[griotaStyles.label, {textAlign: 'left'}]}>
              How to get more Points: </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>
             - Pay your loan on time to get more points. </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>
             - Late payments lead to loss of points. </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>
             - Paying on time gives you bonus points. </Text>
          </View>

        </View> }
      </View>
    </ScrollView>
  )
}

export default ApplyForLoan

const styles = StyleSheet.create({})