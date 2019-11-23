import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function LoginScreen(props) {
    return (
      <View style={styles.everything}>
        <View style={styles.topView}>
          <Text>Just do it</Text>
          <Button title="it's a new life" onPress={
            () => props.navigation.navigate('Main')
            } />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  everything: {
    padding: 50,
    flexDirection: 'row',
  },
  topView: {
    flex: 1,
    backgroundColor: '#A3C19F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;