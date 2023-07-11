import React, {useState} from 'react';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import Register from './src/screens/RegisterScreen/Register';
import ConfirmPhoneNumber from './src/screens/ConfirmPhoneNumber/ConfirmPhoneNumber';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';
import { View, Text, Dimensions } from 'react-native';
import FormScreen from './src/screens/FormScreens/FormScreen';
import Tester from './src/screens/Tester';
import ResetPassword from './src/screens/ResetPassword/ResetPassword';
import AdminScreen from './src/screens/AdminScreen/AdminScreen';
import ApplicationReceived from './src/screens/ApplicationReceived/ApplicationReceived';
import CreateNewPin from './src/screens/CreateNewPin/CreateNewPin';
import ApplyForLoan from './src/screens/ApplyForLoan/ApplyForLoan';

Amplify.configure(config)

const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
console.log('Screen width:', screenWidth);

const App= () => {
  
  return (
    
     <NavigationContainer>
       <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
        
           <Stack.Screen name='SignIn' component={SignInScreen} />
           <Stack.Screen name='Register' component={Register} />
           <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
           <Stack.Screen name='ConfirmPhoneNumber' component={ConfirmPhoneNumber} />
           <Stack.Screen name='FormScreen' component={FormScreen} />
           <Stack.Screen name='Tester' component={Tester} />
           <Stack.Screen name='ResetPassword' component={ResetPassword} />
           <Stack.Screen name='AdminScreen' component={AdminScreen} />
           <Stack.Screen name='ApplicationReceived' component={ApplicationReceived} />
           <Stack.Screen name='CreateNewPin' component={CreateNewPin} />
           <Stack.Screen name='ApplyForLoan' component={ApplyForLoan} />

       </Stack.Navigator>
     </NavigationContainer>
    
    
  )  
}
export default App; 


