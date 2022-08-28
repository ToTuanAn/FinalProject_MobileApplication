
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Platform } from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import COLORS from '../../const/colors';



const EditProfileScreen = ({navigation, route}) => {
  const [image,setImage] = useState('https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=612x612&w=0&h=MOvSM2M1l_beQ4UzfSU2pfv4sRjm0zkpeBtIV-P71JE=')


const openGalery = () =>{
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
}

const { handleSubmit, control } = useForm();

const onSubmit = (data) => {
  //data.append("image",image.path)
  data["image"] = image;
  // do some api here
  console.log(data, "data");
  Alert.alert("Update succesfully")
  navigation.goBack();
};
  
  return (
    <View style = {styles.container}>
       <View style={styles.toggle}>
        <Icon name="arrow-left" size={28} onPress={() => {navigation.goBack("ProfileScreen")}} />
        <Text style={{color: COLORS.violet, fontWeight: 'bold', fontSize: 16}}>
          Edit your information
        </Text>
      </View>
      
      <View style={{margin: 20}}>
       
        <View style = {{alignItems:'center'}}>
            <TouchableOpacity onPress={openGalery}>
                <View style = {styles.ava} >
                    <ImageBackground
                    source={{
                        uri : image
                    }}
                    style ={{height : 150 , width : 150}}
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
              marginTop : 40,
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
                <Controller
                        name="firstName"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            placeholder='First name'
                            autoCorrect = {false}
                            placeholderTextColor="#666666"
                            style = {styles.textInput}
                            onChangeText={onChange}
                            value={value}
                         />
                        )}
                      />
              </View>

              <View style = {styles.action}>
                <Icon name ="rename-box" size = {20}/>
                <Controller
                        name="lastName"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            placeholder='Last name'
                            autoCorrect = {false}
                            placeholderTextColor="#666666"
                            style = {styles.textInput}
                            onChangeText={onChange}
                            value={value}/>
                        )}                     
                  />
                 </View>


              <View style = {styles.action}>
                <FontAwesome name ="phone" size = {20}/>
                <Controller
                        name="phone"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                                placeholder='Phone'
                                autoCorrect = {false}
                                placeholderTextColor="#666666"
                                style = {styles.textInput}
                                keyboardType = 'numeric'
                                onChangeText={onChange}
                                value={value}/>                              
                        )}
                      />
                
              </View>

              <View style = {styles.action}>
                <FontAwesome name ="home" size = {20}/>
                <Controller
                        name="address"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                              placeholder='Address'
                              autoCorrect = {false}
                              placeholderTextColor="#666666"
                              style = {styles.textInput}
                              onChangeText={onChange}
                                value={value}
                            />
                        )}
                      />
          
              </View>
        </View>
            
        <TouchableOpacity style = {styles.commandButton} onPress={handleSubmit(onSubmit)}>
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
