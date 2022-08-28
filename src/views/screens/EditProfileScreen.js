
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet
} from 'react-native';
import { Platform } from 'react-native';

import {useTheme} from 'react-native-paper';
import { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import ImagePicker from 'react-native-image-crop-picker';
import COLORS from '../../const/colors';
import SelectDropdown from 'react-native-select-dropdown'


const EditProfileScreen = ({navigation, route}) => {
  const petType = ["Egypt", "Canada", "Australia", "Ireland"]

  const [image,setImage] = useState('https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/273798571_3047592772150453_1171043902568185126_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=tGeuSYDaILsAX-cvxJB&tn=rjuYXE7PEOaN48pk&_nc_ht=scontent.fsgn8-3.fna&oh=00_AT-R7h61g_Op9tMJEn7ta6bkKY_35WHhEt8k-N0R5CmowQ&oe=630B86F0')


const openGalery = () =>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
}
  
  return (
    <View style = {styles.container}>
       <View style={styles.toggle}>
        <Icon name="arrow-left" size={28} onPress={() => {navigation.goBack("ProfileScreen")}} />
      </View>
      
      <View style={{margin: 20}}>
       
        <View style = {{alignItems:'center'}}>
            <TouchableOpacity onPress={openGalery}>
                <View style = {styles.ava} >
                    <ImageBackground
                    source={{
                        uri : image
                    }}
                    style ={{height : 100 , width : 100}}
                    imageStyle = {{borderRadius:15}}
                    >
                      <View style = {{
                        flex : 1,
                        justifyContent :'center',
                        alignItems : 'center'
                      }}>
                        <Icon name = "camera" 
                        size = {30}
                        color ="#fff"
                        style = {{
                          opacity : 0.6,
                          alignItems : 'center',
                          justifyContent : 'center',
                          borderWidth : 1,
                          borderColor : "#fff",
                          borderRadius : 10 
                        }} />

                      </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            <Text style ={{
              marginTop : 10,
              fontSize : 18,
              fontWeight : 'bold',
            }}>
              User name
              </Text>

              <Text style ={{
              marginTop : 10,
              fontSize : 18,
              fontWeight : 'bold',
            }}>
              Email
              </Text>

              <View style = {styles.action}>
                <FontAwesome name ="user-o" size = {20}/>
                <TextInput
                  placeholder='First name'
                  autoCorrect = {false}
                  placeholderTextColor="#666666"
                  style = {styles.textInput}
                />
              </View>

              <View style = {styles.action}>
                <Icon name ="rename-box" size = {20}/>
                <TextInput
                  placeholder='Last name'
                  autoCorrect = {false}
                  placeholderTextColor="#666666"
                  style = {styles.textInput}
                />
              </View>


              <View style = {styles.action}>
                <FontAwesome name ="phone" size = {20}/>
                <TextInput
                  placeholder='Phone'
                  autoCorrect = {false}
                  placeholderTextColor="#666666"
                  style = {styles.textInput}
                />
              </View>

              <View style = {styles.action}>
                <FontAwesome name ="globe" size = {20}/>
                <TextInput
                  placeholder='Country'
                  autoCorrect = {false}
                  placeholderTextColor="#666666"
                  style = {styles.textInput}
                />
              </View>
        </View>
            
        <TouchableOpacity style = {styles.commandButton}>
            <Text style={styles.panelButtonTitle}>Submit</Text>  
        </TouchableOpacity>

      </View>


     
    </View>
  )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  toggle: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    ava : {
        height : 100,
        width : 100,
        borderRadius :15 , 
        justifyContent : 'center' , 
        alignItems : 'center',
    },
  container: {
    flex: 1,
    backgroundColor : COLORS.white,

  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.violet,
    alignItems: 'center',
    marginTop: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#909992',
    paddingBottom: 1,
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
    fontSize:16,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
