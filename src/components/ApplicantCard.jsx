import { StyleSheet, Text, View } from 'react-native'
import { Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React, { useState, useEffect } from 'react'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import NewCustomButton from './NewCustomButton';

const ApplicantCard = ({onPress, name, phoneNumber, stage, chairmanPhone, amount, instalment, 
    duration, selected, dateCreated, approve, onCancel, status, visibility}) => {
        
    //states
    const [checked, setChecked] = useState(false)
    
    //useEffects
    
    useEffect(() => {
        if(selected != checked) setChecked(false)
    },[selected])

    //constants
    const disabled = false

    //functions
    const callChair = ()=>{
        RNImmediatePhoneCall.immediatePhoneCall(chairmanPhone);
      }

  return (
    <View style={[styles.container, styles[`container_${selected}`], styles[`loan_${disabled}`],
    {display: visibility? 'flex': 'none'}]}>
        <View style={{width: '15%'}}>
            <CheckBox
                value={checked}
                disabled={disabled}
                onValueChange={(newValue) => {
                    setChecked(newValue)
                    if(newValue) onPress()
                    else onCancel()
                }}
            />
        </View>
        <View style={{width: '85%', display: 'flex', flexDirection: 'column'}}>
            <Text style={[styles.text, styles[`text_${disabled}`], {color: 'blue'}]}>
                {`Applied on ${dateCreated}`}
            </Text>
            <Text style={[styles.text, styles[`text_${disabled}`], {fontWeight: 600}]}>
                {`Name: ${name}`}
            </Text>
            <Text style={[styles.text, styles[`text_${disabled}`], {fontWeight: 600}]}>
                {`Loan: ${amount.toLocaleString('en-US')} (${duration} days, ${instalment}/day)`}
            </Text>
            <Text style={[styles.text, styles[`text_${disabled}`]]}>
                {`Phone Number: ${phoneNumber}`}
            </Text>
            <Text style={[styles.text, styles[`text_${disabled}`], {fontWeight: 600}]}>
                {`Stage: ${stage}`}
            </Text>
            {!selected && <View style={{width: 240, paddingVertical: 10}}>
                <NewCustomButton buttonText={`Call Chairman ${chairmanPhone}`} onPress={callChair} 
                    disabled={false} color={'green'}/>
            </View>}
            {selected && <View style={{width: 240, paddingVertical: 10}}>
                <NewCustomButton buttonText={status} onPress={approve} disabled={status !=='APPROVE'}/>
            </View>}
        </View>
    </View>
  )
}

export default ApplicantCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10
    },
    pressable: {
        width: 240, alignItems: 'center', padding: 15, backgroundColor: 'green',
        marginVertical: 5
    },
    buttonText: {
        fontWeight: '600',
        color: 'white',
    },
    container_true: {
        borderWidth: 4,
        borderColor: 'blue'
    },
    container_false: {
        borderWidth: 1,
        borderColor: 'grey'
    },
    loan_false: {
        backgroundColor: '#DFEFFF'
    },  
    loan_true: {
        backgroundColor: '#DFDFDF'
    },  
    text: {
        lineHeight: 20,
        fontSize: 15,
        color: 'black',
        marginTop: 5
    },
    title: {
        fontSize: 26,
        fontWeight: 600,
    },
    text_true: {
        color: 'grey',
    },
    text_false: {
        color: '#03284F',
        fontWeight: 400,
    },
    points_true: {
        color: 'red',
    },
    points_false: {
        color: 'green',
    },
})