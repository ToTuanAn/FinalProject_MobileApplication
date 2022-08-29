import React, {useState, useEffect} from 'react';
import {Avatar} from 'react-native-paper';
import {
    createDrawerNavigator,
    useDrawerProgress,
    DrawerContentScrollView,
    DrawerItemList,
    useDrawerStatus,
} from '@react-navigation/drawer';
import {View, Image, Text, StatusBar} from 'react-native';
import Animated from 'react-native-reanimated';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddPetScreen from '../screens/AddPetScreen';
import { collection, addDoc, getDoc, doc } from "firebase/firestore"; 
import {db, auth}  from '../../../firebase'
import { userConverter } from '../converters/User';
import { onAuthStateChanged } from "firebase/auth";
import FavoriteScreen from '../screens/FavoriteScreen';
const Drawer = createDrawerNavigator();

const DrawerScreenContainer = ({children}) => {
    const isDrawerOpen = useDrawerStatus();
    const progress = useDrawerProgress();
    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 25],
    });

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                borderRadius,
                transform: [{scale}],
                overflow: 'hidden',
            }}
        >
            <StatusBar
                backgroundColor={
                    isDrawerOpen == 'open' ? COLORS.primary : COLORS.white
                }
                barStyle="dark-content"
            />
            {children}
        </Animated.View>
    );
};

const CustomDrawerContent = props => {
    const [userData, setUserData] = useState(null);
    //const [loading, setLoading] = useState(true);

    const getUser = async () => {
        await onAuthStateChanged(auth, user => {
            if (user) {
                const uid = user.uid;
                //setData()
                getDoc(doc(db, 'users', uid).withConverter(userConverter)).then(
                    docSnap => {
                        if (docSnap.exists()) {
                            setUserData(docSnap.data());

                            return docSnap.data();
                        } else {
                            console.log('No such document!');
                        }
                    },
                );
            }
        });
    };

    useEffect(() => {
        getUser();
        //fetchPosts();
    });

    return (
        <DrawerContentScrollView
            style={{
                paddingVertical: 30,
            }}
        >
            <View
                style={{
                    marginLeft: 20,
                    marginVertical: 40,
                }}
            >
                <Avatar.Image
                    source={{
                        uri: userData
                            ? userData.imageurl || 'No details added.'
                            : '',
                    }}
                    size={80}
                />
                <Text
                    style={{
                        color: COLORS.white,
                        fontWeight: 'bold',
                        fontSize: 13,
                        marginTop: 10,
                    }}
                >
                    {userData ? userData.name || 'No details added.' : ''}
                </Text>
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                drawerStyle: {
                    width: 200,
                    backgroundColor: COLORS.primary,
                },
                overlayColor: null,
                drawerLabelStyle: {
                    fontWeight: 'bold',
                },
                drawerActiveTintColor: COLORS.white,
                drawerInactiveTintColor: COLORS.secondary,
                drawerItemStyle: {backgroundColor: null},
                sceneContainerStyle: {
                    backgroundColor: COLORS.primary,
                },
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    title: 'ADOPTION',
                    drawerIcon: ({color}) => (
                        <Icon
                            name="paw"
                            size={25}
                            style={{marginRight: -20, color}}
                        />
                    ),
                }}
            >
                {props => (
                    <DrawerScreenContainer>
                        <HomeScreen {...props} />
                    </DrawerScreenContainer>
                )}
            </Drawer.Screen>

            <Drawer.Screen
                name="DONATION"
                options={{
                    drawerIcon: ({color}) => (
                        <Icon
                            name="gift"
                            size={25}
                            style={{marginRight: -20, color}}
                        />
                    ),
                }}
            >
                {props => (
                    <DrawerScreenContainer>
                        <HomeScreen {...props} />
                    </DrawerScreenContainer>
                )}
            </Drawer.Screen>

            <Drawer.Screen
                name="ADD PET"
                options={{
                    drawerIcon: ({color}) => (
                        <Icon
                            name="plus-box"
                            size={25}
                            style={{marginRight: -20, color}}
                        />
                    ),
                }}
            >
                {props => (
                    <DrawerScreenContainer>
                        <AddPetScreen {...props} />
                    </DrawerScreenContainer>
                )}
            </Drawer.Screen>
      <Drawer.Screen
        name="FAVOURITES"
        options={{
          drawerIcon: ({color}) => (
            <Icon name="heart" size={25} style={{marginRight: -20, color}} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <FavoriteScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
            <Drawer.Screen
                name="PROFILE"
                options={{
                    drawerIcon: ({color}) => (
                        <Icon
                            name="account"
                            size={25}
                            style={{marginRight: -20, color}}
                        />
                    ),
                }}
            >
                {props => (
                    <DrawerScreenContainer>
                        <ProfileScreen {...props} />
                    </DrawerScreenContainer>
                )}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
