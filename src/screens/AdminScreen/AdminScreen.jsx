import { Pressable, StyleSheet, Text, View, Button, BackHandler } from 'react-native'
import React, { useState } from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import { Notifications } from 'aws-amplify'

// import { API, Notifications} from "aws-amplify";
// import { listLoanApplications, getLoanApplication } from "../../graphql/queries";
// import { deleteLoanApplication } from '../../graphql/mutations';
// import { jsonToCSV } from 'react-native-csv'

const AdminScreen = ({navigation}) => {

  const [csvData, setCsvData] = useState(null)


  const listLoans = async() =>{
    // try{
    //   const allLoanApplications = await API.graphql({
    //     query: listLoanApplications
    //   });
    //   const list = allLoanApplications.data.listLoanApplications.items;
    //   // const ids = list.map(item => item.id)
    //   // console.log('list is: ', list)
    //   const results = jsonToCSV(list)
    //   setCsvData(list)
    //   console.log(results)
      
    // }catch(e){console.log(e)}
  }

  const deleteLoan = async()=>{
    // try{
    //   const deletedLoanApplication = await API.graphql({
    //     query: deleteLoanApplication,
    //     variables: {
    //         input: {
    //             id: "84ee782a-a410-462d-b4f4-96839ec1e799"
    //         }
    //     }
    // });
    // }catch(e){console.log(e)}
  }

  return (
    <View style={{gap: 20, flexDirection: 'column'}}>
      <Text style={griotaStyles.title}>AdminScreen</Text>
      <Button onPress={listLoans} title='List all loans'></Button>
      <Button onPress={deleteLoan} title='Delete Loan'></Button>
    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    
})