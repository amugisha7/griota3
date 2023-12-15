import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OtpInputs from 'react-native-otp-inputs';
import { griotaStyles } from '../../assets/styles/style';

const CustomNumberInput = ({numberOfInputs, handleChange, label}) => {
  return (
    <View style={{width: '100%', marginBottom: 10}}>
      <Text style={[griotaStyles.label, {marginBottom: 10, alignSelf: 'center'}]}>{label}</Text>
      <OtpInputs
          handleChange={(code)=> handleChange(code)}
          numberOfInputs={numberOfInputs}
          style={{
            display: 'flex', justifyContent: 'center', flexDirection: 'row'
          }}
          inputContainerStyles ={{
            width: 33, marginHorizontal: 1
          }}
          inputStyles={{backgroundColor: 'white', color: 'blue', borderWidth: 1, 
            borderColor: 'black', borderRadius: 15, fontSize: 14, textAlign: 'center'}}
          focusStyles={{backgroundColor: 'blue'}}
        />
    </View>
  )
}

export default CustomNumberInput

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
    }

})