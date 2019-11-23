import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';


function Event(props) {
    // if whereToGo ===null it onTouchFunction should be goBack
    return (
        <TouchableOpacity style={styles.singleEvent} onPress={() => props.onTouchFunction(props.whereToGo)}>
            <Text>Time starts: {props.event.startTime} </Text>
            <Text>It has: {props.event.randomStatistics} </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    singleEvent: {
        flex: 1,
        textAlign: "center",    // to koniecznie potem wyjebac
        textAlignVertical: "center",
        flexDirection:"column",
        backgroundColor: "#48833F" ,
        // resizeMode: "stretch", //doesn't work
        padding: 4,
        marginBottom: 10,
    },
});

export default Event;