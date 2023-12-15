import { StyleSheet, Text, Pressable, View, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { griotaStyles } from '../../../assets/styles/style'

const CustomImageUpload = ({ setImageExtension, setBlobValue, mylabel}) => {

    const [pic, setPic] = useState(null)

    const options = {
      includeBase64: true,
      maxWidth: 600,
      maxHeight: 600
    }
    
    async function setImageFromGallery() {
      const image = await launchImageLibrary(options)
      setPic(image.assets[0].uri)
      setBlobValue(image) //make a setBlob state method in parent equal to blobValue. 
      
    }
    
    async function setImageFromCamera() {
      const image = await launchCamera(options)
      setPic(image.assets[0].uri)
      setBlobValue(image) //make a setBlob state method in parent equal to blobValue. 
      
    }

  return (
    <View style={styles.container}>
      {mylabel && <Text style={griotaStyles.label}>{mylabel}</Text>}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {
          !pic && 
          <>
            <View style={styles.pressableContainer}>
              <Pressable  onPress={setImageFromGallery}>
                  <Text style={styles.promptText}>UPLOAD PICTURE</Text>
              </Pressable>
            </View>
            <View style={styles.pressableContainer}>
              <Pressable  onPress={setImageFromCamera}>
                  <Text style={styles.promptText}>OPEN CAMERA</Text>
              </Pressable>
            </View>
            <Text style={griotaStyles.errors}>No Image selected</Text>
          </>
        }
        {
          pic && 
          <View style={{flex: 1}}>
            <View style={{width: '100%', backgroundColor: '#F6F6F6', height: 250}}>
              <Image source={{uri: pic}} style={styles.image}/>
            </View>
            <View style={{marginVertical: 5}}>
              <Pressable  onPress={()=>setPic(null)}>
                  <Text style={[griotaStyles.errors, {color: 'purple'}]}>DELETE</Text>
              </Pressable>
            </View>
          </View>
        }
      </View>
    </View>
  )
}

export default CustomImageUpload

const styles = StyleSheet.create({
    
    container: {
        marginVertical: 30,
        width: '100%',
        paddingHorizontal: 20
    },
    errors: {
      color: 'red',
      fontSize: 14
    },
    pressableContainer: {
        maxWidth: 150, 
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#fff1cc',
        margin: 10
    },
    promptText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 500,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'contain', 
       
    }

})
