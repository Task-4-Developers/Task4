import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';

import Layout from "./Layout";

const numberOfActivities = 6;
var allActivities = [];
for (i = 0; i < numberOfActivities; i++) {
  allActivities.push(i)
}

function MainScreen(props) {
  const [outputText, setOutputText] = useState("Eventy czy cos");
  return (
    <Layout>
      <ScrollView style={styles.singleRowScrollView}>
        {allActivities.map((activity) =>
          <View style={styles.singleRowView}>
            <TouchableOpacity style={styles.singleActivity} onPress={() => props.navigation.goBack()}>
              <Image style={styles.singleActivity} source={require("../assets/images/piesa.png")} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  singleRowScrollView: {
    // flexGrow: 2,
  },
  singleRowView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
  },
  singleActivity: {
    flex: 1,
    width: 100,
    height: 100,
    textAlign: "center",    // to koniecznie potem wyjebac
    textAlignVertical: "center",
    // resizeMode: "stretch", //doesn't work
    padding: 2,
  },
});

export default MainScreen;