import { View, Text, Image, StyleSheet, Alert, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown';
import CustomImageUpload from "../../components/CustomImageUpload/CustomImageUpload";
import CustomButton from '../../components/CustomButton/CustomButton';
import {Auth, API, graphqlOperation} from 'aws-amplify'; 
import { griotaStyles } from '../../../assets/styles/style';
import CustomNumberInput from '../../components/CustomNumberInput';
import RadioButtons from '../../components/RadioButtons';
import * as Progress from 'react-native-progress';
import NavButton from '../../components/NavButton';

const NewTextInput = ({text, onChangeText, label})=>{
  return (
    <View style={griotaStyles.container}>
      <Text style={griotaStyles.label}>{label}</Text>
      <TextInput 
        style={styles.textInput}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  )
}

const Register = ({navigation, route}) => {
  
  const [errorMessage, setErrorMessage] = useState()
  const [selectedStage, setSelectedStage] = useState()
  const [stageIdCardPicFile, setStageIdCardPicFile] = useState()
  const [nationalIdPicFile, setNationalIdPicFile] = useState()
  const [stageIdPicURL, setStageIdPicURL] =useState()
  const [nationalIdPicURL, setNationalIdPicURL] =useState()
  const [noInName, setNoInName] = useState(1)
  const [stagesList, setStagesList] = useState()
  const [status, setStatus] = useState('REGISTER')
  const [page, setPage] = useState(1)
  const {division} = route.params; 
  //new states
  const [firstName, seFirstName] = useState('')
  const [otherName, seOtherName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0o70)
  const [nationalIdNumber, setNationalIdNumber] = useState()
  const [mmName, setMmName] = useState()
  
  useEffect(()=>{
    getStages()
  },[])

  useEffect(()=>{
    stageIdPicURL && uploadNationalIdToCloudinary(nationalIdPicFile)
  }, [stageIdPicURL])
  
  useEffect(()=>{
    nationalIdPicURL && registerUser()
  }, [nationalIdPicURL])

  const getStages = async() => {
    try {
        const stages = await API.graphql(graphqlOperation(
        `query MyQuery {
            listStages {
              items {
                name
              }
            }
          }`
        ))
        if(stages) {
            const listOfStages = stages.data.listStages.items.map(item => `${item.name}`)
            listOfStages.sort()
            listOfStages.unshift('Select from list')
            setStagesList(listOfStages)
        }
    }
    catch(e)
    {
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }

  const PHONE_REGEX = /^07\d{8}$/

  const goToPrivacyPolicy =()=>{
    Alert.alert(
      'Privacy',
      'Please visit our website www.griota.com to read our privacy policy'
    )
  }

  const goToTermsOfUse =()=>{
    Alert.alert(
      'Terms of Use',
      'Please visit our website www.griota.com to read our privacy policy'
    )
  }

  const goToSignIn = () => {navigation.navigate('SignIn')}
  
  const uploadStageIdToCloudinary = async (file)=>{
    const formData = new FormData();
    let base64Img = `data:image/jpg;base64,${file.assets[0].base64}`
    formData.append("upload_preset", "lagiua2k")
    formData.append("file", base64Img);
    fetch('https://api.cloudinary.com/v1_1/djtx8rz4q/upload', {
      body: formData,
      method: "POST", 
    })
    .then(async r => {
      let data = await r.json()
      setStageIdPicURL(data.secure_url)
    }) 
    .catch(e =>{
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    })
  }
  const uploadNationalIdToCloudinary = async (file)=>{
    const formData = new FormData();
    let base64Img = `data:image/jpg;base64,${file.assets[0].base64}`
    formData.append("upload_preset", "lagiua2k")
    formData.append("file", base64Img);
    fetch('https://api.cloudinary.com/v1_1/djtx8rz4q/upload', {
      body: formData,
      method: "POST", 
    })
    .then(async r => {
      let data = await r.json()
      setNationalIdPicURL(data.secure_url)
    })
    .catch(e =>{
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    })
  }

  const registerUser = async() =>{
    try{
      const mobileMoneyName = mmName || `${firstName} ${otherName}`
      const {user} = await Auth.signUp(`+256${phoneNumber.slice(1)}`, phoneNumber)
      if (user){
        setStatus("REGISTER")
        navigation.navigate('ConfirmPhoneNumber', {
          phoneNumber, firstName, otherName, selectedStage, nationalIdNumber, 
          stageIdPicURL, mobileMoneyName, nationalIdPicURL
        })
      }
    } 
    catch(e){
      setErrorMessage(`ERROR: ${e.message}`)
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }
  
  const createBoda = () => {
    setStatus('Registering...')
    uploadStageIdToCloudinary(stageIdCardPicFile)
  }
  const increment = () => setPage(p => p+1)
  const decrement = () => setPage(p => p-1)
  const backButtonColor = '#00A9FF'

  return (
      <ScrollView>
        <View style={styles.container }>
          <View style={{width: '100%', marginBottom: 40, alignItems: 'center'}}>
            <Progress.Bar progress={page/5.01} width={300} color={'blue'}/>
          </View>
          {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
    {/*page 1 stage name*/}      
          <View style={{display: page === 1 ? 'flex': 'none', width: '100%'}}>
            <Text style={griotaStyles.title}>Select Your Stage</Text>
            <CustomDropDown
                items={stagesList ? stagesList : ['list Loading... PLEASE WAIT']}
                setSelectedItem={setSelectedStage}
                mylabel={`Which Stage in ${division} Division are you registered at?`}
            />
            <View style={styles.navContainer}>
              <NavButton buttonText={'BACK'}  buttonChange={() => navigation.navigate('SelectDivision')} 
                buttonColor={backButtonColor} buttonDisabled={false}
              />
              <NavButton buttonText={'NEXT'}  buttonChange={increment} 
                buttonColor={selectedStage === 'Select from list' || selectedStage === undefined ? 'grey' : 'blue'}
                buttonDisabled={selectedStage === 'Select from list' || selectedStage === undefined ? true : false}
              />
            </View>
          </View>
      {/*page 2 Name*/}
          <View style={{display: page === 2 ? 'flex': 'none', width: '100%'}}>
            <Text style={griotaStyles.title}>What is Your Name?</Text>
            <NewTextInput text={firstName} onChangeText={seFirstName} label={'First Name'}/>
            <NewTextInput text={otherName} onChangeText={seOtherName} label={'Last Name'}/>
            <View style={styles.navContainer}>
              <NavButton buttonText={'BACK'}  buttonChange={decrement} 
                buttonColor={backButtonColor} buttonDisabled={false}
              />
              <NavButton buttonText={'NEXT'}  buttonChange={increment} 
                buttonColor={firstName === '' || otherName === '' || !firstName || !otherName  ? 'grey' : 'blue'}
                buttonDisabled={firstName === '' || otherName === '' || !firstName || !otherName ? true : false}
              />
            </View>
          </View>
      {/* page 3 for Phone Number */}
          <View style={{display: page === 3 ? 'flex': 'none', width: '100%'}}>
            <Text style={griotaStyles.title}>Phone Number</Text>
            <CustomNumberInput handleChange={setPhoneNumber} numberOfInputs={10}
              label={'Enter the Phone Number you will use to receive money and make payment'}
            />
            {!PHONE_REGEX.test(phoneNumber) && String(phoneNumber).length === 10 && <Text style={griotaStyles.errors}>Invalid Phone Number</Text>}
            <Text style={[griotaStyles.label, {textAlign: 'left', marginTop: 40}]}>
              Is this Phone Number registered in your name?
            </Text>
            <RadioButtons options={[{id: 1, label: 'YES', value: true}, 
              {id: 2, label: 'NO', value: false} ]} setChosen={setNoInName}/>
            <View style={{flex: 1, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{display: noInName === 1 ?'none':'flex'}}>
                <NewTextInput 
                  label={'What name is this phone number registered in?'}
                  text={mmName} 
                  onChangeText={setMmName}/>
              </View>
            </View>
            <View style={styles.navContainer}>
              <NavButton buttonText={'BACK'}  buttonChange={decrement} 
                buttonColor={backButtonColor} buttonDisabled={false}
              />
              <NavButton buttonText={'NEXT'}  buttonChange={increment} 
                buttonColor={!PHONE_REGEX.test(phoneNumber) || (noInName === 2 && !mmName)  
                  ? 'grey' : 'blue'}
                buttonDisabled={!PHONE_REGEX.test(phoneNumber) || (noInName === 2 && !mmName)
                  ? true : false}
              />
            </View>
          </View>
      {/* page 4 for the Stage Card */}
          <View style={{display: page === 4 ? 'flex': 'none', width: '100%'}}>
            <Text style={griotaStyles.title}>Stage Card</Text>
            <CustomImageUpload
                mylabel={'Upload picture of your Stage Card (or picture of the receipt for payment of the Stage Card)'}
                setBlobValue={setStageIdCardPicFile}/>
            <View style={styles.navContainer}>
              <NavButton buttonText={'BACK'}  buttonChange={decrement} 
                buttonColor={backButtonColor} buttonDisabled={false}
              />
              <NavButton buttonText={'NEXT'}  buttonChange={increment} 
                buttonColor={!stageIdCardPicFile  ? 'grey' : 'blue'}
                buttonDisabled={!stageIdCardPicFile ? true : false}
              />
            </View>
          </View>
      {/* page 5 for the national Id and submission. */}
          <View style={{display: page === 5 ? 'flex': 'none', width: '100%'}}>
            <Text style={griotaStyles.title}>Register</Text>
            <NewTextInput 
              label={'Enter your National ID Number (NIN)'}
              text={nationalIdNumber} 
              onChangeText={setNationalIdNumber}/>
            <CustomImageUpload
                mylabel={'Upload picture of your National ID'}
                setBlobValue={setNationalIdPicFile}/>
            <View style={styles.navContainer}>
              <NavButton buttonText={'BACK'}  buttonChange={decrement} 
                buttonColor={backButtonColor} buttonDisabled={false}
              />
              <NavButton buttonText={status}  buttonChange={createBoda} 
                buttonColor={!nationalIdPicFile || !nationalIdNumber || status === 'Registering...'
                  ? 'grey' : 'blue'}
                buttonDisabled={!nationalIdPicFile || !nationalIdNumber || status === 'Registering...'
                  ? true : false}
              />
            </View>
            <View>
              <Text style={{fontSize: 12}}>By registering you accept the{' '}
                <Text style={styles.link} onPress={goToTermsOfUse}>Terms of Use{' '}</Text>and {' '}
                <Text style={styles.link} onPress={goToPrivacyPolicy}>Privacy Policy</Text>
              </Text>
              <View style={{marginTop: 40, alignItems: 'center'}}>
                <Text>Already have an account?</Text>
                <CustomButton onPress={goToSignIn} buttonFunction={'Sign In'} type='SECONDARY'/>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    
  )
}
export default Register

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20
    },
    logo: {
      width: 100,
      height: 100
    },
    navContainer: {
      display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', 
      width: '100%', marginVertical: 40
    },
    textInput: {
      color: 'darkblue',
      padding: 10,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor: 'white',
      minHeight: 30,
      justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
    },
    link: {
      color: 'blue',
    },
    pressable: {
      width: '40%', alignItems: 'center', padding: 15, 
    }
    
})

