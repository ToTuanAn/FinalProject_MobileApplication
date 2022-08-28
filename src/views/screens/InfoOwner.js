import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../const/colors';
import * as Animatable from 'react-native-animatable';
import {GradientButton} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const InfoOwner = ({navigation}) => {

    const [image,setImage] = React.useState('https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=612x612&w=0&h=MOvSM2M1l_beQ4UzfSU2pfv4sRjm0zkpeBtIV-P71JE=')
  return (
    <>
      <View style={style.container}>
      <View style={style.headerContainer}>
      <TouchableOpacity style={style.backArrow} onPress = {() => { navigation.goBack()}}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <View style={style.title}>
        <Text style={style.titleText}>Owner information</Text>
      </View>
    </View>
      <StatusBar backgroundColor={COLORS.violet} barStyle="light-content"/>
        <View style = {style.header}>
          <Animatable.Image
            animation="pulse"
            source={{
                uri : image
            }}
            style ={{width: 170, height: 170, borderRadius: 400/ 2}}
            resizeMode="stretch"
          />
        </View>

        <Animatable.View 
            style={[style.footer, {
                backgroundColor: COLORS.white
            }]}
            animation="fadeInUpBig"
        > 
          <View style = {style.note}>
            <Text>Please contact the owner for adoption</Text>
          </View>
          <View style = {style.action}>
          <FontAwesome name ="user-o" size = {20}/>
          <Text style= {style.textInput} >Name</Text>
          </View>

          <View style = {style.action}>
          <FontAwesome name ="home" size = {20}/>
          <Text style= {style.textInput} >Address</Text>
          </View>

          <View style = {style.action}>
          <FontAwesome name ="phone" size = {20}/>
          <Text style= {style.textInput} >Phone</Text>
          </View>

          <View style = {style.action}>
          <Icon name ="email" size = {20}/>
          <Text style= {style.textInput} >Mail</Text>
          </View>

          <TouchableOpacity style = {style.commandButton} onPress={() => navigation.navigate("HomeScreen")}>
            <Text style={style.panelButtonTitle}>Back to home</Text>  
        </TouchableOpacity>

        </Animatable.View>
      </View>
    </>
  );
};

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const style = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 25,
        alignItems:'center',
      },
      title: {
        alignSelf: "center",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
      },
      titleText:
       {  fontSize: 30,marginRight: 40,fontWeight: 'bold' },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#909992',
        paddingBottom: 1,
      },
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
      flex: 2.5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 20,
      paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  textInput: {
    fontSize:16,
    //marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
    color: '#05375a',
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
  },
  backArrow: {
    marginLeft: 10,
  },
  note : {
    fontFamily : "cocochin",
    fontSize : 20,
    marginBottom : 10,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.violet,
    alignItems: 'center',
    marginTop: 20,
  },
  panelButtonTitle: {
          fontSize: 17,
          fontWeight: 'bold',
          color: 'white',
        },
});

export default InfoOwner;
