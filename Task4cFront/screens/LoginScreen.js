import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

import Layout from './Layout';
{/* 
<Text style={styles.textStyle}>Just do it</Text>
<Button style={styles.buttonStyle} title="it's a new life" onPress={
() => props.navigation.navigate('Main')
} /> */}

function fetchLogin(login){
  fetch("https://task44.herokuapp.com/login", {
    method: "POST",
    body: JSON.stringify({
      login: login
    })
  }).then( (response) => response.json())
  .then((responseJson) => {
    // setValid(responseJson.successful);
    // setError(!(responseJson.successful));
    if(responseJson) {
      //RETURN LOGIN TO MAIN
      props.navigation.navigate('Main');
    }
    else (setError(!(responseJson.successful)));
  });
}

export default function LoginScreen(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setValid] = useState(true);
    // const [isError, setError] = useState(false);

    return (
      <Layout>
        <View style={styles.container}>
          <TextInput name="login" style={styles.input} value={login} placeholder="Name" onChangeText={setLogin} />
          <TextInput name="password" style={styles.input}  value={password} placeholder="Password" onChangeText={setPassword} />
          <TouchableOpacity style={isValid? styles.validLoginButton : styles.invalidloginButton} onPress={() => {
            fetch("https://task44.herokuapp.com/login", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({
                login: login,
                password: password
              })
            }).then( (response) => response.json())
            .then((responseJson) => {


              // alert(JSON.stringify({
              //   login: login,
              //   password: password
              // }));
              // alert(responseJson.accepted);
              // alert(JSON.stringify(responseJson));
              setValid(responseJson.accepted === true);
              // setError(!(responseJson.accepted));
              if(responseJson.accepted) {
                //RETURN LOGIN TO MAIN
                props.navigation.navigate('Main');
              }
              else {
                alert("Wrong login or password!");
                setValid(responseJson.accepted);
            }})
            .catch((error) =>{
            console.error(error);
          });
          }}><Text>Login</Text></TouchableOpacity>
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
    minWidth: 200,

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
    minWidth: 200,
    
    fontSize: 30,
    textAlign: "center",
  }
});


// export default LoginScreen;