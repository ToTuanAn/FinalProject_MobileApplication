import React, {PropsWithChildren} from 'react';
import {
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../const/colors';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import HomeScreen from './HomeScreen';

//import SignInScreen from './SignInScreen';

export const AuthenticationScreen = ({navigation}) => {
  return (
    <>
      {/* <Text>Authentication Screen</Text>
      <Text>{title}</Text>
      {children} */}
      
      <View style={style.container}>
      <StatusBar backgroundColor={COLORS.violet} barStyle="light-content"/>
        <View style = {style.header}>
          <Animatable.Image
              animation="pulse"
              
            source={require('../../assets/eth.png')}
            style ={{width: 300, height: 300, borderRadius: 400/ 2}}
            resizeMode="stretch"
          />
        </View>

        <Animatable.View 
            style={[style.footer, {
                backgroundColor: COLORS.white
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[style.title, {
                color: COLORS.black
            }]}>Collecting Best</Text>
            <Text style={[style.title, {
                color: COLORS.black
            }]}>NFT Cryto Art</Text>
            <View style={style.button}>
            <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={['#9F21FD','#01ab9d']}
                    style={style.start}
                > 
                    <Text style={style.textSign}>Start</Text>
                    <MaterialIcons 
                        name="arrow-right"
                        color="#fff"
                        size={20}
                    />
      
                   
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    </>

    
  );
};

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const style = StyleSheet.create({
  imageBg: {
    height: 320,
    width: 220,
    backgroundColor: COLORS.violet,
    marginTop: 70,
    marginHorizontal: 20,
    borderRadius: 40,
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Cochin",
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  scrollView: {

  },
  btn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  container: {
    flex: 1, 
    backgroundColor: COLORS.violet
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
},
text: {
  color: 'grey',
  marginTop:5
},
button: {
  alignItems: 'flex-end',
  marginTop: 30
},
start: {
  width: 180,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  flexDirection: 'row'
},
textSign: {
  color: 'white',
  fontWeight: 'bold'
}
});

export default AuthenticationScreen;