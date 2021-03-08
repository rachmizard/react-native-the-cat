import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Home, Profile, Order, Favourite} from './../screens';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'The Cat Lover'}}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Favourite" component={Favourite} />
    </Stack.Navigator>
  );
};

export default Router;
