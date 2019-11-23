import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';

import Layout from "./Layout";
import Event from "../components/Event";


eventsForActivity =[
  {
    startTime: "11:20",
    randomStatistics: "Go there now mate",
  },
  {
    startTime: "03:20",
    randomStatistics: "damn man that too early",
  }
]

allEvents =[
  {
    id: 0,
    events: eventsForActivity,
  },
  {
    id: 1,
    events: [],
  },
]


function EventScreen(props) {
  var activityId=props.navigation.state.params.activityId;
  if (allEvents.find(x =>x.id===activityId) !==undefined)
  return (
    <Layout>
      <ScrollView style={styles.scrollViewStyle}>
        {allEvents[activityId].events.map(event => (
            <Event event={event} whereToGo="" onTouchFunction={props.navigation.navigate} />
        ))}
      </ScrollView>
    </Layout>
  );
  return (
    <Layout>
      <Text> No event found </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    // flexGrow: 2,
  },
});

export default EventScreen;