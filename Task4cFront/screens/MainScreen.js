import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function MainScreen() {
  const [outputText, setOutputText] = useState("It's a new world");
    return (
      <View style={styles.everything}>
        <View style={styles.topView}>
          <Text>{outputText}</Text>
          <Text>{outputText}</Text>
          <Text>{outputText}</Text>
          <Text>{outputText}</Text>
          <Button title="it's a new life" onPress={() => setOutputText("It's a new day")} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  everything: {
    padding: 50,
    flexDirection: 'row',
  },
  topView: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;