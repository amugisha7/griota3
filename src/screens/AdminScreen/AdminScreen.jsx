import { StyleSheet, Text, View, Button } from 'react-native'
import React, {  } from 'react'
import { griotaStyles } from '../../../assets/styles/style'

const AdminScreen = ({navigation}) => {

  const addPayment = () =>{
    navigation.navigate('AdminScreen/AddPayment')
  }
  
  const createStage = () =>{
    navigation.navigate('AdminScreen/CreateStage')
  }
  
  const createLoan = () =>{
    navigation.navigate('AdminScreen/CreateLoan')
  }

  const viewLoans = async()=>{
    
  }

  return (
    <View style={{gap: 20, flexDirection: 'column', padding: 22}}>
      <Text style={griotaStyles.title}>AdminScreen</Text>
      <Button onPress={createStage} title='Create Stage'></Button>
      <Button onPress={createLoan} title='Create Loan'></Button>
      <Button onPress={addPayment} title='Add Payment'></Button>
      <Button onPress={viewLoans} title='View Loans'></Button>
    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    
})