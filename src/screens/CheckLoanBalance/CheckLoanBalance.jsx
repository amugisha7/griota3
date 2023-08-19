import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../assets/styles/style';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";
import { formatStatement, convertDateFormat, getDateDifferenceInDays, getDaysSinceStart } from '../../resources/formatStatement';
import { Table, Row, Rows } from 'react-native-reanimated-table';

const CheckLoanBalance = ({navigation}) => {

  const route = useRoute()
  const [firstName, setFirstName] = useState()
  const [otherName, setOtherName] = useState()
  const [stage, setStage] = useState()
  const [startDate, setStartDate] = useState()
  const [principal, setPrincipal] = useState()
  const [payments, setPayments] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const phoneNumber = route?.params?.phoneNumber
  
  useEffect(()=>{
    getBodaDetails()
  },[])

  const getBodaDetails = async()=>{
    try {
      const boda = await API.graphql(graphqlOperation(
        `query MyQuery {
          getBoda(id: "${phoneNumber}") {
            firstname
            othername
            stage {
              name
            }
            loans {
              items {
                startDate
                principal
                payments {
                  items {
                    paymentAmount
                    paymentDate
                  }
                }
              }
            }
          }
        }`
      ))
      if(boda) {
        setFirstName(boda.data.getBoda.firstname)
        setOtherName(boda.data.getBoda.othername)
        setStage(boda.data.getBoda.stage.name)
        setStartDate(boda.data.getBoda.loans.items[0].startDate)
        setPrincipal(boda.data.getBoda.loans.items[0].principal)
        const compliantDate = convertDateFormat(boda.data.getBoda.loans.items[0].startDate)
        setPayments(formatStatement(
          boda.data.getBoda.loans.items[0].payments.items,
          compliantDate.slice(0, -1),
          boda.data.getBoda.loans.items[0].principal
        ))
      }
    }
    catch(e)
    {
      setErrorMessage('ERROR: Please contact Support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)
      console.log('Error getting boda details', e)
    }
  }

  const returnToWelcome = ()=> {
    navigation.navigate("WelcomeScreen")
  }

  const tableHead = ['DATE', 'PAYMENTS', 'BALANCE']

  return (
    <ScrollView>
      <View style={{padding: 22}}>
        {!payments ? <Text style={griotaStyles.title}>Loading...</Text> :
        <View>
          {errorMessage && <Text style={griotaStyles.title}>{errorMessage}</Text>}
          <Text style={griotaStyles.title}>Loan Statement</Text>
          <Text style={griotaStyles.label}>Borrower Details:</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Name: {firstName} {otherName}. </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Phone Number: {phoneNumber} </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Stage: {stage} </Text>
          </View>
          <Text style={griotaStyles.label}>Loan Details:</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Amount Borrowed: {principal}/- </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Date Borrowed: {startDate} </Text>
          </View>
          <Text style={griotaStyles.label}>Payments Made:</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.textH}/>
            <Rows data={payments[0]} textStyle={styles.text}/>
            <Row data={['TOTAL PAID', payments[1], '']} textStyle={styles.textH}/>
          </Table>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 20, }}>
            <Text style={[griotaStyles.text, {textAlign: 'left', fontWeight: 500}]}>
              Loan Balance: {(principal*1.2)-payments[1]}/- </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Days Since Start: {getDaysSinceStart(startDate)} </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left', color: 'green', fontSize: 14}]}>
              Amount that should have been paid so far: {
              Math.round(getDateDifferenceInDays(startDate) *1.2* principal/30)
              }/- </Text>
            {getDateDifferenceInDays(startDate) > 1 && <Text style={[griotaStyles.text, {textAlign: 'left', color: 'red', fontSize: 14}]}>
              Amount Late: {
              Math.round((getDateDifferenceInDays(startDate) *1.2* principal/30)-payments[1])
              }/- </Text>}
          </View>
          <CustomButton onPress={returnToWelcome} buttonFunction={"Close Statement"} />
        </View>
        }
      </View>
    </ScrollView>
  ) 
}

export default CheckLoanBalance

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: 'black', alignSelf: 'center' },
  textH: {margin: 6, color: 'blue', alignSelf: 'center', fontWeight: 600 }
});