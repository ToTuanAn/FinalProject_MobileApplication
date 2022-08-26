import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './src/views/navigators/DrawerNavigator';
import DetailsScreen from './src/views/screens/DetailsScreen';
import AuthenticationScreen from './src/views/screens/AuthenticationsScreen';
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
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
