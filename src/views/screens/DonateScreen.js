import {Linking,Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
    TextInput,
    SafeAreaView,
    ScrollView,
    Button,
} from 'react-native';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
const DonateScreen = ({navigation}) => {

    const linkUrl = 'https://github.com/ToTuanAn/FinalProject_MobileApplication';
    const handlePress = React.useCallback(async () => {

        const supported = await Linking.canOpenURL(linkUrl);
    
        if (supported) {
          
          await Linking.openURL(linkUrl);
        } else {
          Alert.alert(`Don't know how to open this URL: ${linkUrl}`);
        }
      }, [linkUrl]);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
        <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.goBack('HomeScreen')}
        >
            <Icon name="arrow-left" size={30} />
        </TouchableOpacity>
        <View style={styles.title}>
            <Text style={styles.titleText}>DONATION</Text>
        </View>
    </View>
    
        <Animatable.Image
            animation="pulse"
            interationCount="infinite"
            source={require('../../assets/donate3.png')}
            style={{width: 320, height: 280, borderRadius: 250}}
            resizeMode="stretch"
    
            />
        <View style = {{
            marginTop : 40
        }}>
            <Text style ={{
                fontSize : 35,
                fontWeight : 'bold',
                textAlign: 'center'
            }}>
            Actions speak louder than words. Start donating today
            </Text>
        </View>

        <TouchableOpacity style = {styles.btn} onPress={handlePress}>
         
            <Text style={{
                fontSize : 30,
                color : COLORS.black,
            }}>Donate</Text>
        </TouchableOpacity>
   
    </SafeAreaView>
  )
}

export default DonateScreen;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLORS.light,
        color: 'white',
        textAlign: 'center',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        marginTop: 40,
        width : 250,
        alignItems : 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 25,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#e6acfa',
        alignContent : 'center',
        alignItems : 'center',

    },
    backArrow: {
        marginLeft: 10,
    },
    title: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleText: {fontSize: 30, marginRight: 40, fontWeight: 'bold'},

    getStarted: {
        // backgroundColor: COLORS.violet,
        color: 'white',
        textAlign: 'center',
        marginHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 50,
        marginTop: 20,
    },
})