
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from 'react-native-image-crop-picker';
import COLORS from '../../const/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { useAddPet } from '../../hooks/useAddPet';
import {storage} from '../../../firebase';
import { uploadString, ref } from 'firebase/storage';


const AddPetScreen = ({navigation, route}) => {

  const [image,setImage] = useState('http://baxterpainting.com/wp-content/uploads/2015/11/dog-placeholder.jpg')

  // Gender config
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  // Gender config
  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [speciesValue, setSpeciesValue] = useState(null);
  const [species, setSpecies] = useState([
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Bunny", value: "bunny" },
    { label: "Bird", value: "bird" },
  ]);

  const [loading, setLoading] = useState(false);

  const onGenderOpen = React.useCallback(() => {
    setSpeciesOpen(false);
  }, []);

  const onSpeciesOpen = React.useCallback(() => {
    setGenderOpen(false);
  }, []);

  const {
    setPetImg,
    addPetPublishing,
    control,
    handleAddPetFormSubmit,
  } = useAddPet();

  // submit all information of the pet
  // const onSubmit = (data) => {
  //   data["image"] = image;
  //   // do some api here
  //   console.log(data, "data");
  //   Alert.alert("Add succesfully")
  //   navigation.goBack();
  // };
 
  const openGalery = () =>{
    ImagePicker.openPicker({
      width: 300,
      height: 220,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.5,
    }).then(image => {
      const uri = `data:${image.mime};base64,${image.data}`;
      setImage(uri);
    });
  }

  useEffect(()=>{
    setPetImg(image)
    return () => {

    }
  }, [image])

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backArrow} onPress={() => { navigation.goBack() }}>
            <Icon name="arrow-left" size={30} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.titleText}>Add your pet information</Text>
          </View>
        </View>
        <Text style={styles.label}>Your pet name</Text>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              selectionColor={"#5188E3"}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
    
        <Text style={styles.label}>Your pet breed</Text>
        <Controller
          name="breed"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              selectionColor={"#5188E3"}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
    
        <View>
          <Text style={styles.label}>Gender</Text>
          <View style ={{
            flexDirection : "row"
          }}>
            <Controller
              name="gender"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownGender}>
                  <DropDownPicker
                    style={styles.dropdown}
                    open={genderOpen}
                    value={genderValue}
                    items={gender}
                    setOpen={setGenderOpen}
                    setValue={setGenderValue}
                    setItems={setGender}
                    placeholder="Select Gender"
                    placeholderStyle={styles.placeholderStyles}
                    onOpen={onGenderOpen}
                    onChangeValue={onChange}
                    zIndex={3000}
                    zIndexInverse={1000}
                  />
                </View>
              )}
            />
          
            <Controller
              name="age"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    borderStyle: "solid",
                    borderColor: "#B7B7B7",
                    borderRadius: 7,
                    borderWidth: 1,
                    fontSize: 15,
                    height: 50,
                    flex : 1,
                    marginHorizontal: 15,
                    paddingStart: 10,
                    marginBottom: 15,
                    alignItems : 'center',
                  }}
                  placeholder = 'Select age'
                  keyboardType = 'numeric'
                  selectionColor={"#5188E3"}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <Text style={styles.label}>Your pet species</Text>
          <Controller
            name="species"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropdownCompany}>
                <DropDownPicker
                  style={styles.dropdown}
                  open={speciesOpen}
                  value={speciesValue}
                  items={species}
                  setOpen={setSpeciesOpen}
                  setValue={setSpeciesValue}
                  setItems={setSpecies}
                  placeholder="Select Species"
                  placeholderStyle={styles.placeholderStyles}
                  loading={loading}
                  activityIndicatorColor="#5188E3"
                  searchable={true}
                  searchPlaceholder="Search species here..."
                  onOpen={onSpeciesOpen}
                  onChangeValue={onChange}
                   zIndex={1000}
                  zIndexInverse={3000}
                />
              </View>
            )}
          />
        </View>
        <Text style={styles.label}>Add some description</Text>
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline={true}
              style={styles.input}
              selectionColor={"#5188E3"}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Text style={styles.label}>Add picture of your pet</Text>
        <View style = {{alignItems:'center'}}>
          <TouchableOpacity onPress={openGalery}>
            <View style = {styles.ava} >
              <ImageBackground
                source={{
                    uri : image
                }}
                style ={{height : 220 , width : 300}}
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
        </View>
        <TouchableOpacity style = {{marginBottom : 20}} loading={addPetPublishing} onPress={handleAddPetFormSubmit}>
          <Text style={styles.getStarted}>Done</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  )
}

export default AddPetScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 25,
    alignItems:'center',
  },
  container: {
    flex: 1,
  },
  input: {
    borderStyle: "solid",
    borderColor: "#B7B7B7",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  label: {
    marginBottom: 7,
    marginStart: 10,
    fontWeight: 'bold',
  },
  placeholderStyles: {
    color: "grey",
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
  },
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
  },
  getStarted: {
    backgroundColor: COLORS.violet,
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.violet,
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  backArrow: {
    marginLeft: 10,
  },
  title: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    marginRight: 40
  },
});

