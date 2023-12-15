import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RadioGroup from 'react-native-radio-buttons-group';

const RadioButtons = ({options, setChosen}) => {

    const [selectedId, setSelectedId] = useState(1)
    useEffect(() =>{
        setChosen(selectedId)
    }, [selectedId])

  return (
    <View>
      <RadioGroup 
        radioButtons={options} 
        onPress={setSelectedId}
        selectedId={selectedId}
        layout='row'
      />
    </View>
  )
}

export default RadioButtons

const styles = StyleSheet.create({})