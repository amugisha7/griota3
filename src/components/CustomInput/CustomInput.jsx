import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Controller } from "react-hook-form";
import { griotaStyles } from '../../../assets/styles/style';

const CustomInput = ({control, name, placeholder, secureTextEntry, rules, type, mylabel, multiline}) => {

  return (
    <View style={griotaStyles.container}>
      {mylabel && <Text style={griotaStyles.label}>{mylabel}</Text>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <View style={{width: '100%'}}>
              <TextInput
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[styles.textInput, {borderColor: error ? 'red' : 'gray'}]}
                type={type}
                multiline={multiline}
              />

            </View>
            {error && <Text style={griotaStyles.errors}>{error.message || 'Error'}</Text>}
          </>
        )}
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    
    label: {

    },
    textInput: {
        color: 'darkblue',
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        minHeight: 30,
        justifyContent: 'flex-start',
        
    }
})
