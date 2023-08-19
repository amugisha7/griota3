import { StyleSheet, Text, View, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react';
// import { griotaStyles } from '../../../../assets/styles/style';
// import CustomButton from '../../../components/CustomButton/CustomButton';
// import { useForm } from 'react-hook-form';
// import CustomInput from '../../../components/CustomInput/CustomInput';
// import { API, graphqlOperation } from "aws-amplify";
// import RegisterPayment from './RegisterPayment';
// import DatePickerComponent from '../../../components/DatePicker';

const SelectApplicationDate = ({navigation}) => {

  // const PHONE_REGEX = /^07\d{8}$/
  // const [applicaitonDate, setApplicationDate] = useState()
  // const [status, setStatus] = useState('View Applications')
  // const [applicaitonsList, setApplicaitonsList] = useState()
  // const [firstName, setFirstName] = useState()
  // const [otherName, setOtherName] = useState()
  // const [stage, setStage] = useState()
  // const [stageAddress, setStageAddress] = useState()
  // const [mobileMoneyName, setMobileMoneyName] = useState()
  // const [loanId, setLoanId] = useState()
  // const [done, setDone] = useState()

  // const getApplications = async(data)=>{
  //   setStatus("Please Wait...")
  //   const {phoneNumber} = data; 
  //   try {
  //     const applications = await API.graphql(graphqlOperation(
  //       `query MyQuery {
  //         listApplications(filter: {date: {eq: ""}}) {
  //           items {
  //             createdAt
  //             boda {
  //               firstname
  //               othername
  //               phoneNumber
  //               picOfStageId
  //               stage {
  //                 name
  //               }
  //             }
  //           }
  //         }
  //       }`
  //     ))
  //     if(applications) {
  //       setStatus("Get Boda Info")
  //       setApplicaitonsList(applications)
  //       // setLoanId(bodaLoanDetails.data.getBoda.loans.items[0].id)
  //       // setFirstName(bodaLoanDetails.data.getBoda.firstname)
  //       // setOtherName(bodaLoanDetails.data.getBoda.othername)
  //       // setStage(bodaLoanDetails.data.getBoda.stage.name)
  //       // setStageAddress(bodaLoanDetails.data.getBoda.stage.address)
  //       // setMobileMoneyName(bodaLoanDetails.data.getBoda.mobileMoneyName ? 
  //       //   bodaLoanDetails.data.getBoda.mobileMoneyName : 
  //       //   `${bodaLoanDetails.data.getBoda.firstname} ${bodaLoanDetails.data.getBoda.othername}`)
  //     }
  //   }
  //   catch(e)
  //   {
  //     console.log('unable to retrieve boda details ', e)
  //   }
  // }

  // const { control, handleSubmit, watch  } = useForm({
  //   defaultValues: {
  //     phoneNumber: '',
  //   }
  // });

  // return (
  //   <ScrollView>
  //     <View style={{padding: 22}}>
  //       <View>
  //         <Text style={griotaStyles.title}>View Applications</Text>
  //         <DatePickerComponent setTheDate={setApplicationDate} dateLabel={'Application Date'} 
  //           dateButtonText="Select Date to View Applications"/>
  //         {applicaitonDate && <CustomButton onPress={getApplications} buttonFunction={status} />}
  //         {
  //           applicaitonsList && <RegisterPayment
  //             firstName={firstName} otherName={otherName} loanId={loanId} setDone={setDone}
  //             stage={stage} stageAddress={stageAddress} mobileMoneyName={mobileMoneyName}/>
  //         }
  //       </View>
  //     </View>
  //   </ScrollView>
  // )
}

export default SelectApplicationDate

const styles = StyleSheet.create({})