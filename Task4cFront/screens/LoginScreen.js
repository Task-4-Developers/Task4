import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Layout from './Layout';

function LoginScreen(props) {
    return (
      <Layout>
        <Text style={styles.textStyle}>Just do it</Text>
        <Button style={styles.buttonStyle} title="it's a new life" onPress={
            () => props.navigation.navigate('Main')
            } />
      </Layout>
    );
}

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonStyle: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default LoginScreen;