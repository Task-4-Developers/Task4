import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import EventScreen from './screens/EventScreen';
import QRScreen from './screens/QRScreen';

const RootStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Main: {screen: MainScreen},
    Event: {screen: EventScreen},
    QrCode: {screen: QRScreen}
  },
  {
    initialRouteName: "Login",
  },
);

export default createAppContainer(RootStack);