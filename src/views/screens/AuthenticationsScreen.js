import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../const/colors';
import * as Animatable from 'react-native-animatable';
import {GradientButton} from '../../components';

export const AuthenticationScreen = ({navigation}) => {
  return (
    <>
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
            <GradientButton 
              style={style.start} 
              onPress={() => navigation.navigate('SignInScreen')}>
              <Text style={style.textSign}>Start</Text>
              <MaterialIcons 
                  name="arrow-right"
                  color="#fff"
                  fontWeight="bold"
                  size={20}
              />
            </GradientButton>
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
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 10 
  }
});

export default AuthenticationScreen;
