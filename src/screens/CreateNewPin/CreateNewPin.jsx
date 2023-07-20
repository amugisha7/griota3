import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";
import { griotaStyles } from '../../../assets/styles/style';

const CreateNewPin = ({navigation}) => {

  const route = useRoute()
  const [errorMessage, setErrorMessage] = useState()
  const [succesMessage, setSuccessMessage] = useState()
  const PIN_REGEX = /\b\d{4}\b/;
  
  const phoneNumber = route?.params?.phoneNumber
  const firstName = route?.params?.firstName
  const otherName = route?.params?.otherName
  const idNumber = route?.params?.idNumber
  const selectedStage = route?.params?.selectedStage
  const stageIdCardPicFile = route?.params?.stageIdCardPicFile
  const type = 'boda';
  
  // const phoneNumber = '0774568769'
  // const firstName = 'FirstBoda1'
  // const otherName = 'OtherBoda1'
  // const idNumber = '11aa1'
  // const selectedStage = 'Bulindo' 
  // const stageIdCardPicFile = '12345'

  useEffect(()=>{
    SigningIn()
  },[])
  
  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      password: '',
      passwordCheck: '',
    }
  });
  const pwd = watch('password'); 

  const SetNewPin = (data) => {
    const {password} = data; 
    ChangePin(password)
  }

  const SigningIn = async() => {
    try { 
      const signedInUser = await Auth.signIn(`+256${phoneNumber.slice(1)}`, phoneNumber)
      console.log('user in ', signedInUser)
    }
    catch(e){
      console.log('couldnt sign in' ,e )
    }
  }

  const uploadToAmplify = async(password) => {
    try {
      const boda = await API.graphql(graphqlOperation(
        `mutation MyMutation {
          createBoda(input: {
            id: "${phoneNumber}",
            firstname: "${firstName}", 
            othername: "${otherName}", 
            phoneNumber: "${phoneNumber}", 
            picOfStageId: "${stageIdCardPicFile}", 
            type: "${type}", 
            idNumber: "${idNumber}",
            stageBodasId: "01${selectedStage}",
            pin: "${password}"
          }){
            id
          }
        }`
      ))
      console.log('boda created: ', boda)
      if(boda) {setSuccessMessage('PIN CHANGE SUCCESSFUL');}
    }
    catch(e)
    {
      console.log('failed to create boda: ', e)
    }
  }

  const ChangePin = (password)=>{
    Auth.currentAuthenticatedUser()
      .then((user) => {
          return Auth.changePassword(user, phoneNumber, `00${password}`);
      })
      .then(()=>{
        uploadToAmplify(password);
        setTimeout(()=>{navigation.navigate('ApplyForLoan', {phoneNumber, password})},1500)
      })
      .catch((err) => console.log('unable to change password ', err));
  }

  return (
      <View style={styles.container }>
        <Image source={Logo} style={styles.logo}/>
        
        {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}> {errorMessage} </Text>}
        {succesMessage &&  <Text style={{color: 'green', marginVertical: 20}}> {succesMessage} </Text>}

        <Text style={styles.title}>You Phone Number has been Verified.</Text>
        <Text style={styles.title}>Please set a New 4-Digit PIN Code.</Text>
        <CustomInput
            name='password'
            placeholder={''}
            control={control}
            mylabel={'Create a 4-digit PIN Code'}
            secureTextEntry={true}
            rules={{
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Too short"
              },
              maxLength: {
                value: 4,
                message: "Only 4 digits allowed"
              },
              pattern: {
                value: PIN_REGEX,
                message: 'Must be 4-digit Number'
              },
            }}
          />
          <CustomInput
            name='passwordCheck'
            placeholder={'Confirm PIN Code'}
            control={control}
            secureTextEntry={true}
            rules={{
              required: "This field is required",
              validate: value => pwd===value || 'PINs do not match',
            }}
          />
          
        <CustomButton onPress={handleSubmit(SetNewPin)} buttonFunction={'Set New PIN Code'}/>        
      </View>
    
  )
}
export default CreateNewPin

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 2,
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      width: '100%',
      // maxWidth: '600px',
    },
    logo: {
      width: 100,
      height: 100
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        marginVertical: 5
    },
    link: {
      color: 'blue',
    }
    
})

