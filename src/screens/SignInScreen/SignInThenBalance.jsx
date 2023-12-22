import { View, Text, Image, StyleSheet, Linking, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png'
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import {Auth, Notifications} from 'aws-amplify'; 
import { useRoute } from '@react-navigation/native';
import { griotaStyles } from '../../../assets/styles/style';
import { adminUsers } from '../../Lists/adminUsers';
import {checkPermissions} from '../../resources/requestPermissions'
import DeepLinking from 'react-native-deep-linking';
import { API, graphqlOperation } from "aws-amplify";
import CustomNumberInput from '../../components/CustomNumberInput';
import NewCustomButton from '../../components/NewCustomButton';

const SignInThenBalance = ({navigation}) => {
  
  const route = useRoute()
  const admin = route?.params?.admin
  const title = admin ? 'Admin Login' : 'Sign In to Check Loan Balance'

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
  const [status, setStatus] = useState('Sign In')
  const [adminObject, setAdminObject] = useState({})
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pinCode, setPinCode] = useState('')

  useEffect(()=>{setLoginError(null)},[])

  useEffect(()=>{
    checkPermissions()
    admin && getAdmins()
  },[])

  const getAdmins = async() => {
    try {
      const admins = await API.graphql(graphqlOperation(
        `query MyQuery {
          listAdminstrators {
            items {
              phoneNumber
              level
            }
          }
        }`
      ))
      if(admins) {
        const adminObj = {}
        for(let i = 0; i < admins.data.listAdminstrators.items.length; i++) {
          if(!adminObj[`+256${admins.data.listAdminstrators.items[i].phoneNumber.slice(1)}`]) {
            adminObj[`+256${admins.data.listAdminstrators.items[i].phoneNumber.slice(1)}`] = 
            admins.data.listAdminstrators.items[i].level
          }
        }
        setAdminObject(adminObj)
      }
    }catch(e){
      setLoginError(`ERROR: ${e.message}`)
      setTimeout(()=>setLoginError(null), 5000)
    }
  }

  const SigningIn = async () => {
    setStatus('Signing In...')
    try { 
      const user = await Auth.signIn(`+256${phoneNumber.slice(1)}`, `00${pinCode}`)
      if(user){
        if(adminObject[user.attributes.phone_number]){
          const level = adminObject[user.attributes.phone_number]
          navigation.navigate('AdminScreen', {level})
        }else{
          navigation.navigate('CheckLoanBalance', {phoneNumber})
        }
      }
    }catch(e){
      setLoginError(`ERROR: ${e.message}`)
      setTimeout(()=>setLoginError(null), 5000)
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
          <Text style={griotaStyles.title}>{title}</Text>
          <View style={styles.newContainer }>
            <CustomNumberInput handleChange={setPhoneNumber} numberOfInputs={10}
              label={'Phone Number'}
              />
            {!PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 && 
            <Text style={griotaStyles.errors}>Invalid Phone Number</Text>}
            <CustomNumberInput handleChange={setPinCode} numberOfInputs={4}
              label={'PIN Code'}
              />
            <View style={{marginTop: 10, width: '100%'}}>
              <NewCustomButton buttonText={status} onPress={SigningIn}
              disabled={pinCode.toString().length !== 4 || phoneNumber.toString().length !== 10 
                || !PHONE_REGEX.test(phoneNumber) || status !== "Sign In"} />
            </View>
            {loginError && <Text style={griotaStyles.errors}>{loginError}</Text>}
          </View>
        </View>
      </ScrollView>
    
  )
}
export default SignInThenBalance

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

