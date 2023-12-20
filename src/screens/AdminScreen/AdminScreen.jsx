import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React, {  } from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import { useRoute } from '@react-navigation/native';

const AdminScreen = ({navigation}) => {

  const route = useRoute()
  const level = route?.params?.level
  console.log('level::: ', level);

  const addPayment = () =>{
    navigation.navigate('AdminScreen/AddPayment')
  }
  
  const createStage = () =>{
    navigation.navigate('AdminScreen/CreateStage')
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
    navigation.navigate('AdminScreen/CreateLoanFromApplications')
  }
  
  const approvedLoans = async()=>{
    navigation.navigate('AdminScreen/ApprovedLoans')
  }

  return (
    <ScrollView>
      <View style={{gap: 20, flexDirection: 'column', padding: 22}}>
        <Text style={griotaStyles.title}>AdminScreen</Text>
        <Button onPress={createStage} title='Create Stage'></Button>
        <Button onPress={addPayment} title='Add Payment'></Button>
        <Button onPress={viewApplications} title='View Applications'></Button>
        {level >9 && <Button onPress={createLoan} title='Create Loan'></Button>}
        {level > 9 && <Button onPress={approvedLoans} title='Approved Loans'></Button>}
        <Button onPress={getLoanStatement} title='Loan Statements'></Button>
        <Button onPress={veiwBorrowers} title='View Borrowers'></Button>
      </View>
    </ScrollView>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    
})