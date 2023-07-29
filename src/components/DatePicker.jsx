import { Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { griotaStyles } from '../../assets/styles/style'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { dateFormat } from '../resources/dateFormat';

const DatePickerComponent = ({setTheDate, dateLabel, dateButtonText}) => {
    const [date, setDate] = useState(new Date());
    
    useEffect(()=>{
      const currentDate = dateFormat(date);
      setTheDate(currentDate)
    },[date])

    const onChange = (event, selectedDate) => {
      setDate(selectedDate);
    };
  
    const showDatepicker = () => {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: 'date',
        is24Hour: true,
      });
    };
    
    return (
      <View>
        <View style={{display: 'flex', marginBottom: 10, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: 'black', fontWeight: 600 }}>{dateLabel} </Text>
            <Text style={{fontSize: 18, color: 'blue', marginLeft: 5 }}>{dateFormat(date)}</Text>
        </View>
        <Text 
            style={{color: 'blue', textDecorationLine: 'underline', 
                fontSize: 14, alignSelf: 'center',marginBottom: 40 }}
            onPress={showDatepicker}>{dateButtonText}</Text>
      </View>
    );}

export default DatePickerComponent

