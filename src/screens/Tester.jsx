import React, {useState, useEffect} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import DeepLinking from 'react-native-deep-linking';

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      console.log('URL: ', initialUrl)
      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return {url, processing};
};

const Tester = ({navigation}) => {
  const {url: initialUrl, processing} = useInitialURL();

  DeepLinking.addRoute('/register', (response) => {
    navigation.navigate("Register");
  });
  // manage Linking event listener with useEffect
  useEffect(() => {
   Linking.addEventListener('url', handleOpenURL);
    return (() => {
      Linking.removeEventListener('url', handleOpenURL);
    })
  }, []);
  // evaluate every incoming URL
  const handleOpenURL = (event) => {
    DeepLinking.evaluateUrl(event.url);
  }

  return (
    <View style={styles.container}>
      <Text>
        {processing
          ? 'Processing the initial url from a deep link'
          : `The deep link is: ${initialUrl || 'None'}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tester;