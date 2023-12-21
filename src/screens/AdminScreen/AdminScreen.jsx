import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React, {  } from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import { useRoute } from '@react-navigation/native';

const AdminScreen = ({navigation}) => {

  const route = useRoute()
  const level = route?.params?.level

  const addPayment = () =>{
    navigation.navigate('AdminScreen/AddPayment')
  }
  
  const createStage = () =>{
    navigation.navigate('AdminScreen/CreateStage')
  }
  const editStage = () =>{
    navigation.navigate('AdminScreen/SelectStageToEdit')
  }
  
  const createLoan = () =>{
    navigation.navigate('AdminScreen/CreateLoan')
  }

  const getLoanStatement = async()=>{
    navigation.navigate('LoanStatementAdmin')
  }
  
  const veiwBorrowers = async()=>{
    navigation.navigate('AdminScreen/SelectStageToView')
  }

  const viewApplications = async()=>{
    navigation.navigate('AdminScreen/CreateLoanFromApplications', {level})
  }
  
  const approvedLoans = async()=>{
    navigation.navigate('AdminScreen/ApprovedLoans', {level})
  }
//update stage
//create Admin user

  return (
    <ScrollView>
      <View style={{gap: 20, flexDirection: 'column', padding: 22}}>
        <Text style={[griotaStyles.title, {marginBottom: -10}]}>AdminScreen</Text>
        <Text style={griotaStyles.label}>Loan Applications:</Text>
        <Button onPress={viewApplications} title='New Applications'></Button>
        <Button onPress={approvedLoans} title='Approved Applications'></Button>
        <Text style={griotaStyles.label}>Bodas & Stages:</Text>
        <Button onPress={createStage} title='Create Stage'></Button>
        <Button onPress={editStage} title='Update Stage Details'></Button>
        <Button onPress={veiwBorrowers} title='View Bodas'></Button>
        <Text style={griotaStyles.label}>Loan Management:</Text>
        {level >1 && <Button onPress={addPayment} title='Add Payment'></Button>}
        {level >1 && <Button onPress={createLoan} title='Create Loan'></Button>}
        <Button onPress={getLoanStatement} title='Loan Statements'></Button>
      </View>
    </ScrollView>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    
})