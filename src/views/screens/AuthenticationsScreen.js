import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../const/colors';
import * as Animatable from 'react-native-animatable';
import {GradientButton} from '../../components';
import {retrieveData} from '../../utils';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../firebase';
import {Button} from 'react-native-paper';

export const AuthenticationScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(async () => {
        try {
            setLoading(true);
            const username = await retrieveData('username');
            if (!!username && username != "")
                setUsername(username);
            else 
                setUsername(null)
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }, []);

    const handleSignIn = navigation => {
        if (!username) {
            return () => {
                navigation.navigate('SignInScreen');
            };
        }
        return async () => {
            try {
                setLoading(true);
                const email = await retrieveData('email');
                const pass = await retrieveData('password');

                console.log('call', email, pass);
                if (!email || email == "" || !pass || pass == "") {
                    throw "Didn't store any data";
                }

                await signInWithEmailAndPassword(auth, email, pass)
                    .then(() => {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show(
                                'Log in successfully',
                                ToastAndroid.SHORT,
                            );
                        }

                        navigation.navigate('HomeScreen');
                        setLoading(false);
                    })
                    .catch(() => {
                        console.log("CAN'T SIGN IN");
                        throw "can't sign in";
                    });
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
    };

    return (
        <>
            <View style={style.container}>
                <StatusBar
                    backgroundColor={COLORS.violet}
                    barStyle="light-content"
                />
                <View style={style.header}>
                    <Animatable.Image
                        animation="fadeInDown"
                        interationCount="infinite"
                        source={require('../../assets/logo_pet.jpg')}
                        style={{width: 300, height: 300, borderRadius: 250}}
                        resizeMode="stretch"
                    />
                </View>

                <Animatable.View
                    style={[
                        style.footer,
                        {
                            backgroundColor: COLORS.white,
                        },
                    ]}
                    animation="fadeInUpBig"
                >
                    <Text
                        style={[
                            style.title,
                            {
                                color: COLORS.black,
                            },
                        ]}
                    >
                        SaiGon Pet Adoption
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontFamily: 'Cochin',
                            marginTop: 15,
                        }}
                    >
                        Find your new best friend
                    </Text>
                    <View style={style.button}>
                        <GradientButton
                            style={style.start}
                            loading={loading}
                            onPress={handleSignIn(navigation)}
                        >
                            <Text style={style.textSign}>
                                {!!username
                                    ? `Continue as "${username}"`
                                    : 'Start'}
                            </Text>
                            <MaterialIcons
                                name="arrow-right"
                                color="#fff"
                                fontWeight="bold"
                                size={20}
                            />
                        </GradientButton>
                        {!!username && (
                            <Button
                                mode="text"
                                uppercase={false}
                                onPress={() =>
                                    navigation.navigate('SignInScreen')
                                }
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: COLORS.grey,
                                    }}
                                >
                                    Login with other account
                                </Text>
                            </Button>
                        )}
                    </View>
                </Animatable.View>
            </View>
        </>
    );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const style = StyleSheet.create({
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
    title: {
        fontFamily: 'Cochin',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
    },
    scrollView: {},
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
        backgroundColor: COLORS.violet,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    text: {
        color: 'grey',
        marginTop: 5,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    start: {
        width: '80%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',

    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 10,
        textAlign: 'center',
    }
});

export default AuthenticationScreen;
