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


// const allActivities = Array.from({ length: 9 }, (el, i) => ({ id: i, imageUrl: require("../assets/images/" + "morda"
// + ".jpg") }))
const activitiesFromDB= [
  {
    id: 0,
    type: "morda.jpg",
    randomStatistics: "so many chairs",
  },
  {
    id: 1,
    type: "piesa.png",
    randomStatistics: "so many things",
  },
  {
    id: 2,
    type: "alien.png",
    randomStatistics: "so many elephants",
  },
  {
    id: 3,
    type: "pinezka.jpg",
    randomStatistics: "just the two of us",
  },
  {
    id: 4,
    type: "checked.jpg",
    randomStatistics: "crazy funk",
  }, 
] 


const allActivities = [
  {
    id: 0,
    imageUrl: require("../assets/images/" + "morda" + ".jpg"),
    randomStatistics: "so many chairs",
  },
  {
    id: 1,
    imageUrl: require("../assets/images/" + "piesa" + ".png"),
    randomStatistics: "so many things",
  },
  {
    id: 2,
    imageUrl: require("../assets/images/" + "alien" + ".png"),
    randomStatistics: "so many elephants",
  },
  {
    id: 3,
    imageUrl: require("../assets/images/" + "pinezka" + ".jpg"),
    randomStatistics: "just the two of us",
  },
  {
    id: 4,
    imageUrl: require("../assets/images/" + "checked" + ".jpg"),
    randomStatistics: "crazy funk",
  },
]

var adres=""; 
newAllActivities= activitiesFromDB;
for (var i=0;i<newAllActivities.length;i++){
  console.log("../assets/images/"+newAllActivities[i].type) 
  // import ("../assets/images/"+activitiesFromDB[i].type).then((loadedImageUrl) => {
  //   newAllActivities[i].imageUrl=loadedImageUrl;
  // });
  // newAllActivities[i].imageUrl=require("../assets/images/");
  delete newAllActivities[i].type;
} 
// var chunkedActivities = chunk(newAllActivities, 2) // [[{ }, { }], [{ }, { }]]

const chunkedActivities = chunk(allActivities, 2) // [[{ }, { }], [{ }, { }]]
function MainScreen(props) {
  const [outputText, setOutputText] = useState("It's a new world");
  return (
    <Layout>
      <ScrollView style={styles.scrollView}>
        {chunkedActivities.map(row => (
          <View style={styles.singleRowView}>
            <Activity activity={row[0]} whereToGo="Event" onTouchFunction={props.navigation.navigate} />
            {row.length === 1
              ? <View style={styles.singleActivity}/>
              : <Activity activity={row[1]} onTouchFunction={props.navigation.goBack} />
            }
          </View>
        ))}
      </ScrollView>
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