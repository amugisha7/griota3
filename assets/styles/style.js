import { StyleSheet } from "react-native"

export const griotaStyles = StyleSheet.create({

    container: {
        width: '100%',
        marginBottom: 20
    },    
    label: {
        flexWrap: 'wrap',
        fontWeight: 600,
        marginTop: 20,
        lineHeight: 26,
        fontSize: 18,
        color: 'black',
        marginBottom: 10
    },
    text: {
        // flexWrap: 'wrap',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: 24,
        fontSize: 16,
        color: 'black',
        marginTop: 5
    }, 
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtitle: {
        flexWrap: 'wrap',
        fontSize: 20,
        fontWeight: 600,
        marginVertical: 20,
        color: 'blue',
    },
    title: {
        flexWrap: 'wrap',
        fontSize: 24,
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 20,
        color: 'blue',
        borderBottomColor: 'blue',
        paddingBottom: 10, 
        borderBottomWidth: 1
    },
    errors: {
        color: 'red',
        fontSize: 12,
        marginHorizontal: 10
      },
})