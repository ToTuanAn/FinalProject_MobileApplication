import COLORS from '../../const/colors';
import {
    ToastAndroid,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {auth, db} from '../../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, addDoc, setDoc, doc} from 'firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import {GradientButton} from '../../components';
import {storeData, retrieveData} from '../../utils';

const SignUpScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(null);
    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm_password: '',
        name: '',
        checkInputChanged: false,
        securedPassword: true,
        checkInputNameChanged: false,
        confirm_securedPassword: true,
    });

    const handleSignUp = navigation => {
        return async dispatch => {
            setIsLoading(true)
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            )
                .then(userCredentials => {
                    const userData = {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        imageurl: '',
                        phonenum: '',
                        country: '',
                        money: 0,
                        item: 0,
                        favoritepets: [],
                    };

                    const newUserRef = collection(db, 'users');
                    const newUser = doc(newUserRef, userCredentials.user.uid);

                    setDoc(newUser, userData);
                })
                .then(() => {
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(
                            'Sign up successfully',
                            ToastAndroid.SHORT,
                        );
                    }

                    storeData('email', data.email);
                    storeData('password', data.password);
    
                    setIsLoading(false)
                    navigation.navigate('HomeScreen');
                })
                .catch(error => {
                    setIsLoading(false);
                    alert(error)
                });
        };
    };

    const textInputChanged = val => {
        if (val.length != 0) {
            setData({
                ...data,
                email: val,
                checkInputChanged: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                checkInputChanged: false,
            });
        }
    };

    const textNameChanged = val => {
        if (val.length != 0) {
            setData({
                ...data,
                name: val,
                checkInputNameChanged: false,
            });
        } else {
            setData({
                ...data,
                name: val,
                checkInputNameChanged: false,
            });
        }
    };

    const inputPassword = val => {
        setData({
            ...data,
            password: val,
        });
    };

    const inputConfirmPassword = val => {
        setData({
            ...data,
            confirm_password: val,
        });
    };

    const exposePassword = () => {
        setData({
            ...data,
            securedPassword: !data.securedPassword,
        });
    };
    const exposeConfirmPassword = () => {
        setData({
            ...data,
            confirm_securedPassword: !data.confirm_securedPassword,
        });
    };

    return (
        <View style={style.container}>
            <StatusBar
                backgroundColor={COLORS.violet}
                barStyle="light-content"
            />
            <View style={style.header}>
                <Text style={style.text_header}>Register now !</Text>
            </View>

            <Animatable.View
                animation="fadeInRightBig"
                style={[style.footer, {backgroundColor: COLORS.white}]}
            >
                <ScrollView>
                    <Text style={style.text_footer}>User name</Text>
                    <View style={style.action}>
                        <FontAwesome name="user-o" color="#05375A" size={20} />
                        <TextInput
                            placeholder="Your name"
                            style={style.textInput}
                            autoCapitalize="none"
                            onChangeText={val => textNameChanged(val)}
                        />

                        {data.checkInputNameChanged ? (
                            <Animatable.View animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        ) : null}
                    </View>

                    <Text style={style.text_footer}>Email</Text>
                    <View style={style.action}>
                        <Icon name="email" color="#05375A" size={20} />
                        <TextInput
                            placeholder="Please input your email"
                            style={style.textInput}
                            autoCapitalize="none"
                            onChangeText={val => textInputChanged(val)}
                        />

                        {data.checkInputChanged ? (
                            <Animatable.View animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        ) : null}
                    </View>

                    <Text style={style.text_footer}>Password</Text>
                    <View style={style.action}>
                        <FontAwesome name="lock" color="#05375A" size={20} />
                        <TextInput
                            placeholder="Your password"
                            style={style.textInput}
                            autoCapitalize="none"
                            secureTextEntry={
                                data.securedPassword ? true : false
                            }
                            onChangeText={val => inputPassword(val)}
                        />

                        <TouchableOpacity onPress={exposePassword}>
                            {data.securedPassword ? (
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                            ) : (
                                <Feather name="eye" color="grey" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <Text style={style.text_footer}>Confirm password</Text>
                    <View style={style.action}>
                        <FontAwesome name="lock" color="#05375A" size={20} />
                        <TextInput
                            placeholder="Your password"
                            style={style.textInput}
                            autoCapitalize="none"
                            secureTextEntry={
                                data.confirm_securedPassword ? true : false
                            }
                            onChangeText={val => inputConfirmPassword(val)}
                        />

                        <TouchableOpacity onPress={exposeConfirmPassword}>
                            {data.confirm_securedPassword ? (
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                            ) : (
                                <Feather name="eye" color="grey" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <GradientButton
                        style={[style.button, style.signIn]}
                        loading={isLoading}
                        onPress={handleSignUp(navigation)}
                    >
                        <Text style={[style.textSign, {color: '#fff'}]}>
                            Register
                        </Text>
                    </GradientButton>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[
                            style.signIn,
                            {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                style.textSign,
                                {
                                    color: '#009387',
                                },
                            ]}
                        >
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.violet,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: COLORS.textPrimary,
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        marginBottom: 10,
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
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 15,
        paddingBottom: 0,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
