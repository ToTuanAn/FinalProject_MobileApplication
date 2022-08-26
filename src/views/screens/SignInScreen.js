import COLORS from '../../const/colors';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {Platform} from 'react-native';
import {StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {IdType} from 'near-api-js/lib/providers/provider';
import {auth} from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    checkInputChanged: false,
    securedPassword: true,
  });

  const textInputChanged = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        checkInputChanged: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        checkInputChanged: false,
      });
    }
  };
  const inputPassword = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const exposePassword = () => {
    setData({
      ...data,
      securedPassword: !data.securedPassword,
    });
  };

  const handleSignIn = (navigation) => {
    //console.log(data.email, data.password);
    //console.log(auth)
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(userCredentials => {
      const user = userCredentials.user;
      //console.log(user);
      navigation.navigate('HomeScreen')
    })
    .catch(error => alert(error.message))
  }

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={COLORS.violet} barStyle="light-content" />
      <View style={style.header}>
        <Text style={style.text_header}>Welcome To NFT Market Place</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={[style.footer, {backgroundColor: COLORS.white}]}>
        <Text style={style.text_footer}>Email</Text>
        <View style={style.action}>
          <FontAwesome name="user-o" color="#05375A" size={20} />
          <TextInput
            placeholder="Your email"
            style={style.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChanged(val)}
          />

          {data.checkInputChanged ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={style.text_footer}>Password</Text>
        <View style={style.action}>
          <FontAwesome name="lock" color="#05375A" size={20} />
          <TextInput
            placeholder="Your password"
            style={style.textInput}
            autoCapitalize="none"
            secureTextEntry={data.securedPassword ? true : false}
            onChangeText={val => inputPassword(val)}
          />

          <TouchableOpacity onPress={exposePassword}>
            {data.securedPassword ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
            <TouchableOpacity onPress={handleSignIn(navigation)}>
            <View style={style.button} >
                <LinearGradient
                    colors={['#9F21FD','#01ab9d']}
                    style={style.signIn}
                > 
                    <Text style={[style.textSign,{color:'#fff'}]}>Sign In</Text>
                   
                   
                </LinearGradient>
        </View>
            </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}
        style={[style.signIn,{
            borderColor:"#009387",
            borderWidth:1,
            marginTop:15
        }]}
        >

        <Text style={[style.textSign,{
            color : '#009387'
        }]}>Sign up</Text>
        </TouchableOpacity>


      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.violet,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 15,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
