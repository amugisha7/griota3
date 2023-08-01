import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropDown from '../../../components/CustomDropDown/CustomDropDown';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {API, graphqlOperation} from 'aws-amplify'; 
import { griotaStyles } from '../../../../assets/styles/style';

const SelectStageToView = ({navigation}) => {
  
  const [errorMessage, setErrorMessage] = useState()
  const [selectedStage, setSelectedStage] = useState()
  const [stagesList, setStagesList] = useState()
  const [status, setStatus] = useState('View Bodas at this Stage')
  const [displayCheck, setDisplayCheck] = useState()

  useEffect(()=>{
    getStages()
  },[])
  
  useEffect(()=>{
    selectedStage === 'Select from list' || selectedStage === undefined ? setDisplayCheck(false) : setDisplayCheck(true);
  },[selectedStage])

  const getStages = async() => {
    try {
        const stages = await API.graphql(graphqlOperation(
        `query MyQuery {
            listStages {
              items {
                id
              }
            }
          }`
        ))
        if(stages) {
            const listOfStages = stages.data.listStages.items.map(item => `${item.id}`)
            listOfStages.unshift('Select from list')
            setStagesList(listOfStages)
        }
    }
    catch(e)
    {
      setErrorMessage('Error. Please contact support')
      console.log(e)
    }
  }

  const viewBodas =() => {
    navigation.navigate("AdminScreen/ViewBorrowers", {selectedStage})
  }

  return (
      <ScrollView>
        <View style={styles.container }>
          <Text style={griotaStyles.title}>Select Stage to View Borrowers</Text>
          {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
          <CustomDropDown
              items={stagesList ? stagesList : ['list Loading... PLEASE WAIT']}
              setSelectedItem={setSelectedStage} 
              mylabel={'Select Stage'}
          />
          <View style={{display: displayCheck ? 'flex' : 'none'}}>
            <CustomButton onPress={viewBodas} buttonFunction={status}/>
          </View>
        </View>
      </ScrollView>
  )
}
export default SelectStageToView

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 22, 
    //   width: '100%',
      // maxWidth: '600px',
    },
    logo: {
      width: 100,
      height: 100
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
    },
    link: {
      color: 'blue',
    }
    
})

