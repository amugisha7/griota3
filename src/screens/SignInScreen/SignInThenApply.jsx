import { View, Text, Image, StyleSheet, Linking, ScrollView, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Auth, Notifications} from 'aws-amplify'; 
import { useRoute } from '@react-navigation/native';
import { griotaStyles } from '../../../assets/styles/style';
import { adminUsers } from '../../Lists/adminUsers';
import {checkPermissions} from '../../resources/requestPermissions'
import DeepLinking from 'react-native-deep-linking';
import CustomNumberInput from '../../components/CustomNumberInput';
import NewCustomButton from '../../components/NewCustomButton';

const SignInScreen = ({navigation}) => {
  
  const route = useRoute()
// // SETTING UP A ROUTE FOR NOTIFICATIONS: 
  DeepLinking.addRoute('/admin', (response) => {
    navigation.navigate("AdminScreen");
  });
  DeepLinking.addRoute('/register', (response) => {
    navigation.navigate("Register");
  });
  // evaluate every incoming URL
  const handleOpenURL = (event) => {
    DeepLinking.evaluateUrl(event.url);
  }
  // manage Linking event listener with useEffect
  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  const [loginError, setLoginError] = useState()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [status, setStatus] = useState('Sign In')

  useEffect(()=>{setLoginError(null)},[])

  useEffect(()=>{
    checkPermissions()
  },[])

  const Registering = () => navigation.navigate('SelectDivision');

  const SigningIn = async () => {
    setStatus('Signing In...')
    try { 
      const user = await Auth.signIn(`+256${phoneNumber.slice(1)}`, `00${pinCode}`)
      if(user) {
        user.attributes.phone_number === adminUsers.Admin1.PhoneNumber
        ? navigation.navigate('AdminScreen')
        : navigation.navigate('ApplyForLoan', {phoneNumber})
      }
    }
    catch(e){
      setLoginError('Error. Please contact support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)    
    }
    finally{
      setStatus("Sign In")
    }
    
  }

  const PHONE_REGEX = /^07\d{8}$/
  const PIN_REGEX = /\b\d{4}\b/;

  return (
      <ScrollView>
        <View style={styles.container }>
          <Text style={griotaStyles.title}>Sign In to Apply for a Loan</Text>
          <View style={styles.newContainer }>
            <CustomNumberInput handleChange={setPhoneNumber} numberOfInputs={10}
              label={'Phone Number'}
            />
            <CustomNumberInput handleChange={setPinCode} numberOfInputs={4}
              label={'PIN Code'}
            />
            <View style={{marginTop: 10, width: '100%'}}>
              <NewCustomButton buttonText={status} onPress={SigningIn}
              disabled={pinCode.toString().length !== 4 || phoneNumber.toString().length !== 10} />
            </View>
          </View>
        </View>
        <View style={styles.container }>
          <Text style={griotaStyles.label}>Are You a New User?</Text>
          <View style={{width: '60%', marginBottom: 60}}>
            <Button onPress={Registering} title='Register New Account' />
          </View>
        </View>
          { loginError && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{loginError}</Text>}
          
      </ScrollView>
    
  )
}
export default SignInScreen

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 22,
    },
    newContainer: {
      alignItems: 'center',
      // justifyContent: 'center',
      width: '100%',
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 22,
      paddingBottom: 40,
      backgroundColor: '#D7FCFF',
      marginBottom: 20
    },
    logo: {
        width: 100,
        height: 100,
    },
    link: {
      color: 'blue',
    }
    
})

