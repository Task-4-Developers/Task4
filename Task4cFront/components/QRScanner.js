import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';


function QRScanner(props) {
    // if whereToGo ===null it onTouchFunction should be goBack
    console.log(typeof(props.QRFunction))
    return (
        <TouchableOpacity style={styles.thingStyle}
            onPress={() => props.QRFunction( "Login")}>
            <Image style={styles.imageStyle} source={require("../assets/images/qrscannericon.png")} />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    thingStyle: {
        flex: 1,
    },
    imageStyle: {
        flex: 1,
        width: 50,
        height: 50,
        opacity: 0.5,
    },
});

export default QRScanner;