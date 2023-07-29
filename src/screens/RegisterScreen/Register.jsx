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
  const [idPicURL, setIdPicURL] =useState()
  const [bodaData, setBodaData] = useState()
  const [declaration, setDeclaration] = useState(true)
  const [stagesList, setStagesList] = useState()

  useEffect(()=>{
    getStages()
  },[])
  
  useEffect(()=>{
    if(idPicURL && bodaData) {
      registerUser()
    }
  },[idPicURL])

  const getStages = async() => {
    try {
        const stages = await API.graphql(graphqlOperation(
        `query MyQuery {
            listStages {
              items {
                name
                address
              }
            }
          }`
        ))
        if(stages) {
            const listOfStages = stages.data.listStages.items.map(item => `${item.name} (${item.address})`)
            setStagesList(listOfStages)
        }
    }
    catch(e)
    {
        console.log('unable to retrieve boda details ', e)
    }
  }

  const { control, handleSubmit, watch  } = useForm({
    defaultValues: {
      phoneNumber: '',
      firstName: '',
      otherName: '',
      idNumber: '',
      mobileMoneyName: ''
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
  
  const uploadOneToCloudinary = async (file)=>{
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
      setIdPicURL(data.secure_url)
    })
    .catch(e =>console.log('cloudinary error: ', e))
  }

  const registerUser = async() =>{
    try{
      const {phoneNumber, firstName, otherName, idNumber, mobileMoneyName} = bodaData
      const {user} = await Auth.signUp(`+256${phoneNumber.slice(1)}`, phoneNumber)
      if (user){
        navigation.navigate('ConfirmPhoneNumber', {
            phoneNumber, firstName, otherName, selectedStage, idNumber, idPicURL, mobileMoneyName
        })
      }
    } 
    catch(e){
      console.log('unable to sign up ', e);
    }
  }
  
  const createBoda = async (data) => {
    uploadOneToCloudinary(stageIdCardPicFile)
    setBodaData(data)
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
                name='mobileMoneyName'
                mylabel='If the mobile money name is different from your name, enter it here'
                control={control}
                placeholder='Mobile Money Name'
                rules={{
                  required: "This field is required",
                }}
              />
            </View>
          </View>
          <CustomDropDown
              items={stagesList ? stagesList : ['list Loading... PLEASE WAIT']}
              setSelectedItem={setSelectedStage} 
              mylabel={'Select Your Stage'}
          />
          <CustomInput
            name='idNumber'
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
          {selectedStage === 'Select from list' ?
            <Text style={[griotaStyles.errors, {marginVertical: 20}]}>Please select a stage to proceed</Text> : 
            <CustomButton onPress={handleSubmit(createBoda)} buttonFunction={'Register'}/>}
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
    },
    link: {
      color: 'blue',
    }
    
})

