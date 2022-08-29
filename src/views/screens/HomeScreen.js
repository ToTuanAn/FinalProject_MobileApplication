import React, {useEffect, useState} from 'react';
import {
  Avatar,
} from 'react-native-paper';
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import pets from '../../const/pets';
const {height} = Dimensions.get('window');
import { onAuthStateChanged, RecaptchaVerifier } from "firebase/auth";
import {db, auth}  from '../../../firebase'
import { collection, addDoc, getDoc, doc, getDocs } from "firebase/firestore"; 
import { userConverter } from '../converters/User';

const petCategories = [
  {name: 'CATS', icon: 'cat'},
  {name: 'DOGS', icon: 'dog'},
  {name: 'BIRDS', icon: 'ladybug'},
  {name: 'BUNNIES', icon: 'rabbit'},
];

const Card = ({pet, navigation}) => {
  let icon_name = 'gender-male';
  if(!pet.gender){
    icon_name = 'gender-female';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', pet)}>
      <View style={style.cardContainer}>
        {/* Render the card image */}
        <View style={style.cardImageContainer}>
          <Image
            source={{uri: pet.imageurl}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Render all the card details here */}
        <View style={style.cardDetailsContainer}>
          {/* Name and gender icon */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontWeight: 'bold', color: COLORS.dark, fontSize: 20}}>
              {pet?.name}
            </Text>
            <Icon name={icon_name} size={22} color={COLORS.grey} />
          </View>

          {/* Render the age and type */}
          <Text style={{fontSize: 12, marginTop: 5, color: COLORS.dark}}>
            {pet?.type}
          </Text>
          <Text style={{fontSize: 10, marginTop: 5, color: COLORS.grey}}>
            {pet?.age} years old
          </Text>

          {/* Render distance and the icon */}
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <Icon name="map-marker" color={COLORS.primary} size={18} />
            <Text style={{fontSize: 12, color: COLORS.grey, marginLeft: 5}}>
              {pet?.useraddress}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation}) => {
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);
  const [userData, setUserData] = useState(null);
  const [isloading, setIsLoading] = useState(null);
  const [pets, setPets] = useState([]);
  //const [userFavor, setUserFavor] = useState(null);
  //const [loading, setLoading] = useState(true);


  const getUser = async() => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getDoc(doc(db, "users", uid).withConverter(userConverter)).then(docSnap => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            //setUserFavor(docSnap.data().favoritepets);
            //return docSnap.data();
          } else {
            console.log("No such document!");
          }
        })
      }
    });
    
  }

  const getPets = async() =>{
    
    let list = [];
    let userInfo = {};
    const petsRef = collection(db,'pets');
    await getDocs(petsRef).then(async (snapshot) => {
        snapshot.forEach(async (document) => {
        const {age,category,description,gender,imageurl,name,ownerID,type} = document.data()
        
        await getDoc(doc(db, "users", ownerID).withConverter(userConverter)).then(docSnap => {
          if (docSnap.exists()) {
            userInfo = docSnap.data();
          } else {
            console.log("No such document!");
          }
        })
        .then( () => {
        //console.log(userInfo)
        list.push({id: document.id, age, category, description, gender, imageurl, name, ownerID, type, 
                  username: userInfo.name, userimageurl: userInfo.imageurl, useraddress: userInfo.country,
                  userphone: userInfo.phonenum, useremail: userInfo.email});
      })
      })
    });
    console.log("an dep trai ", list)
    setPets(list);
    setIsLoading(false);
  }

  const fliterPet = index => {
    //console.log(pets)
    const currentPets = pets.filter(
      item => item?.category?.toUpperCase() == petCategories[index].name,
    );
    //console.log(currentPets)
    setFilteredPets(currentPets);
  };

  React.useEffect(() => {
    getUser();
    getPets().then(() => {setSeletedCategoryIndex(0), fliterPet(0)});
  }, []);
  
  return (
    <SafeAreaView style={{flex: 1, color: COLORS.white}}>
      <View style={style.header}>
        <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
        <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 16}}>
        {userData ? userData.name || 'No details added.' : ''}
        </Text>
        <Avatar.Image source={{
            uri : userData ? userData.imageurl || 'No details added.' : ''
          }}
          size={40}/>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}>
          {/* Render the search inputs and icons */}
          <View style={style.searchInputContainer}>
            <Icon name="magnify" size={24} color={COLORS.grey} />
            <TextInput
              placeholderTextColor={COLORS.grey}
              placeholder="Search pet to adopt"
              style={{flex: 1}}
            />
            <Icon name="sort-ascending" size={24} color={COLORS.grey} />
          </View>

          {/* Render all the categories */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            {petCategories.map((item, index) => (
              <View key={'pet' + index} style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setSeletedCategoryIndex(index);
                    fliterPet(index);
                  }}
                  style={[
                    style.categoryBtn,
                    {
                      backgroundColor:
                        selectedCategoryIndex == index
                          ? COLORS.primary
                          : COLORS.white,
                    },
                  ]}>
                  <Icon
                    name={item.icon}
                    size={30}
                    color={
                      selectedCategoryIndex == index
                        ? COLORS.white
                        : COLORS.primary
                    }
                  />
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{item.name}</Text>
              </View>
            ))}
          </View>

          {/* Render the cards with flatlist */}
          <View style={{marginTop: 20}}>
            <FlatList contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}
              data={filteredPets}
              renderItem={({item}) => ( 
                <Card pet={item} navigation={navigation} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: height,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },
});
export default HomeScreen;