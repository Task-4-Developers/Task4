import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            wasChecked: false,
            login: "sddsf",
            password: "",
            loggedIn: false
        }
    }

    handleInputChange(event){
        const name = event.target.name;
        this.setState({[name]:event.target.value})
    }
    
    render(){
        return(<View style={styles.container}>
            <TextInput name="login" style={styles.input} value={this.state.login} placeHolder="Login" onChange={this.handleInputChange.bind(this)} />
            <TextInput name="password" style={styles.input} value={this.state.password} placeHolder="Password" onChange={this.handleInputChange.bind(this)} />
            <Text style={styles.loginBack}>{this.state.login}</Text>
        </View>);
    }
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
        textAlign: "justify",
        backgroundColor: '#eee',
        minWidth: 200,
        borderRadius: 50,
        margin: 10,
        padding: 20
    },
    loginBack: {
        flexWrap: "nowrap",
        opacity: 0.2,
        position: "absolute",
        fontSize: 200,
        overflow: "hidden",
        zIndex: -1,
    },

  });
   