import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';

import Layout from "./Layout";
import Activity from "../components/Activity";


function chunk(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}

const allActivities = [
  {
    id: 0,
    nazwa: "Pilkarzyki",
    imageUrl: require("../assets/images/" + "pilkarzyki" + ".png"),
    randomStatistics: "2",
  },
  {
    id: 0,
    nazwa: "FIFA",
    imageUrl: require("../assets/images/" + "noga" + ".png"),
    randomStatistics: "1",
  },
  {
    id: 0,
    nazwa: "Piwo",
    imageUrl: require("../assets/images/" + "piwo" + ".png"),
    randomStatistics: "0",
  },
  {
    id: 0,
    nazwa: "Kawa",
    imageUrl: require("../assets/images/" + "kawa" + ".png"),
    randomStatistics: "4",
  },
  {
    id: 0,
    nazwa: "Papieros",
    imageUrl: require("../assets/images/" + "fajki" + ".png"),
    randomStatistics: "crazy funk",
  },
]


var chunkedActivities = chunk(allActivities, 2) // [[{ }, { }], [{ }, { }]]
function MainScreen(props) {
  return (
    <Layout>
      <ScrollView style={styles.scrollView}>
        {chunkedActivities.map(row => (
          <View style={styles.singleRowView}>
            <Activity activity={row[0]} whereToGo="Event" onTouchFunction={props.navigation.navigate} />
            {row.length === 1
              ? <View style={styles.singleActivity}/>
              : <Activity activity={row[1]} whereToGo="Event" onTouchFunction={props.navigation.navigate} />
            }
          </View>
        ))}
      </ScrollView>
      <Button title="QR Code Scanner" onPress={() => props.navigation.navigate('QrCode')}/>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
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