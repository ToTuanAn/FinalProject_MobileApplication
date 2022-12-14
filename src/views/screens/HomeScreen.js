import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import pets from '../../const/pets';
const {height} = Dimensions.get('window');
import {onAuthStateChanged, RecaptchaVerifier} from 'firebase/auth';
import {db, auth} from '../../../firebase';
import {collection, addDoc, getDoc, doc, getDocs} from 'firebase/firestore';
import {userConverter} from '../converters/User';
import {storeData} from '../../utils';
import {IMAGE_LOAD_FAILED} from '../../const';
import {Card} from '../../components';
import { async } from '@firebase/util';
import {Loading} from '../../components';

const petCategories = [
    {name: 'CATS', icon: 'cat'},
    {name: 'DOGS', icon: 'dog'},
    {name: 'BIRDS', icon: 'ladybug'},
    {name: 'BUNNIES', icon: 'rabbit'},
];

const HomeScreen = ({navigation}) => {
    const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
    const [filteredPets, setFilteredPets] = React.useState([]);
    const [userData, setUserData] = useState(null);
    const [isloading, setIsLoading] = useState(null);
    const [pets, setPets] = useState([]);

    const getUser = () => {
        onAuthStateChanged(auth, async user => {
            if (user) {
                const uid = user.uid;
                await getDoc(doc(db, 'users', uid).withConverter(userConverter)).then(
                    docSnap => {
                        if (docSnap.exists()) {
                            let data = docSnap.data();
                            setUserData(data);
                            storeData('username', data.name);
                        } else {
                            console.log('No such document!');
                        }
                    },
                );
            }
        });
    };

    const getPets = async () => {
        try {
            let list = [];
            let userInfo = {};
            const petsRef = collection(db, 'pets');
            const snapshot = await getDocs(petsRef)
            snapshot.forEach(async document => {
                const {
                    age,
                    category,
                    description,
                    gender,
                    imageurl,
                    name,
                    ownerID,
                    type,
                } = document.data();

                // const docSnap = await getDoc(
                //     doc(db, 'users', ownerID).withConverter(userConverter),
                // )
                // if (docSnap.exists()) {
                //     userInfo = docSnap.data();
                // } else {
                //     console.log('No such document!');
                //     return
                // }

                list.push({
                    id: document.id,
                    age,
                    category,
                    description,
                    gender,
                    imageurl,
                    name,
                    ownerID,
                    type,
                    // username: userInfo.name,
                    // userimageurl: userInfo.imageurl,
                    // useraddress: userInfo.country,
                    // userphone: userInfo.phonenum,
                    // useremail: userInfo.email,
                });
            });
            console.log(list)

            setPets(list);
        } catch (e) {
            console.log(e);
        }
    };

    const fliterPet = index => {
        const currentPets = pets.filter(
            item => item?.category?.toUpperCase() == petCategories[index].name,
        );
        setFilteredPets(currentPets);
    };

    useEffect(async () => {
        try {
            setIsLoading(true);
            await getUser();
            await getPets()
            setIsLoading(false)
        } catch(e) {
            console.error(e)
            setIsLoading(false)
        }
        return () => {}
    }, []);

    useEffect(()=>{
        fliterPet(selectedCategoryIndex);
    }, [pets, selectedCategoryIndex])

    if (isloading) return (
        <Loading/>
    )

    return (
        <SafeAreaView style={{flex: 1, color: COLORS.white}}>
            <View style={style.header}>
                <Icon
                    name="sort-variant"
                    size={28}
                    onPress={navigation.toggleDrawer}
                />
                <Text
                    style={{
                        color: COLORS.primary,
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                >
                    {userData ? userData.name || 'No details added.' : ''}
                </Text>
                <Avatar.Image
                    source={ 
                        !!userData && userData.imageurl != ''
                            ? { uri: userData.imageurl }
                            : require('../../assets/default_avatar.png')
                    }
                    size={40}
                />
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >
                <View style={style.mainContainer}>
                    {/* Render the search inputs and icons */}
                    <View style={style.searchInputContainer}>
                        <Icon name="magnify" size={24} color={COLORS.grey} />
                        <TextInput
                            placeholderTextColor={COLORS.grey}
                            placeholder="Search pet to adopt"
                            style={{flex: 1}}
                        />
                        <Icon
                            name="sort-ascending"
                            size={24}
                            color={COLORS.grey}
                        />
                    </View>

                    {/* Render all the categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}
                    >
                        {petCategories.map((item, index) => (
                            <View
                                key={'pet' + index}
                                style={{alignItems: 'center'}}
                            >
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
                                    ]}
                                >
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
                                <Text style={style.categoryBtnName}>
                                    {item.name}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Render the cards with flatlist */}
                    <View style={{marginTop: 20}}>
                        {
                            filteredPets.map((item, index) => (
                                <Card key={index} pet={item} navigation={navigation} />
                            ))
                        }
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
