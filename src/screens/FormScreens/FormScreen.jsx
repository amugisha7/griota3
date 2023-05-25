import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import CheckBox from '@react-native-community/checkbox';
import { griotaStyles } from '../../../assets/styles/style';

import FormScreen1 from './FormScreen1';
import FormScreen2 from './FormScreen2';
import FormScreen3 from './FormScreen3'; 
import FormScreen4 from './FormScreen4'; 
import FormScreen5 from './FormScreen5'; 
import FormScreen6 from './FormScreen6';
import FormScreen7 from './FormScreen7';
import CustomButton from '../../components/CustomButton/CustomButton';
// import { Auth } from 'aws-amplify';

const FormScreen = ({navigation}) => {

  const [phoneNumber, setPhoneNumber] = useState('abc')
  const[formPage, setFormPage] = useState(1)
  const[salesLastWeek, setSalesLastWeek] = useState()
  const[salesBeforeLastWeek, setSalesBeforeLastWeek] = useState()
  const[businessActivity, setBusinessActivity] = useState()
  const[selectedBusinessType, setSelectedBusinessType] = useState()
  const[selectedBusinessLocation, setSelectedBusinessLocation] = useState()
  const[businessAreaPicBlob, setBusinessAreaPicBlob] = useState()
  const[ownerInBusinessPicBlob, setOwnerInBusinessPicBlob] = useState()
  const[outsideOfBusinessPicBlob, setOutsideOfBusinessPicBlob] = useState()
  const[durationInBsuiness, setDurationInBsuiness] = useState()
  const[age, setAge] = useState()
  const[nationalIDFrontPicBlob, setNationalIDFrontPicBlob] = useState()
  const[fullName, setFullName] = useState()
  const[nationalIDNumber, setNationalIDNumber] = useState()
  const[nextOfKinName, setNextOfKinName] = useState()
  const[nextOfKinRelationship, setNextOfKinRelationship] = useState()
  const[nextOfKinPhoneNumber, setNextOfKinPhoneNumber] = useState()
  const[referee1Name, setReferee1Name] = useState()
  const[referee1PhoneNumber, setReferee1PhoneNumber] = useState()
  const[referee1KnownPeriod, setReferee1KnownPeriod] = useState()
  const[NINofReferee1, setNINofReferee1] = useState()
  const[ref1NationalIDPic, setRef1NationalIDPic] = useState()
  const[referee2Name, setReferee2Name] = useState()
  const[referee2PhoneNumber, setReferee2PhoneNumber] = useState()
  const[referee2KnownPeriod, setReferee2KnownPeriod] = useState()
  const[NINofReferee2, setNINofReferee2] = useState()
  const[ref2NationalIDPic, setRef2NationalIDPic] = useState()
  const [declaration, setDeclaration] = useState(false)
  // useEffect(()=>{

  //   const getPhoneNumber = async()=> {

  //     const user = await Auth.currentAuthenticatedUser();
  
  //     const { attributes } = user;
  //     // console.log('the non state phone number is' , attributes.phone_number)
  //     setPhoneNumber(attributes.phone_number)
  //   }
  //   getPhoneNumber()
  // }, []); 

  const uploadS3 = async()=>{


    console.log('ready to upload')
    showOnConsole()

        // console.log(userPhoneNumber+'nationalID',nationalID)
        // console.log(userPhoneNumber+'nextOfKinNationalID', nextOfKinID)
        // await Storage.put(userPhoneNumber+'nationalIDtest', nationalID)
        // await Storage.put(userPhoneNumber+'nextOfKinNationalIDtest', nextOfKinID)
    }



  const goBack =()=>setFormPage(pg=>pg-1)
  const goNext =()=>setFormPage(formPage + 1)

  const recieveFormData1 = (data) =>{
    const {businessActivity} = data
    setBusinessActivity(businessActivity)
    setFormPage((pg)=>pg+1)
  }

  const recieveFormData2 = () =>{
    setFormPage((pg)=>pg+1)
  }
  
  const receiveFormData3 = (data) =>{
    const {salesLastWeek, salesBeforeLastWeek} = data
    setSalesLastWeek(salesLastWeek);
    setSalesBeforeLastWeek(salesBeforeLastWeek);
    setFormPage(formPage + 1)
  }
  
  const receiveFormData4 = (data) =>{
    const {fullName, nationalIDNumber} = data
    setFullName(fullName);
    setNationalIDNumber(nationalIDNumber);
    setFormPage(formPage + 1)
  }
  
  const receiveFormData5 = (data) =>{
    const {nextOfKinName, nextOfKinRelationship, nextOfKinPhoneNumber} = data
    setNextOfKinName(nextOfKinName);
    setNextOfKinRelationship(nextOfKinRelationship);
    setNextOfKinPhoneNumber(nextOfKinPhoneNumber);
    setFormPage(formPage + 1)
  }
  
  const receiveFormData6 = (data) =>{
    const {referee1Name, referee1PhoneNumber, NINofReferee1} = data
    setReferee1Name(referee1Name);
    setReferee1PhoneNumber(referee1PhoneNumber);
    setNINofReferee1(NINofReferee1);
    setFormPage(formPage + 1)
  }

  const receiveFormData7 = (data) =>{
    const {referee2Name, referee2PhoneNumber, NINofReferee2} = data
    setReferee2Name(referee2Name);
    setReferee2PhoneNumber(referee2PhoneNumber);
    setNINofReferee2(NINofReferee2);
    setFormPage(formPage + 1)
  }

  const showOnConsole=()=>{
    console.log('busienss Activity', businessActivity)
    console.log('Business Type: ', selectedBusinessType)
    console.log('Business Location', selectedBusinessLocation)
    console.log('sales made last week', salesLastWeek)
    console.log('sales made week before last week', salesBeforeLastWeek)
    console.log('pic of the business Area', businessAreaPicBlob)
    console.log('pic of Owner in the business', ownerInBusinessPicBlob)
    console.log('pic of Outside of the business', outsideOfBusinessPicBlob)
    console.log('duration in Business', durationInBsuiness)
    console.log('age of client: ', age)
    console.log('pic of Front of National ID', nationalIDFrontPicBlob)
    console.log('full name is: ', fullName)
    console.log('national ID number is', nationalIDNumber)
    console.log('name of Next of Kin', nextOfKinName)
    console.log('relationship of NOK', nextOfKinRelationship)
    console.log('NOK phone number ', nextOfKinPhoneNumber)
    console.log('Ref1 Name ', referee1Name)
    console.log('Ref1 phone number ',  referee1PhoneNumber)
    console.log('Ref1 Known period ', referee1KnownPeriod)
    console.log('Ref1 NIN ',  NINofReferee1)
    console.log('Ref1 NIN Pic ', ref1NationalIDPic)
    console.log('Ref2 Name ', referee2Name)
    console.log('Ref2 phone number ',  referee2PhoneNumber)
    console.log('Ref2 Known period ', referee2KnownPeriod)
    console.log('Ref2 NIN ',  NINofReferee2)
    console.log('Ref2 NIN Pic ', ref2NationalIDPic)


  }

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#fff8f7', padding: 20}}>
        <View
            style={{display: formPage===1 ?'flex':'none'}}
            >
          <FormScreen1
            setSelectedBusinessLocation={setSelectedBusinessLocation}
            setSelectedBusinessType={setSelectedBusinessType}
            recieveFormData1={recieveFormData1}
          />
        </View>
        <View
          style={{display: formPage===2 ?'flex':'none'}}
          >
          <FormScreen2
            userPhoneNumber={phoneNumber}
            setBusinessAreaPicBlob={setBusinessAreaPicBlob}
            setOwnerInBusinessPicBlob={setOwnerInBusinessPicBlob}
            setOutsideOfBusinessPicBlob={setOutsideOfBusinessPicBlob}
            recieveFormData2={recieveFormData2}
          />
        </View>
      
        <View
          style={{display: formPage===3 ?'flex':'none'}}
          >
          <FormScreen3
            setDurationInBusiness={setDurationInBsuiness}
            receiveFormData3={receiveFormData3}
          />
        </View>
        <View
          style={{display: formPage===4 ?'flex':'none'}}
          >
          <FormScreen4
            setAge={setAge}
            receiveFormData4={receiveFormData4}
            setNationalIDFrontPicBlob={setNationalIDFrontPicBlob}
          />
        </View>
        <View
          style={{display: formPage===5 ?'flex':'none'}}
          >
          <FormScreen5
            receiveFormData5={receiveFormData5}
          />
        </View>
        <View
          style={{display: formPage===6 ?'flex':'none'}}
          >
          <FormScreen6
            setReferee1KnownPeriod={setReferee1KnownPeriod}
            receiveFormData6={receiveFormData6}
            setRef1NationalIDPic={setRef1NationalIDPic}
          />
        </View>
        <View
          style={{display: formPage===7 ?'flex':'none'}}
          >
          <FormScreen7
            setReferee2KnownPeriod={setReferee2KnownPeriod}
            receiveFormData7={receiveFormData7}
            setRef2NationalIDPic={setRef2NationalIDPic}
          />
        </View>
        <View
          style={{display: formPage===8 ?'flex':'none'}}
          >
          <Text style={griotaStyles.title}>Submit Loan Application</Text>
          <Text style={griotaStyles.label}>Declaration</Text>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 40}}>
            <CheckBox
              disabled={false}
              value={declaration}
              onValueChange={(newValue) => setDeclaration(newValue)}
            />
            <Text style={[griotaStyles.text, {textAlign: 'left'}]}>I have not entered false or misleading information.
              I agree that lying would disqualify me from future loans and could be prosecuted</Text>
          </View>
          <View style={{display: declaration?'none':'flex'}}>
            <CustomButton buttonFunction={'Submit Application'} type={'DISABLED'}/>
          </View>
          <View style={{display: declaration?'flex':'none'}}>
            <CustomButton onPress={uploadS3} buttonFunction={'Submit Application'}/>
          </View>
        </View>
        { formPage > 1 &&
          <View>
            <CustomButton onPress={goBack} buttonFunction={'Back'} type={'SECONDARY'}/>
          </View>
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    
  pressable: {
      margin: 10,
      width: '50%'
  },
  
})

export default FormScreen