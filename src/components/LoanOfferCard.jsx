import { StyleSheet, Text, View } from 'react-native'
import { Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React from 'react'
import NewCustomButton from './NewCustomButton';

const LoanOfferCard = ({onPress, disabled, amount, duration, instalment, pointsNeeded, 
    applyForLoan, selected}) => {
    // const [selected, setSelected] = useState(false)
  return (
    <Pressable style={[styles.container, styles[`container_${selected}`], styles[`loan_${disabled}`]]} 
        disabled={disabled}
            onPress={() => {
                // setSelected((val)=>!val)
                onPress()
                }}>
        <View style={{width: '15%'}}>
            <CheckBox
                disabled={disabled}
                value={selected}
                style={{width: '20%'}}
            />
        </View>
        <View style={{width: '85%', display: 'flex', flexDirection: 'column'}}>
            <Text style={[{display: 'flex', flexDirection: 'row'}, styles[`text_${disabled}`]]}>
                {`Loan: `}
                <Text style={[styles.title, styles[`text_${disabled}`]]}>
                    {`UGX ${amount.toLocaleString('en-US')}`}</Text>
            </Text>
            <Text style={[styles.text, styles[`text_${disabled}`]]}>
                {`Pay: ${instalment.toLocaleString('en-US')} per day`}
            </Text>
            <Text style={[styles.text, styles[`text_${disabled}`]]}>
                {`Duration: ${duration} days`}
            </Text>
            <Text style={[styles.text, styles[`points_${disabled}`]]}>
                Points Needed: {pointsNeeded.toLocaleString('en-US')}
            </Text>
            {selected && 
                <View style={{width: 230, paddingVertical: 10}}>
                    <NewCustomButton buttonText={'APPLY FOR THIS LOAN'} onPress={applyForLoan} disabled={false}/>
                </View>}
        </View>
    </Pressable>
  )
}

export default LoanOfferCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10
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
        lineHeight: 24,
        fontSize: 16,
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
        fontWeight: 600,
    },
    points_true: {
        color: 'red',
    },
    points_false: {
        color: 'green',
    },
})