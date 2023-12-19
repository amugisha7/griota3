import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RadioGroup from 'react-native-radio-buttons-group';

const RadioButtons = ({options, setChosen, first, layout}) => {

    const [selectedId, setSelectedId] = useState(first)
    useEffect(() =>{
        setChosen(selectedId)
    }, [selectedId])

  return (
    <View>
      <RadioGroup 
        radioButtons={options} 
        onPress={setSelectedId}
        selectedId={selectedId}
        layout={layout ? layout : 'row'}
      />
    </View>
  )
}

export default RadioButtons

const styles = StyleSheet.create({})