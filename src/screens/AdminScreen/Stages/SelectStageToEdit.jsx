import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropDown from '../../../components/CustomDropDown/CustomDropDown';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {API, graphqlOperation} from 'aws-amplify'; 
import { griotaStyles } from '../../../../assets/styles/style';
import { useRoute } from '@react-navigation/native';

const SelectStageToEdit = ({navigation}) => {
  
  const [errorMessage, setErrorMessage] = useState()
  const [selectedStage, setSelectedStage] = useState()
  const [selectedDivision, setSelectedDivision] = useState()
  const [stagesList, setStagesList] = useState()
  const [divisionsList, setDivisionsList] = useState()
  const [status, setStatus] = useState('Edit this Stage')
  const [displayCheck, setDisplayCheck] = useState()

  const route = useRoute()
  const level = route?.params?.level

  useEffect(()=>{
    getDivisions()
  },[])
  
  useEffect(()=>{
    selectedStage === 'Select from list' || selectedStage === undefined ? setDisplayCheck(false) : setDisplayCheck(true);
  },[selectedStage])

  useEffect(()=>{
    if(selectedDivision && selectedDivision !== "Select from list"){
      if(selectedDivision === 'Kira'){
        getStages(`{attributeExists: false}`)
      }else{
        getStages(`{eq: ${selectedDivision}}`)
      }
    } 
  },[selectedDivision])
  
  const getStages = async(stageFilterString) => {
    try {
        const stages = await API.graphql(graphqlOperation(
        `query MyQuery {
          listStages(filter: {stageGroupStagesId: ${stageFilterString}}) {
            items {
              id
            }
          }
        }`
        ))
        if(stages) {
            const listOfStages = ['Select from list', 
            ...stages.data.listStages.items.map(item => `${item.id}`).sort()]
            setStagesList(listOfStages)
        }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }
  const getDivisions = async() => {
    try {
        const divisions = await API.graphql(graphqlOperation(
        `query MyQuery {
          listDivisions {
            items {
              name
            }
          }
        }`
        ))
        if(divisions) {
            const listOfDivisions = ['Select from list', 
            ...divisions.data.listDivisions.items.map(item => `${item.name}`).sort()]
            // listOfDivisions.unshift('Select from list')
            setDivisionsList(listOfDivisions)
        }
    } 
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }

  const editStage =() => {
    navigation.navigate("AdminScreen/EditStage", {selectedStage, level})
  }

  return (
      <ScrollView>
        <View style={styles.container }>
          {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
          <Text style={griotaStyles.title}>View Registered Bodas</Text>
          <CustomDropDown
              items={divisionsList ? divisionsList : ['list Loading... PLEASE WAIT']}
              setSelectedItem={setSelectedDivision} 
              mylabel={'Select Division'}
          />
          {selectedDivision && selectedDivision !== "Select from list" && <CustomDropDown
              items={stagesList ? stagesList : ['list Loading... PLEASE WAIT']}
              setSelectedItem={setSelectedStage} 
              mylabel={'Select Stage'}
          />}
          <View style={{display: displayCheck ? 'flex' : 'none'}}>
            <CustomButton onPress={editStage} buttonFunction={status}/>
          </View>
        </View>
      </ScrollView>
  )
}
export default SelectStageToEdit

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

