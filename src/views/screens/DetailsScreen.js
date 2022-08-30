import React, {useState, setState, useEffect, useRef} from 'react';
import {
    Text,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../const/colors';
import {db, auth} from '../../../firebase';
import {collection, addDoc, getDoc, doc, updateDoc} from 'firebase/firestore';
import {IMAGE_LOAD_FAILED} from '../../const';
import { ScrollView } from 'react-native-gesture-handler';
import Easing from 'react-native/Libraries/Animated/Easing';

const DetailsScreen = ({navigation, route}) => {
    const pet = route.params;
    const user = auth.currentUser;
    const userDocRef = doc(db, 'users', user.uid);
    const [userFavor, setUserFavor] = useState([]);
    
    const offsetRef = useRef(new Animated.Value(400)).current;

    const changeOffset = (newValue) => {
        Animated.timing(offsetRef, {
            toValue: newValue,
            duration: 10,
            useNativeDriver: false,
        }).start();
    }

    const handleFavorite = () => {
        getDoc(userDocRef).then(docSnap => {
            let list = docSnap.data().favoritepets;
            if (!list.includes(pet.id)) {
                list.push(pet.id);
                setUserFavor(list);
                updateDoc(userDocRef, {
                    favoritepets: list,
                });
            } else {
                list = list.filter(value => value != pet.id);
                setUserFavor(list);
                updateDoc(userDocRef, {
                    favoritepets: list,
                });
            }
        });
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <StatusBar backgroundColor={COLORS.background} />
           {/*  <Animated.View style={{height: offsetRef}}> */}
           {/*      <Text>Hello</Text> */}
           {/* </Animated.View> */}
            <Animated.View style={{height: offsetRef, backgroundColor: COLORS.background}}>
                <ImageBackground
                    resizeMode="cover"
                    source={{
                        uri:
                            !!pet && pet.imageurl != ''
                                ? pet?.imageurl
                                : IMAGE_LOAD_FAILED,
                    }}
                    style={{
                        height: '100%',
                        top: 20,
                    }}
                >
                    {/* Render  Header */}
                    <View style={style.header}>
                        <Icon
                            name="arrow-left"
                            size={28}
                            color={COLORS.dark}
                            onPress={navigation.goBack}
                        />
                        <Icon
                            name="dots-vertical"
                            size={28}
                            color={COLORS.dark}
                        />
                    </View>
                </ImageBackground>

                <View style={style.wrapper}>
                    <View style={style.detailsContainer}>
                        {/* Pet name and gender icon */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: COLORS.dark,
                                    fontWeight: 'bold',
                                }}
                            >
                                {pet.name}
                            </Text>
                            <Icon
                                name="gender-male"
                                size={25}
                                color={COLORS.grey}
                            />
                        </View>

                        {/* Render Pet type and age */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5,
                            }}
                        >
                            <Text style={{fontSize: 12, color: COLORS.dark}}>
                                {pet.type}
                            </Text>
                            <Text style={{fontSize: 13, color: COLORS.dark}}>
                                {pet.age} years old
                            </Text>
                        </View>

                        {/* Render location and icon */}
                        <View style={{marginTop: 5, flexDirection: 'row'}}>
                            <Icon
                                name="map-marker"
                                color={COLORS.primary}
                                size={20}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLORS.grey,
                                    marginLeft: 5,
                                }}
                            >
                                {pet?.useraddress}
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>

            {/* Comment container */}
            <View
                style={{
                    marginTop: 80,
                    justifyContent: 'space-between',
                    flex: 1,
                }}
            />
            <ScrollView 
                onScroll={e => {
                    const offset = e.nativeEvent.contentOffset.y;
                    if (offset > 500) return
                    changeOffset(400 - offset/2)
                }}>
                {/* Render user image , name and date */}
                <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                    <Image
                        source={{
                            uri:
                                !!pet && pet.userimageurl != ''
                                    ? pet?.userimageurl
                                    : IMAGE_LOAD_FAILED,
                        }}
                        style={{height: 40, width: 40, borderRadius: 20}}
                    />
                    <View style={{flex: 1, paddingLeft: 10}}>
                        <Text
                            style={{
                                color: COLORS.dark,
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        >
                            {pet?.username}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.grey,
                                fontSize: 11,
                                fontWeight: 'bold',
                                marginTop: 2,
                            }}
                        >
                            Owner
                        </Text>
                    </View>
                    <Text style={{color: COLORS.grey, fontSize: 12}}>
                        May 25, 2020
                    </Text>
                </View>
                <Text style={style.comment}>{pet?.description}</Text>
        {/* Render footer */}
            <View style={style.footer}>
                <TouchableOpacity
                    style={style.iconCon}
                    onPress={handleFavorite}
                >
                    <Icon name="heart-outline" size={22} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.btn}
                    onPress={() => navigation.navigate('InfoOwner', pet)}
                >
                    <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
                        ADOPTION
                    </Text>
                </TouchableOpacity>
            </View>

            </ScrollView>

                    </SafeAreaView>
    );
};

const style = StyleSheet.create({
    detailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        flex: 1,
        borderRadius: 18,
        elevation: 10,
        padding: 20,
        justifyContent: 'center',
    },
    wrapper: {
        position: 'absolute',
        height: 120,
        width: '100%',
        flex: 1,
        bottom: -60,
        justifyContent: 'center',
    },
    comment: {
        marginTop: 10,
        fontSize: 12.5,
        color: COLORS.dark,
        lineHeight: 20,
        marginHorizontal: 20,
    },
    footer: {
        height: 100,
        backgroundColor: COLORS.light,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
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
    btn: {
        backgroundColor: COLORS.primary,
        flex: 1,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
    },
});
export default DetailsScreen;
