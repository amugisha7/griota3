import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { griotaStyles } from '../../../assets/styles/style'
import { Pressable } from 'react-native'

const SelectDivision = ({navigation}) => {
  return (
    <ScrollView>
        <View style={{flexDirection: 'column', padding: 22, gap: 20}}>
            <Text style={griotaStyles.title}>Select Your Division</Text>
            <View style={[griotaStyles.shadow, {backgroundColor: 'blue', padding: 10}]}>
                <Pressable style={{width: '100%'}}
                    onPress={()=>navigation.navigate('Register', {division: 'Kira'})}>
                    <Text style={[griotaStyles.title, {color: '#ffffff'}]}>Kira Division</Text>
                    <Text style={[griotaStyles.text, {color: '#ffffff'}]}>
                        Buwate, Bulindo, Kira, Kitukutwe, Kungu, Najjera
                    </Text>
                </Pressable>
            </View>
            <View style={[{backgroundColor: 'grey', padding: 10}]}>
                <Text style={[griotaStyles.title, {color: '#ffffff',  borderBottomColor: 'grey'}]}>{`Nakawa (Kampala)`}</Text>
                <Text style={[griotaStyles.text, {color: '#ffffff'}]}>
                    Bugoloobi, Bukoto, Butabika, Kiswa, Kiwaatule, Kyambogo, Kyanja, Luzira, Mbuya, Mutungo, Nabisunsa, Naguru, Nakawa, Ntinda
                </Text>
            </View>
            <View style={[{backgroundColor: 'grey', padding: 10}]}>
                <Text style={[griotaStyles.title, {color: '#ffffff', borderBottomColor: 'grey'}]}>{`Kawempe (Kampala)`}</Text>
                <Text style={[griotaStyles.text, {color: '#ffffff'}]}>
                    Bwaise, Kanyanya, Kawempe, Kazo, Kikaya, Kisaasi, Komamboga, Makerere, Mpererwe, Mulago, Wandegeya
                </Text>
            </View>
        </View>
    </ScrollView>
  )
}

export default SelectDivision