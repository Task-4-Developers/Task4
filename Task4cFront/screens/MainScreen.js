import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';

function MainScreen(props) {
  const [outputText, setOutputText] = useState("It's a new world");
  return (
    <View style={styles.everything}>
      <ScrollView style={styles.singleRowScrollView}>
        <View style={styles.singleRowView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image style={styles.singleActivity} source={require("../assets/images/morda.jpg")} />
          </TouchableOpacity>
            <Image style={styles.singleActivity} source={require("../assets/images/morda.jpg")} />
        </View>
        <Text>{outputText}</Text>
        <Text>{outputText}</Text>
      </ScrollView>
      <Text>dddupaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
      <Button title="it's a new life" onPress={() => setOutputText("It's a new day")} />
    </View>
  );
}

const styles = StyleSheet.create({
  everything: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    flexDirection: 'column',
  },
  singleRowScrollView: {
    flexGrow: 1,
  },
  singleRowView: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  singleActivity: {
    flex: 1,
    width: 70,
    height: 70, 
  },
});

export default MainScreen;