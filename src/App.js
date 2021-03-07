/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Profile, Order} from './screens';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'The Cat Lover'}}
        />
        <Stack.Screen mode="modal" name="Profile" component={Profile} />
        <Stack.Screen mode="modal" name="Order" component={Order} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
