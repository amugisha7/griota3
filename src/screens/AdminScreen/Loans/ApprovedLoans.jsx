//class imports
import { StyleSheet, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from "aws-amplify";
import { griotaStyles } from '../../../../assets/styles/style';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { SendDirectSms } from 'react-native-send-direct-sms';
import Clipboard from '@react-native-clipboard/clipboard';
import { useRoute } from '@react-navigation/native';

//component imports
import LoanCreationCard from '../../../components/LoanCreationCard';
import RadioButtons from '../../../components/RadioButtons';
import { dateFormat } from '../../../resources/dateFormat';

const ApprovedLoans = () => {
    
    //enable filtering
    const filterObj = {} 
    const pointsObj ={}
    const route = useRoute()
    const level = route?.params?.level
  
    //states
    const [applicants, setApplicants] = useState()
    const [applicationId, setApplicationId] = useState()
    const [smsStatus, setSmsStatus] = useState('SEND SMS')
    const [createLoanStatus, setCreateLoanStatus] = useState('CREATE LOAN')
    const [mtnStatus, setMtnStatus] = useState('SEND MTN')
    const [airtelStatus, setAirtelStatus] = useState('SEND AIRTEL')
    const [filter, setFilter] = useState(filterObj)
    const [stagesArray, setStagesArray] = useState()
    const [filteredStage, setFilteredStage] = useState('All')
    const [phoneNumber, setPhoneNumber] = useState()
    const [loanAmount, setLoanAmount] = useState()
    const [duration, setDuration] = useState()
    const [startDate, setStartDate] = useState()
    const [points, setPoints] = useState()
    const [errorMessage, setErrorMessage] = useState()

    //constants
    const options = {year: '2-digit', month: 'short', day: '2-digit', hour: 'numeric',
        minute: 'numeric', hour12: true, timeZone: 'Africa/Nairobi'} 

    //useEffects
    useEffect(() => {
        getApplications()
    },[]); 

   //functions 
    const getApplications = async() => {
        try {
            const applications = await API.graphql(graphqlOperation(
              `query MyQuery {
                listApplications(filter: {status: {eq: "approved"}}) {
                  items {
                    updatedAt
                    id
                    loanAmount
                    loanDurationDays
                    loanInstalment
                    boda {
                      firstname
                      id
                      points
                      mobileMoneyName
                      othername
                      stage {
                        name
                      }
                    }
                  }
                }
              }`
            ))
            if(applications) {
              for(let i=0; i<applications.data.listApplications.items.length; i++) {
                if(!filterObj[applications.data.listApplications.items[i].id]){
                  filterObj[applications.data.listApplications.items[i].id] = 
                  applications.data.listApplications.items[i].id
                }
              }
              setFilter(filterObj)
              setApplicants(applications.data.listApplications.items); 
              //recording points
              for(let i=0; i<applications.data.listApplications.items.length; i++) {
                if(!pointsObj[applications.data.listApplications.items[i].boda.id]){
                  pointsObj[applications.data.listApplications.items[i].boda.id] = 
                  applications.data.listApplications.items[i].boda.points
                }
              }
              setPoints(pointsObj)
              console.log('pointsObj::: ', pointsObj);
              const stageList = {}
              for(let i = 0; i < applications.data.listApplications.items.length; i++) {
                if(!stageList[applications.data.listApplications.items[i].boda.stage.name]){
                  stageList[applications.data.listApplications.items[i].boda.stage.name] = 
                  applications.data.listApplications.items[i].boda.stage.name
                }
              }
              const arr = ['All', ...Object.values(stageList)]
              setStagesArray(arr)
            }
          }
          catch(e)
          {
            setErrorMessage(`ERROR: ${e.message}`)
            setTimeout(()=>setErrorMessage(null), 5000)
          }
    }

    const createLoan = async()=>{
      setCreateLoanStatus('PROCESSING...')
      console.log('phoneNumber::: ', typeof(phoneNumber));
      console.log('duration::: ', typeof(duration));
      console.log('loanAmount::: ', typeof(loanAmount));
      console.log('startDate::: ', typeof(startDate));
      try {
        const newLoan = await API.graphql(graphqlOperation(
          `mutation MyMutation {
            createLoan(input: {
              bodaLoansId: "${phoneNumber}", 
              duration: ${duration}, 
              interestRate: 20, 
              principal: ${loanAmount}, 
              startDate: "${startDate}", 
              status: "active"
            }) {
              id
            }
          }
          `
        ))
        if(newLoan) {
          setCreateLoanStatus('UPDATING APPLICATION...'); 
          updateApplicationStatus()
        }
      }
      catch(e){
        setErrorMessage(`ERROR: ${e.message}`)
        setTimeout(()=>setErrorMessage(null), 5000)
        }
    }

    const updateApplicationStatus = async()=>{
      try {
        const updatedApplication = await API.graphql(graphqlOperation(
          `mutation MyMutation {
            updateApplication(input: {
              id: "${applicationId}", 
              status: "processed"
            }) {
              id
            }
          }`
        ))
        if(updatedApplication) {
          setCreateLoanStatus('UPDATING POINTS...'); 
          updatePoints() 
        }
      }
      catch(e){
        setErrorMessage(`ERROR: ${e.message}`)
        setTimeout(()=>setErrorMessage(null), 5000)
        }
    }

    const updatePoints = async()=>{
      const newPoints = points[phoneNumber] - (loanAmount / 100)
      try {
        const pointsUpdated = await API.graphql(graphqlOperation(
          `mutation MyMutation {
            updateBoda(input: {
              id: "${phoneNumber}", 
              points: ${newPoints}
            }) {
              points
            }
          }`
        ))
        if(pointsUpdated) {
          const obj = filter
          delete obj[applicationId]
          setFilter(obj)
          setCreateLoanStatus('CREATE LOAN'); 
        }
      }
      catch(e){
        setErrorMessage(`ERROR: ${e.message}`)
        setTimeout(()=>setErrorMessage(null), 5000)
        }
    } 

    const sendSMS = (amount, instalment, duration) => {
      setSmsStatus('SENDING...')
      let bodySMS = `${amount} LOAN APPROVED.\nPay ${instalment} per day for next ${duration} days.\nAirtel *185*9# Merchant ID: 4362332 (GRIOTA).\nMTN *165*3# Merchant Code: 185344 (Andrew)`
        // bodySMS = bodySMS.replace(/\n/g, " ")
      SendDirectSms(phoneNumber, bodySMS)
        .then((res) => {
          console.log(bodySMS)
          setSmsStatus('SEND SMS')
        })
        .catch((e) => {
          setErrorMessage(`ERROR: ${e.message}`)
          setTimeout(()=>setErrorMessage(null), 5000)
        })
    }

    const sendMtn = () => {
      Clipboard.setString(`${phoneNumber}`);
      RNImmediatePhoneCall.immediatePhoneCall(`*165*1*1#`);
    }

    const sendAirtel = () => {
      Clipboard.setString(`${phoneNumber}`);
      RNImmediatePhoneCall.immediatePhoneCall(`*185*1#`);
    }

  return (
    <ScrollView style={[griotaStyles.container, {padding: 22}]}>
      {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
        <Text style={griotaStyles.title}>Approved Loans</Text>
    {/* filtering  */}
        {stagesArray && stagesArray.length >1 && <RadioButtons setChosen={setFilteredStage}
              options={stagesArray.map((stage, i)=>({
                id: stage, label: stage, value: stage
              }))} first={'All'} layout={'column'} />} 
    {/* applicants */}
        { applicants && applicants.map((applicant, ind) =>{
            const date = new Date(applicant.updatedAt);
            const today = new Date()
            if(filter[applicant.id]) return (<LoanCreationCard name={`${applicant.boda.firstname} ${applicant.boda.othername}`} 
              phoneNumber={applicant.boda.id} stage={applicant.boda.stage.name} 
              amount={applicant.loanAmount} instalment={applicant.loanInstalment}  
              duration={applicant.loanDurationDays} dateUpdated={date.toLocaleDateString('en-GB', options)} 
              createLoan={createLoan} selected={applicant.id === applicationId} 
              key={ind} mmName={applicant.boda.mobileMoneyName} sendSms={sendSMS} sendMtn={sendMtn} sendAirtel={sendAirtel}
              onCancel={()=>{setApplicationId(null)}} smsStatus={smsStatus} mtnStatus={mtnStatus}
              airtelStatus={airtelStatus} createLoanStatus={createLoanStatus} level={level}
              visibility={applicant.boda.stage.name === filteredStage || filteredStage === 'All'}
              onPress={()=>{
                setApplicationId(applicant.id)
                setPhoneNumber(applicant.boda.id)
                setLoanAmount(applicant.loanAmount)
                setDuration(applicant.loanDurationDays)
                setStartDate(dateFormat(today))
              }} />)
        })}
        {applicants && applicants.length === 0 && <Text style={griotaStyles.label}>No new applications</Text>}
    </ScrollView>
  )
}

export default ApprovedLoans

const styles = StyleSheet.create({
    text : {
        color: 'black',
        marginVertical: 1,
    },
})