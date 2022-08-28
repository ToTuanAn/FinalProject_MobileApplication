import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './src/views/navigators/DrawerNavigator';
import DetailsScreen from './src/views/screens/DetailsScreen';
import AuthenticationScreen from './src/views/screens/AuthenticationsScreen';
import ProfileScreen from './src/views/screens/ProfileScreen';
import SignInScreen from './src/views/screens/SignInScreen';
import SignUpScreen from './src/views/screens/SignUpScreen';
import EditProfileScreen from './src/views/screens/EditProfileScreen';
import InfoOwner from './src/views/screens/InfoOwner';
import FavoriteScreen from './src/views/screens/FavoriteScreen';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication" screenOptions={{headerShown: false}}>
      <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{
            title: 'Welcome to NFT Market',
            headerTitleStyle: {
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen name = "SignInScreen" component={SignInScreen} />
        <Stack.Screen name = "SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="InfoOwner" component={InfoOwner} />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
