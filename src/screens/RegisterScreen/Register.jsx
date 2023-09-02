import { View, Text, Image, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Griota_logo.png';
import CustomDropDown from '../../components/CustomDropDown/CustomDropDown';
import CustomImageUpload from "../../components/CustomImageUpload/CustomImageUpload";
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import { useForm } from 'react-hook-form';
import {Auth, API, graphqlOperation} from 'aws-amplify'; 
import { griotaStyles } from '../../../assets/styles/style';

const Register = ({navigation}) => {
  
  const [errorMessage, setErrorMessage] = useState()
  const [selectedStage, setSelectedStage] = useState()
  const [stageIdCardPicFile, setStageIdCardPicFile] = useState()
  const [nationalIdPicFile, setNationalIdPicFile] = useState()
  const [stageIdPicURL, setStageIdPicURL] =useState()
  const [nationalIdPicURL, setNationalIdPicURL] =useState()
  const [bodaData, setBodaData] = useState()
  const [declaration, setDeclaration] = useState(true)
  const [stagesList, setStagesList] = useState()
  const [status, setStatus] = useState('Register')
  const [displayCheck, setDisplayCheck] = useState()

  useEffect(()=>{
    getStages()
  },[])
  
  useEffect(()=>{
    if(stageIdPicURL && bodaData && nationalIdPicURL) {
      registerUser()
    }
  },[nationalIdPicURL])

  useEffect(()=>{
    selectedStage === 'Select from list' || selectedStage === undefined ? setDisplayCheck(false) : setDisplayCheck(true);
    console.log('Stage: ', selectedStage)
  },[selectedStage])

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
      setErrorMessage('Error. Please contact support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)
      console.log(e) 
    }
  }

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      phoneNumber: '',
      firstName: '',
      otherName: '',
      stageIdNumber: '',
      nationalIdNumber: '',
      mmName: ''
    }
  });

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
      // console.log('cloudinary resp: ', data.secure_url)
      setStageIdPicURL(data.secure_url)
    })
    .catch(e =>{
      console.log('Error uploading StageID: ', e)
      setErrorMessage('Error. Please contact support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)
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
      // console.log('cloudinary resp: ', data.secure_url)
      setNationalIdPicURL(data.secure_url)
    })
    .catch(e =>{
      console.log('Error uploading NationalID: ', e)
      setErrorMessage('Error. Please contact support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)
    })
  }

  const registerUser = async() =>{
    try{
      const {phoneNumber, firstName, otherName, stageIdNumber, nationalIdNumber, mmName} = bodaData
      let mobileMoneyName;
      if(mmName === '')
        {mobileMoneyName = `${firstName} ${otherName}`}
      else{
        mobileMoneyName = mmName;
      }
      const {user} = await Auth.signUp(`+256${phoneNumber.slice(1)}`, phoneNumber)
      if (user){
        setStatus("Register")
        navigation.navigate('ConfirmPhoneNumber', {
            phoneNumber, firstName, otherName, selectedStage, stageIdNumber, nationalIdNumber, 
            stageIdPicURL, mobileMoneyName, nationalIdPicURL
        })
      }
    } 
    catch(e){
      console.log('Error creating User: ', e)
      setErrorMessage('Error. Please contact support')
      setTimeout(()=> navigation.navigate('WelcomeScreen'), 3000)    
    }
  }
  
  const createBoda = async (data) => {
    setStatus('Registering...')
    setBodaData(data)
    uploadStageIdToCloudinary(stageIdCardPicFile)
    uploadNationalIdToCloudinary(nationalIdPicFile)
    // .then(()=>registerUser(phoneNumber))
    // .then(()=>
  }

  return (
      <ScrollView>
        <View style={styles.container }>
          <Image source={Logo} style={styles.logo}/>
          <Text style={styles.title}>Create an Account</Text>
          {errorMessage && <Text style={[griotaStyles.errors, {marginVertical: 20}]}>{errorMessage}</Text>}
          <CustomInput
            name='firstName'
            mylabel='Enter your first name'
            control={control}
            placeholder=''
            rules={{
              required: "This field is required",
            }}
          />
          <CustomInput
            name='otherName'
            mylabel='Enter your other names'
            control={control}
            placeholder=''
            rules={{
              required: "This field is required",
            }}
          />
          <CustomInput
            name='phoneNumber'
            placeholder='Phone Number (07xxxxxxxx)'
            mylabel='Enter the Phone Number you will use to receive loans and make payment'
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
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
            <CheckBox
              disabled={false}
              value={declaration}
              onValueChange={(newValue) => setDeclaration(newValue)}
            />
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>The Mobile Money Name is the same as my name</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 10 }}>
            <View style={{display: declaration?'none':'flex'}}>
              <CustomInput
                name='mmName'
                mylabel='If the mobile money name is different from your name, enter it here'
                control={control}
                placeholder='Mobile Money Name'                
              />
            </View>
          </View>
          <CustomDropDown
              items={stagesList ? stagesList : ['list Loading... PLEASE WAIT']}
              setSelectedItem={setSelectedStage} 
              mylabel={'Select Your Stage'}
          />
          <CustomInput
            name='stageIdNumber'
            mylabel='Enter your Stage ID as shown on your stage card'
            control={control}
            placeholder=''
            rules={{
              required: "This field is required",
            }}
          />
          <CustomImageUpload
              mylabel={'Upload picture of your Stage Card'}
              setBlobValue={setStageIdCardPicFile}/>
          <CustomInput
            name='nationalIdNumber'
            mylabel='Enter your National ID Number (NIN)'
            control={control}
            placeholder=''
            rules={{
              required: "This field is required",
            }}
          />
          <CustomImageUpload
              mylabel={'Upload picture of your National ID'}
              setBlobValue={setNationalIdPicFile}/>
          <View style={{display: displayCheck ? 'none' : 'flex'}}>
            <Text style={[griotaStyles.errors, {marginBottom: 40}]}>Please select a Stage</Text>  
          </View>
          {!stageIdCardPicFile && !nationalIdPicFile &&
            <View style={{marginBottom: 10}}>
              <Text style={{color: 'red', marginBottom: 20}}>PLEASE PROVIDE ALL THE DETAILS</Text>
            </View>}
          {stageIdCardPicFile && nationalIdPicFile && 
          <View>
            <View style={{display: displayCheck ? 'flex' : 'none'}}>
              <CustomButton onPress={handleSubmit(createBoda)} buttonFunction={status}/>
            </View>
            <Text style={{fontSize: 12}}>By registering you accept the{' '}
              <Text style={styles.link} onPress={goToTermsOfUse}>Terms of Use{' '}</Text>and {' '}
              <Text style={styles.link} onPress={goToPrivacyPolicy}>Privacy Policy</Text>
            </Text>
            <View style={{marginTop: 20}}>
              <Text>Already have an account?</Text>
            </View>
            <View style={{width: '50%'}}>
              <CustomButton onPress={goToSignIn} buttonFunction={'Sign In'} type='SECONDARY'/>
            </View>
          </View>}
        
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
    },
    link: {
      color: 'blue',
    }
    
})

