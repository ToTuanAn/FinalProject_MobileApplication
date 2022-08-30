import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
    TextInput,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../../const/colors';
import * as Animatable from 'react-native-animatable';
import {GradientButton} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import pets from '../../const/pets';
import {db, auth} from '../../../firebase';
import {collection, getDocs, getDoc, doc, updateDoc} from 'firebase/firestore';
import {userConverter} from '../converters/User';
import {IMAGE_LOAD_FAILED} from '../../const';
const {height} = Dimensions.get('window');

const Card = ({pet, navigation}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailsScreen', pet)}
        >
            <View style={styles.cardContainer}>
                {/* Render the card image */}
                <View style={styles.cardImageContainer}>
                    <Image
                        source={{
                            uri:
                                !!pet && pet.imageurl != ''
                                    ? pet?.imageurl
                                    : IMAGE_LOAD_FAILED,
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>

                {/* Render all the card details here */}
                <View style={styles.cardDetailsContainer}>
                    {/* Name and gender icon */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: COLORS.dark,
                                fontSize: 20,
                            }}
                        >
                            {pet?.name}
                        </Text>
                        <Icon
                            name="gender-male"
                            size={22}
                            color={COLORS.grey}
                        />
                    </View>

                    {/* Render the age and type */}
                    <Text
                        style={{fontSize: 12, marginTop: 5, color: COLORS.dark}}
                    >
                        {pet?.type}
                    </Text>
                    <Text
                        style={{fontSize: 10, marginTop: 5, color: COLORS.grey}}
                    >
                        {pet?.age}
                    </Text>

                    {/* Render distance and the icon */}
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <Icon
                            name="map-marker"
                            color={COLORS.primary}
                            size={18}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLORS.grey,
                                marginLeft: 5,
                            }}
                        >
                            address
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const FavoriteScreen = ({navigation, route}) => {
    const [userFavor, setUserFavor] = useState([]);
    const [pets, setPets] = useState([]);

    const getPets = async () => {
        const user = auth.currentUser;
        const userDocRef = doc(db, 'users', user.uid);
        let favorlist;
        await getDoc(userDocRef).then(docSnap => {
            favorlist = docSnap.data().favoritepets;
            setUserFavor(docSnap.data().favoritepets);
        });
        //const favorlist = [...userFavor]
        console.log(favorlist);
        try {
            let list = [];

            for (var i in favorlist) {
                const favor = favorlist[i];
                await getDoc(doc(db, 'pets', favor)).then(async document => {
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
                    let userInfo = {};

                    await getDoc(
                        doc(db, 'users', ownerID).withConverter(userConverter),
                    ).then(async docSnap => {
                        if (docSnap.exists()) {
                            userInfo = docSnap.data();

                            list.push({
                                id: favor,
                                age,
                                category,
                                description,
                                gender,
                                imageurl,
                                name,
                                ownerID,
                                type,
                                username: userInfo.name,
                                userimageurl: userInfo.imageurl,
                                useraddress: userInfo.country,
                                userphone: userInfo.phonenum,
                                useremail: userInfo.email,
                            });
                        }
                    });
                });
            }
            setPets(list);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPets().then(() => {
            console.log(pets);
        });
        //console.log(pets)
    }, []);

    // useEffect(()=>{
    //   getPets().then((list) => {setPets(list)});
    //   console.log(pets)
    // }, [])

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
                    <Text style={styles.titleText}>Your favorite</Text>
                </View>
            </View>
            <StatusBar backgroundColor={'#e6acfa'} barStyle="light-content" />

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                nestedScrollEnabled={true}
            >
                <View style={styles.listContainer}>
                    <View style={{marginTop: 20}}>
                        {pets.map((item, index) => (
                            <Card
                                key={index}
                                pet={item}
                                navigation={navigation}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 25,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#e6acfa',
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
    listContainer: {
        flex: 1,
        backgroundColor: '#f3cffc',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
        minHeight: height,
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
    iconCon: {
        backgroundColor: COLORS.primary,
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
});
