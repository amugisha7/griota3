/**
 * @format
 */

import {AppRegistry, Linking, Text} from 'react-native';
import App from './App';
import oldApp from './oldApp';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { Amplify, Notifications } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import DeepLinking from 'react-native-deep-linking';
import { Children, createContext, useContext, useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import NotConnected from "./src/resources/NotConnected"

Amplify.configure(awsconfig);
Notifications.Push.enable();

DeepLinking.addScheme('griota://');

const RootComponent = () => {

  const [connected, setConnected] = useState()
  const [tokenReceived, setTokenReceived] = useState()
  const [adminRoute, setAdminRoute] = useState()
  
  //CHECKING INTERNET CONNECTIVITY
  useEffect(()=>{
    NetInfo.addEventListener(state => {
      setConnected(state.isConnected) 
    });
  },[connected])

  //GETTING THE NOTIFICATION TOKEN. 
  // const myTokenReceivedHandler = (token) => {
  //   console.log('Token in Index', token); 
  //   token && setTokenReceived(token)
  // };
  // useEffect(()=>{
  //   const listener = Notifications.Push.onTokenReceived(myTokenReceivedHandler);
  //   listener.handleEvent(); 
  //   setReady(true) 
  //   // listener.remove(); // Remember to remove the listener when it is no longer needed
  // },[ready])

  const TokenContext = createContext()

  return (
    <TokenContext.Provider value={{tokenReceived, adminRoute}}>
      {!connected && <NotConnected />}
      {/* {!tokenReceived && connected && <Text>Loading</Text>} */}
      {connected && <App adminRoute={{adminRoute}}/>}
    </TokenContext.Provider>
  )
  
}
  
AppRegistry.registerComponent(appName, () => RootComponent);
