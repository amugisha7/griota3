//class imports
import { StyleSheet, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from "aws-amplify";
import { useRoute } from '@react-navigation/native';

//component imports
import { griotaStyles } from '../../../../assets/styles/style';
import ApplicantCard from '../../../components/ApplicantCard';
import RadioButtons from '../../../components/RadioButtons';

const CreateLoanFromApplications = () => {
    
    //enable filtering
    const filterObj = {} 
    const route = useRoute()
    const level = route?.params?.level

    //states
    const [applicants, setApplicants] = useState()
    const [applicationId, setApplicationId] = useState()
    const [status, setStatus] = useState('APPROVE')
    const [filter, setFilter] = useState(filterObj)
    const [stagesArray, setStagesArray] = useState()
    const [filteredStage, setFilteredStage] = useState('All')
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
                listApplications(filter: {status: {eq: "newApp"}}) {
                  items {
                    createdAt
                    id
                    loanAmount
                    loanDurationDays
                    loanInstalment
                    boda {
                      firstname
                      id
                      othername
                      stage {
                        name
                        chairmanPhoneNumber
                      }
                    }
                  }
                }
              }`
            ))
            if(applications) {
              console.log('applications::: ', applications.data.listApplications.items.length);
              for(let i=0; i<applications.data.listApplications.items.length; i++) {
                if(!filterObj[applications.data.listApplications.items[i].id]){
                  filterObj[applications.data.listApplications.items[i].id] = 
                  applications.data.listApplications.items[i].id
                }
              }
              setFilter(filterObj)
              setApplicants(applications.data.listApplications.items); 
              const stageList = {}
              for(let i = 0; i < applications.data.listApplications.items.length; i++) {
                if(!stageList[applications.data.listApplications.items[i].boda.stage.name]){
                  stageList[applications.data.listApplications.items[i].boda.stage.name] = 
                  applications.data.listApplications.items[i].boda.stage.name
                }
              }
              const arr = ['All', ...Object.values(stageList)]
              setStagesArray(arr)
              console.log('arr::: ', arr);
            }
          }
          catch(e)
          {
            setErrorMessage(`ERROR: ${e.message}`)
            setTimeout(()=>setErrorMessage(null), 5000)
          }
    } 

    const approve = async()=>{
        setStatus('PROCESSING...')
        try {
            const approvedApplication = await API.graphql(graphqlOperation(
              `mutation MyMutation {
                updateApplication(input: {id: "${applicationId}", status: "approved"}) {
                  id
                }
              }`
            ))
            if(approvedApplication) {
              const obj = filter
              delete obj[applicationId]
              setFilter(obj)
              setStatus('APPROVE'); 
            }
          }
          catch(e)
          {
            setErrorMessage(`ERROR: ${e.message}`)
            setTimeout(()=>setErrorMessage(null), 5000)
          }
    }

  return (
    <ScrollView style={[griotaStyles.container, {padding: 22}]}>
        {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
        <Text style={griotaStyles.title}>New Applications</Text>
    {/* filtering  */}
        {stagesArray && stagesArray.length >1 && <RadioButtons setChosen={setFilteredStage}
              options={stagesArray.map((stage, i)=>({
                id: stage, label: stage, value: stage
              }))} first={'All'} layout={'column'} />}
    {/* applicants */}
        { applicants && applicants.map((applicant, ind) =>{
            const date = new Date(applicant.createdAt);
            if(filter[applicant.id]) return (<ApplicantCard name={`${applicant.boda.firstname} ${applicant.boda.othername}`} 
              phoneNumber={applicant.boda.id} stage={applicant.boda.stage.name} 
              chairmanPhone={applicant.boda.stage.chairmanPhoneNumber} 
              amount={applicant.loanAmount} instalment={applicant.loanInstalment}  
              duration={applicant.loanDurationDays} dateCreated={date.toLocaleDateString('en-GB', options)} 
              approve={approve} selected={applicant.id === applicationId} 
              onPress={()=>{setApplicationId(applicant.id)}} key={ind}
              onCancel={()=>{setApplicationId(null)}} status={status} level={level}
              visibility={applicant.boda.stage.name === filteredStage || filteredStage === 'All'}/>)
        })}
        {applicants && applicants.length === 0 && <Text style={griotaStyles.label}>No new applications</Text>}
    </ScrollView>
  )
}

export default CreateLoanFromApplications

const styles = StyleSheet.create({
    text : {
        color: 'black',
        marginVertical: 1,
    },
})