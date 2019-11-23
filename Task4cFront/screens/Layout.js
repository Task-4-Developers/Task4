import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';

const numberOfActivities = 6;
var allActivities = [];
for (i = 0; i < numberOfActivities; i++) {
  allActivities.push(i)
}

function Layout(props) {
  return (
    <View style={styles.everything}>
      {/* <Text style={styles.headerStyling}> Welcome to my world</Text> */}

      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  everything: {
    flex: 1,
    backgroundColor: '#A3C19F',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'column',
    marginBottom: 20,
  },
  headerStyling: {
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Layout;