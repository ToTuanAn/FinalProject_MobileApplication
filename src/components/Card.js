import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';
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
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMAGE_LOAD_FAILED} from '../const';

const {height} = Dimensions.get('window');

export const Card = ({pet, navigation}) => {
    let icon_name = 'gender-male';
    if (!pet.gender) {
        icon_name = 'gender-female';
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailsScreen', pet)}
        >
            <View style={style.cardContainer}>
                {/* Render the card image */}
                <View style={style.cardImageContainer}>
                    <Image
                        source={{
                            uri:
                                !!pet.imageurl && pet.imageurl != ''
                                    ? pet.imageurl
                                    : IMAGE_LOAD_FAILED,
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                            borderRadius: 20
                        }}
                    />
                </View>

                {/* Render all the card details here */}
                <View style={style.cardDetailsContainer}>
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
                        <Icon name={icon_name} size={22} color={COLORS.grey} />
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
                        {pet?.age} years old
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
                            {pet?.useraddress}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
