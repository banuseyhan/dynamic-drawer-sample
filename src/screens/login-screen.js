import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase-config";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  registerHandler = () => {
    // Validations
    if (this.state.email === "") {
      alert("Email boş geçilemez");
      return;
    }

    if (this.state.password === "") {
      alert("Password boş geçilemez");
      return;
    }

    if (this.state.password.length < 6) {
      alert("Password en az 6 karakter olmalıdır");
      return;
    }

    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((uc) => {
        console.log(uc.user);
      })
      .catch((error) => console.log(error.message));
  };

  loginHandler = () => {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((uc) => {
        if (uc.user) {
          this.props.navigation.navigate("Main");
        }
      })
      .catch((error) => console.log(error.message));
  };

  componentDidMount(){
      auth.onAuthStateChanged(user=>{
          if(user){
              this.props.navigation.navigate("Main");
          }
      })
  }

  render() {
    return (
      <View style={this.styles.mainContainer}>
        <TextInput
          style={this.styles.txtInput}
          onChangeText={(text) => {
            this.setState({
              email: text,
            });
          }}
        ></TextInput>
        <TextInput
          style={this.styles.txtInput}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        ></TextInput>
        <View style={this.styles.buttonPanel}>
          <TouchableOpacity
            style={this.styles.buttonContainer}
            onPress={this.registerHandler}
          >
            <Text style={this.styles.buttonText}>Kayıt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.styles.buttonContainer}
            onPress={this.loginHandler}
          >
            <Text style={this.styles.buttonText}>Giriş</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingTop: 170,
    },
    txtInput: {
      borderColor: "black",
      borderWidth: 1.5,
      backgroundColor: "white",
      height: 30,
      margin: 5,
      padding: 3,
    },
    buttonPanel: {
      flexDirection: "row",
    },
    buttonContainer: {
      borderColor: "black",
      borderWidth: 1.5,
      backgroundColor: "white",
      flex: 1,
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontWeight: "bold",
    },
  });
}
