import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import EventScreen from './screens/EventScreen';

const RootStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Main: {screen: MainScreen},
    Event: {screen: EventScreen}
  },
  {
    initialRouteName: "Login",
  },
);

export default createAppContainer(RootStack);