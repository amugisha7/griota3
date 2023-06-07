import { Pressable, StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import { API } from "aws-amplify";
import { listLoanApplications, getLoanApplication } from "../../graphql/queries";

const AdminScreen = ({navigation}) => {

  const listLoans = async() =>{
    try{
        const allLoanApplications = await API.graphql({
        query: listLoanApplications
      });
      console.log(allLoanApplications.data.listLoanApplications.items[5]);
    }catch(e){console.log(e)}
  }

  return (
    <View>
      <Text style={griotaStyles.title}>AdminScreen</Text>
      <Button onPress={listLoans} title='List all loans'></Button>
    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    
})