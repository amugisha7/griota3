import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { formatBodaInfo } from '../../../resources/formatBodaInfo';

const ViewBorrowers = ({navigation}) => {

  const route = useRoute()
  const [errorMessage, setErrorMessage] = useState()
  const [stageBodas, setStageBodas] = useState()

  const selectedStage = route?.params?.selectedStage
  const level = route?.params?.level
  
  useEffect(()=>{
    getBodaDetails()
  },[])

  const getBodaDetails = async()=>{
    try {
      const bodas = await API.graphql(graphqlOperation(
        `query MyQuery {
            listBodas(filter: {stageBodasId: {eq: "${selectedStage}"}}) {
              items {
                phoneNumber
                firstname
                othername
              }
            }
        }`
      ))
      if(bodas) {
        const bodasList = bodas.data.listBodas.items
        const bodasArray = formatBodaInfo(bodasList)
        // const bodasArray = bodasList.map(({ 
        //     phoneNumber, firstname, othername }) => [`${firstname} ${othername}`, phoneNumber]);
        setStageBodas(bodasArray)
        console.log('bodasArray::: ', bodasArray);
      }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }

  const returnToWelcome = ()=> {
    navigation.navigate("AdminScreen/SelectStageToView", {level})
  }

  const tableHead = ['#', 'NAME', 'PHONE NUMBER']

  return (
    <ScrollView>
      <View style={{padding: 22}}>
        {errorMessage && <Text style={griotaStyles.errors}>{errorMessage}</Text>}
        {!stageBodas ? <Text style={griotaStyles.title}>Loading...</Text> :
        <View>
          <Text style={griotaStyles.title}>Stage: {selectedStage}</Text>
          <Text style={griotaStyles.label}>Boda Details:</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.textH} flexArr={[1, 3, 3]}/>
            <Rows data={stageBodas} textStyle={styles.text} flexArr={[1, 3, 3]} />
          </Table>
          <View style={{marginTop: 25}}>
              <CustomButton onPress={returnToWelcome} buttonFunction={"Exit"} />
          </View>
        </View>
        }
      </View>
    </ScrollView>
  )
}

export default ViewBorrowers

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: 'black', alignSelf: 'center' },
  textH: {margin: 6, color: 'blue', alignSelf: 'center', fontWeight: 600 }
});