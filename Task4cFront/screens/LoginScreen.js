import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

import Layout from './Layout';
{/* 
<Text style={styles.textStyle}>Just do it</Text>
<Button style={styles.buttonStyle} title="it's a new life" onPress={
() => props.navigation.navigate('Main')
} /> */}

export default function LoginScreen(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setValid] = useState(false);

    return (
      <Layout>
        <View style={styles.container}>
          <TextInput name="login" style={styles.input} value={login} placeholder="Name" onChange={(e,text) => setLogin(text)} />
          <TextInput name="password" style={styles.input} value={password} placeholder="Password" onChange={(e, text) => setPassword(text)} />
          <TouchableOpacity style={isValid? styles.validLoginButton : styles.invalidloginButton} onPress={() => props.navigation.navigate('Main')}><Text>Login</Text></TouchableOpacity>
        </View>
      </Layout>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -2
  },
  input: {
      fontSize: 40,
      textAlign: "center",
      backgroundColor: '#ddd',
      minWidth: 200,
      borderRadius: 50,
      margin: 10,
      padding: 20
  },
  invalidloginButton: {
    margin: 10,
    padding: 20,
    backgroundColor: "#eee",

    borderRadius: 50,
    minWidth: 700,

    fontSize: 30,
    textAlign: "center",
    opacity: 0.3
  },
  validLoginButton: {
    opacity: 1,
    margin: 10,
    padding: 20,
    backgroundColor: "#eee",

    borderRadius: 50,
    minWidth: 700,
    
    fontSize: 30,
    textAlign: "center",
  }
});


// export default LoginScreen;