import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';


function Activity(props) {
    if (props.activity.id == -1) {
        return (
            <View style={styles.singleActivity} />
        )
    }
    // if whereToGo ===null it onTouchFunction should be goBack
    return (
        <TouchableOpacity key={props.activity.id} style={styles.singleActivity}
            onPress={() => props.onTouchFunction(props.whereToGo, { activityId: props.activity.id, })}>
            <Image style={styles.singleActivityImage} source={props.activity.imageUrl} />
            <Text>{props.activity.nazwa} </Text>
            <Text>Wolne sloty: {props.activity.randomStatistics} </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    singleActivity: {
        flex: 1,
        textAlign: "center",    // to koniecznie potem wyjebac
        textAlignVertical: "center",
        flexDirection: "column",
        // resizeMode: "stretch", //doesn't work
        padding: 4,
    },
    singleActivityImage: {
        flex: 1,
        width: 100,
        height: 100,
        // resizeMode: "stretch", //doesn't work
        padding: 2,
    },
});

export default Activity;