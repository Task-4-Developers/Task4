import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';

import Layout from "./Layout";

const numberOfActivities = 6;
var allActivities = [];
for (i = 0; i < numberOfActivities; i++) {
  allActivities.push({id: i,imageUrl: require("../assets/images/" + "morda" +".jpg")})
}
var allActivitiesTransformed = [];
// if (len(allActivities)%2 ==1){
//   allActivities.push({id: -1,imageUrl: ""})
// }
for (i = 0; i < allActivities.length; i+=2) {
  allActivitiesTransformed.push({
    id1: allActivities[i].id,imageUrl1: allActivities[i].imageUrl,
    id2: allActivities[i+1].id,imageUrl2: allActivities[i+1].imageUrl,
  })
}

function MainScreen(props) {
  const [outputText, setOutputText] = useState("It's a new world");
  return (
    <Layout>
      <ScrollView style={styles.singleRowScrollView}>
        {allActivities.map((activity) =>
          <View style={styles.singleRowView}>
            <TouchableOpacity style={styles.singleActivity} onPress={() => props.navigation.navigate("Event")}>
              <Image style={styles.singleActivity} source={activity.imageUrl} />
              {/* <Image style={styles.singleActivity} source={require("../assets/images/morda.jpg")} /> */}
            </TouchableOpacity>
            <Text style={styles.singleActivity}>{activity.id}</Text> 
            <TouchableOpacity style={styles.singleActivity} onPress={() => props.navigation.goBack()}>
              <Image style={styles.singleActivity} source={activity.imageUrl} />
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