import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const RootStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Main: {screen: MainScreen},
  },
  {
    initialRouteName: "Login",
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);