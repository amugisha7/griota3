import { StyleSheet, Text, View } from 'react-native'
import { Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React, { useState, useEffect } from 'react'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import NewCustomButton from './NewCustomButton';

const LoanCreationCard = ({onPress, name, phoneNumber, stage, amount, instalment, level,
    duration, selected, dateUpdated, createLoan, onCancel, smsStatus, visibility, mmName,
    sendSms, sendMtn, sendAirtel, mtnStatus, airtelStatus, createLoanStatus}) => {
        
    //states
    const [checked, setChecked] = useState(false)
    
    //useEffects
    
    useEffect(() => {
        if(selected != checked) setChecked(false)
    },[selected])

    //constants
    const disabled = false

    //functions

  return (
    <View style={[styles.container, styles[`container_${selected}`], styles[`loan_${disabled}`],
    {display: visibility? 'flex': 'none'}]}>
        <View style={{width: '15%'}}>
            <CheckBox
                value={checked}
                disabled={disabled || level < 2 || !level}
                onValueChange={(newValue) => {
                    setChecked(newValue)
                    if(newValue) onPress()
                    else onCancel()
                }}
            />
        </View>
        <View style={{width: '85%', display: 'flex', flexDirection: 'column'}}>
            <Text style={[styles.text, {color: 'blue'}]}>
                {`Approved on ${dateUpdated}`}
            </Text>
            <Text style={[styles.text, {fontWeight: 600}]}>
                {`Name: ${name}`}
            </Text>
            <Text style={[styles.text, {fontWeight: 600, color: 'blue'}]}>
                {`Loan: ${amount.toLocaleString('en-US')} (${duration} days, ${instalment}/day)`}
            </Text>
            <Text style={[styles.text, {fontWeight: 600, color: 'blue'}]}>
                {`Phone Number: ${phoneNumber}`}
            </Text>
            <Text style={[styles.text, {fontWeight: 600, color: 'blue'}]}>
                {`M-Money to: ${mmName}`}
            </Text>
            <Text style={[styles.text, {fontWeight: 600}]}>
                {`Stage: ${stage}`}
            </Text>
            {selected && <View style={{width: 240, paddingVertical: 10, gap: 12}}>
                <NewCustomButton buttonText={smsStatus} 
                    onPress={()=>sendSms(amount.toLocaleString('en-US'), instalment, duration)} 
                    disabled={false} color={'green'}/>
                <NewCustomButton buttonText={mtnStatus} onPress={sendMtn} disabled={false} color={'#BBA700'}/>
                <NewCustomButton buttonText={airtelStatus} onPress={sendAirtel} disabled={false} color={'red'}/>
                <NewCustomButton buttonText={createLoanStatus} onPress={createLoan} disabled={false}/>
            </View>}
        </View>
    </View>
  )
}

export default LoanCreationCard

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