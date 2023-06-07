import { Pressable, StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import { API } from "aws-amplify";
import { Storage } from "@aws-amplify/storage"

const AdminScreen = ({navigation}) => {

  // List all items
  const listLoans = () =>{
    // try {
    //   // Get a specific item
    //   const oneLoanApplication = await API.graphql({
    //     query: getLoanApplication,
    //     variables: { id: '3581d34a-1d4e-4dfc-9464-779b06ca99c3' }
    //   });
    //   console.log('all loans :', oneLoanApplication);
    // }
    // catch(e){
    //   console.log(e)
    // }

    Storage.list('photos/') // for listing ALL files without prefix, pass '' instead
        .then(result => console.log(result))
        .catch(err => console.log(err));  

    // try{
    //   const files = await Storage.list('photos/') // for listing ALL files without prefix, pass '' instead
    //   console.log('files list ',files)
    // }
    // catch(err) {console.log(err)};  
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