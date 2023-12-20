import React, {useState} from 'react';
import SignInThenApply from './src/screens/SignInScreen/SignInThenApply';
import SignInThenBalance from './src/screens/SignInScreen/SignInThenBalance';
import Register from './src/screens/RegisterScreen/Register';
import SelectDivision from './src/screens/RegisterScreen/SelectDivision';
import ConfirmPhoneNumber from './src/screens/ConfirmPhoneNumber/ConfirmPhoneNumber';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';
import { View, Text, Dimensions, BackHandler } from 'react-native';
import FormScreen from './src/screens/FormScreens/FormScreen';
import Tester from './src/screens/Tester';
import ResetPassword from './src/screens/ResetPassword/ResetPassword';
import AdminScreen from './src/screens/AdminScreen/AdminScreen';
import ApplicationReceived from './src/screens/ApplicationReceived/ApplicationReceived';
import CreateNewPin from './src/screens/CreateNewPin/CreateNewPin';
import ApplyForLoan from './src/screens/ApplyForLoan/ApplyForLoan';
import AddPayment from './src/screens/AdminScreen/Payments/AddPyament';
import CreateStage from './src/screens/AdminScreen/Stages/CreateStage';
import CreateLoan from './src/screens/AdminScreen/Loans/CreateLoan';
import CreateLoanFromApplications from './src/screens/AdminScreen/Loans/CreateLoanFromApplications';
import ApprovedLoans from './src/screens/AdminScreen/Loans/ApprovedLoans';
import LoanStatementAdmin from './src/screens/AdminScreen/Loans/LoanStatementAdmin'
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen'
import PaymentInstructions from './src/screens/WelcomeScreen/PaymentInstructions'
import ContactUs from './src/screens/WelcomeScreen/ContactUs'
import CheckLoanBalance from './src/screens/CheckLoanBalance/CheckLoanBalance'
import CheckLoanBalanceAdmin from './src/screens/AdminScreen/Loans/CheckLoanBalanceAdmin';
import ViewBorrowers from './src/screens/AdminScreen/Borrowers/ViewBorrowers';
import SelectStageToView from './src/screens/AdminScreen/Borrowers/SelectStageToView';
import SelectApplicationDate from './src/screens/AdminScreen/Applications/SelectApplicationDate';
import ConfirmApplication from './src/screens/ConfirmApplication/ConfirmApplication';

Amplify.configure(config)

const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
console.log('Screen width:', screenWidth);

// BackHandler.addEventListener('hardwareBackPress', ()=> {
//   BackHandler.exitApp()
// });

const App= () => {
  
  return (
    
     <NavigationContainer>
       <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}}>
        
           <Stack.Screen name='SignInThenApply' component={SignInThenApply} />
           <Stack.Screen name='SignInThenBalance' component={SignInThenBalance} />
           <Stack.Screen name='Register' component={Register} />
           <Stack.Screen name='SelectDivision' component={SelectDivision} />
           <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
           <Stack.Screen name='ConfirmPhoneNumber' component={ConfirmPhoneNumber} />
           <Stack.Screen name='FormScreen' component={FormScreen} />
           <Stack.Screen name='Tester' component={Tester} />
           <Stack.Screen name='ResetPassword' component={ResetPassword} />
           <Stack.Screen name='AdminScreen' component={AdminScreen} />
           <Stack.Screen name='ApplicationReceived' component={ApplicationReceived} />
           <Stack.Screen name='CreateNewPin' component={CreateNewPin} />
           <Stack.Screen name='ApplyForLoan' component={ApplyForLoan} />
           <Stack.Screen name='ConfirmApplication' component={ConfirmApplication} />
           <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
           <Stack.Screen name='ContactUs' component={ContactUs} />
           <Stack.Screen name='PaymentInstructions' component={PaymentInstructions} />
           <Stack.Screen name='CheckLoanBalance' component={CheckLoanBalance} />
           <Stack.Screen name='CheckLoanBalanceAdmin' component={CheckLoanBalanceAdmin} />
           <Stack.Screen name='AdminScreen/AddPayment' component={AddPayment} />
           <Stack.Screen name='AdminScreen/CreateStage' component={CreateStage} />
           <Stack.Screen name='AdminScreen/CreateLoan' component={CreateLoan} />
           <Stack.Screen name='AdminScreen/CreateLoanFromApplications' component={CreateLoanFromApplications} />
           <Stack.Screen name='AdminScreen/ApprovedLoans' component={ApprovedLoans} />
           <Stack.Screen name='AdminScreen/ViewBorrowers' component={ViewBorrowers} />
           <Stack.Screen name='AdminScreen/SelectStageToView' component={SelectStageToView} />
           <Stack.Screen name='AdminScreen/SelectApplicationDate' component={SelectApplicationDate} />
           <Stack.Screen name='LoanStatementAdmin' component={LoanStatementAdmin} />

       </Stack.Navigator>
     </NavigationContainer>
    
  )  
}
export default App; 


