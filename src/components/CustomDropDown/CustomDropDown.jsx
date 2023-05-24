import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';
import { griotaStyles } from '../../../assets/styles/style';


const CustomDropDown = ({items, selectedItem, setSelectedItem, required, mylabel}) => {

  const [option, setOption] = useState()

  useEffect(()=> {
    setSelectedItem(option);
  }, [option])

  return (
    <View style={griotaStyles.container}>
      {mylabel && <Text style={griotaStyles.label}>{mylabel}</Text>}
      <View style={{backgroundColor: 'white', marginHorizontal: 10}}>
        <Picker
          style={styles.picker}
          selectedValue={option}
          onValueChange={(itemValue, itemIndex) =>{
              setOption(itemValue)
            }
          }>
            {items.map((item, index)=>(
              <Picker.Item 
                key={index} 
                style={(option === 'Select from list') ? styles.errors : styles.pickerItem } 
                label={item} value={item} 
              />
            ))}
        
        </Picker>
      </View>
      {(required && (option === 'Select from list' || option ===undefined)) && 
        <Text style={griotaStyles.errors}>Please make a selection</Text> }
    </View>
  )
}

export default CustomDropDown

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  errors: {
    color: 'red',
    
  },
  picker: {
   
  },
  pickerItem: {
    padding: 5,
    flexWrap: 'wrap',
    color: 'darkblue'
  }
})