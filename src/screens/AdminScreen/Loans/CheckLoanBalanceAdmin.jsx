import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";
import { formatStatement, convertDateFormat, getDateDifferenceInDays, 
  getDaysSinceStart} from '../../../resources/formatStatement';
import { Table, Row, Rows } from 'react-native-reanimated-table';
import NewCustomButton from '../../../components/NewCustomButton';

const CheckLoanBalanceAdmin = ({navigation}) => {

  const route = useRoute()
  const [firstName, setFirstName] = useState()
  const [otherName, setOtherName] = useState()
  const [startDate, setStartDate] = useState()
  const [interestRate, setInterestRate] = useState()
  const [duration, setDuration] = useState()
  const [principal, setPrincipal] = useState()
  const [payments, setPayments] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [dateString, setDateString] = useState()
  const [nextDateString, setNextDateString] = useState()
  const [points, setPoints] = useState()
  const [ifactor, setIfactor] = useState()
  const [cleared, setCleared] = useState('MARK AS CLEARED')
  const [defaulted, setDefaulted] = useState('MARK AS DEFAULTED')
  const [loanId, setLoanId] = useState()
  const [noLoansFound, setNoLoansFound] = useState()

  const phoneNumber = route?.params?.phoneNumber
  const level = route?.params?.level
  
  useEffect(() => {
    interestRate && setIfactor((100 + interestRate)/100)
  }, [interestRate])

  useEffect(() => {
    const currentDateTime = new Date();
    const currentHour = currentDateTime.getHours();

    // Define an array of weekday names
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Check if the current time is past 11 AM
    if (currentHour >= 11) {
      // If it's past 11 AM, set the date string to "Day DD-MMM" of the current day
      const day = currentDateTime.getDate();
      const month = currentDateTime.toLocaleString('default', { month: 'short' });
      const weekday = weekdays[currentDateTime.getDay()];
      const formattedDate = `11am ${weekday} ${day}-${month}`;
      setDateString(formattedDate);
      const nextDay = new Date(currentDateTime)
      nextDay.setDate(currentDateTime.getDate() + 1);
      const nextday = nextDay.getDate();
      const nextmonth = nextDay.toLocaleString('default', { month: 'short' });
      const nextweekday = weekdays[nextDay.getDay()];
      const nextFormattedDate = `11am ${nextweekday} ${nextday}-${nextmonth}`;
      setNextDateString(nextFormattedDate)
    } else {
      // If it's before 11 AM, set the date string to "Day DD-MMM" of the previous day
      const previousDay = new Date(currentDateTime);
      previousDay.setDate(currentDateTime.getDate() - 1);
      const day = previousDay.getDate();
      const month = previousDay.toLocaleString('default', { month: 'short' });
      const weekday = weekdays[previousDay.getDay()];
      const formattedDate = `11am ${weekday} ${day}-${month}`;
      setDateString(formattedDate);
      const nowday = currentDateTime.getDate();
      const nowmonth = currentDateTime.toLocaleString('default', { month: 'short' });
      const nowweekday = weekdays[currentDateTime.getDay()];
      const nowformattedDate = `11am ${nowweekday} ${nowday}-${nowmonth}`;
      setNextDateString(nowformattedDate)
    }
  }, []);

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
            points
            loans (filter: {status: {eq: "active"}}) {
              items {
                startDate
                id
                duration
                principal
                interestRate
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
      if(boda.data.getBoda.loans.items.length >0) {
        console.log('boda::: ', boda);
        setFirstName(boda.data.getBoda.firstname)
        setOtherName(boda.data.getBoda.othername)
        setPoints(boda.data.getBoda.points)
        setStartDate(boda.data.getBoda.loans.items[0].startDate)
        setDuration(boda.data.getBoda.loans.items[0].duration)
        setInterestRate(boda.data.getBoda.loans.items[0].interestRate)
        setPrincipal(boda.data.getBoda.loans.items[0].principal)
        setLoanId(boda.data.getBoda.loans.items[0].id)
        const compliantDate = convertDateFormat(boda.data.getBoda.loans.items[0].startDate)
        setPayments(formatStatement(
          boda.data.getBoda.loans.items[0].payments.items,
          compliantDate.slice(0, -1),
          boda.data.getBoda.loans.items[0].principal,
          boda.data.getBoda.loans.items[0].duration,
          boda.data.getBoda.loans.items[0].interestRate
        ))
          console.log('compliantDate.slice(0, -1)::: ', compliantDate.slice(0, -1));
          console.log('date', new Date(compliantDate.slice(0, -1)));
      }else {
        setNoLoansFound(true)
      }
    } 
    catch(e)
    {
      setErrorMessage('ERROR: Please contact Support')
      console.log('Error getting boda details', e)
    }
  }

  const updateLoan = async(str) =>{
    try {
      const updatedLoan = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          updateLoan(input: {
            id: "${loanId}", 
            status: "${str}"
          }) {
            id
          }
        }`
      ))
      if(updatedLoan) {
        if(str === 'cleared') setCleared('SUCCESS')
        if(str === 'defaulted') setDefaulted('SUCCESS')
        setTimeout(()=> navigation.navigate('LoanStatementAdmin', {level}), 3000)
      }
    } 
    catch(e)
    {
      setErrorMessage('ERROR: Please contact Support')
      setTimeout(()=> navigation.navigate('WelcomeScreen', {level}), 3000)
      console.log('Error updating loan', e)
    }
  }

  const tableHead = ['DATE', 'PAYMENTS', 'BALANCE', 'POINTS']
  const columnSizes = [2,2,2,1.5]

  return (
    <ScrollView>
      <View style={{padding: 22}}>
        {noLoansFound && <Text style={griotaStyles.title}>No Active Loans Found</Text>}
        {!payments ? (!noLoansFound && <Text style={griotaStyles.title}>Loading...</Text>) :
        <View>
          {errorMessage && <Text style={griotaStyles.title}>{errorMessage}</Text>}
          <Text style={griotaStyles.title}>Loan Statement</Text>
          <Text style={{color: 'red'}}>Last updated at: {dateString}</Text>
          <Text style={{color: 'green'}}>Next update: {nextDateString}</Text>
          <Text style={griotaStyles.label}>Borrower Details:</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Name: {firstName} {otherName}. </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left', color: 'blue'}]}>Total Points: {points} </Text>
            <Text style={{marginTop: 5, fontSize: 12}}>{`(You get extra points for every payment made on time)`}</Text>
          </View>
          <Text style={griotaStyles.label}>Loan Details:</Text>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Amount Borrowed: {principal.toLocaleString('en-US')}/- </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Date Borrowed: {startDate} </Text>
          </View>
          <Text style={griotaStyles.label}>Payments Made:</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} flexArr={columnSizes} textStyle={styles.textH}/>
            <Rows data={payments[0]} textStyle={styles.text} flexArr={columnSizes}/>
            <Rows data={payments[2]} textStyle={[styles.text, {color: '#A723A2'}]} flexArr={columnSizes}/>
            <Row data={['TOTAL PAID', payments[1].toLocaleString('en-US'), '', '']} flexArr={columnSizes} textStyle={styles.textH}/>
          </Table>
          <View style={{display: 'flex', flexDirection: 'column', marginBottom: 20, }}>
            <Text style={[griotaStyles.text, {textAlign: 'left', fontWeight: 500}]}>
              Loan Balance: {((principal*ifactor)-payments[1]).toLocaleString('en-US')}/- </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>Days Since Start: {getDaysSinceStart(startDate)} </Text>
            <Text style={[griotaStyles.text, {textAlign: 'left', color: 'green', fontSize: 14}]}>
              Amount that should have been paid so far: {
              Math.round(getDateDifferenceInDays(startDate, duration) *ifactor* principal/duration).toLocaleString('en-US')
              }/- </Text>
            {getDateDifferenceInDays(startDate, duration) > 1 && <Text style={[griotaStyles.text, {textAlign: 'left', color: 'red', fontSize: 14}]}>
              Amount Late: {
              Math.round((getDateDifferenceInDays(startDate, duration) *ifactor* principal/duration)-payments[1]).toLocaleString('en-US')
              }/- </Text>}
          </View>
          {level >1 && <View style={{gap: 40, marginBottom: 40}}>
            {cleared === 'MARK AS CLEARED' ? <NewCustomButton buttonText={cleared} disabled={false}
              onPress={()=>setCleared('CONFIRM CLEAR LOAN')} color="red" />
            : <NewCustomButton buttonText={cleared} disabled={false}
              onPress={()=>updateLoan('cleared')} color="green" />}
            {defaulted === 'MARK AS DEFAULTED'? <NewCustomButton buttonText={defaulted} disabled={false}
              onPress={()=>setDefaulted('CONFIMR DEFAULT')} color="orange" />
            : <NewCustomButton buttonText={defaulted} disabled={false}
              onPress={()=>updateLoan('defaulted')} color="brown" />}
          </View>}
        </View>
        }
      </View>
    </ScrollView>
  ) 
}

export default CheckLoanBalanceAdmin

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: 'black', alignSelf: 'center', fontSize: 13},
  textH: {margin: 6, color: 'blue', alignSelf: 'center', fontWeight: 600, fontSize: 13},
});