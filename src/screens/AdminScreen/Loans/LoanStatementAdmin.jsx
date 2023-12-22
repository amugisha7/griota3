import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { griotaStyles } from '../../../../assets/styles/style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { API, graphqlOperation } from "aws-amplify";
import { useRoute } from '@react-navigation/native';

const LoanStatementAdmin = ({navigation}) => {
 
  const PHONE_REGEX = /^07\d{8}$/
  const [status, setStatus] = useState('View Loan Statement')
  const route = useRoute()
  const level = route?.params?.level

  const getBodaDetails = async(data)=>{
    setStatus("Please Wait...")
    const {phoneNumber} = data; 
    navigation.navigate("CheckLoanBalanceAdmin", {phoneNumber, level})
    setStatus('View Loan Statement')
  }

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      phoneNumber: '',
    }
  });

  return (
    <ScrollView>
      <View style={{padding: 22}}>
        <View>
          <Text style={griotaStyles.title}>View Loan Statement</Text>
          <CustomInput
            name='phoneNumber'
            placeholder='Phone Number (07xxxxxxxx)'
            mylabel='Enter the Phone Number of the Client'
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: PHONE_REGEX,
                message: 'Invalid Phone Number (use format 07xxxxxxxx)'
              },
            }}
            type={'tel'}
          />
          <CustomButton onPress={handleSubmit(getBodaDetails)} buttonFunction={status} />
        </View>
      </View>
    </ScrollView>
  )
}

export default LoanStatementAdmin