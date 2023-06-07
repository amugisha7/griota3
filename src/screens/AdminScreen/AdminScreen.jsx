import { Pressable, StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import { API } from "aws-amplify";
import { listLoanApplications, getLoanApplication } from "../../graphql/queries";
import { deleteLoanApplication } from '../../graphql/mutations';
import createCSV from '../../../test';

const AdminScreen = ({navigation}) => {

  const listLoans = async() =>{
    try{
      const allLoanApplications = await API.graphql({
        query: listLoanApplications
      });
      const list = allLoanApplications.data.listLoanApplications.items;
      // const ids = list.map(item => item.id)
      console.log('list is: ', list)
      createCSV(list)
      
    }catch(e){console.log(e)}
  }

  const deleteLoan = async()=>{
    try{
      const deletedLoanApplication = await API.graphql({
        query: deleteLoanApplication,
        variables: {
            input: {
                id: "84ee782a-a410-462d-b4f4-96839ec1e799"
            }
        }
    });
    }catch(e){console.log(e)}
  }

  return (
    <View>
      <Text style={griotaStyles.title}>AdminScreen</Text>
      <Button onPress={listLoans} title='List all loans'></Button>
      <Button onPress={deleteLoan} title='Delete Loan'></Button>
    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    
})