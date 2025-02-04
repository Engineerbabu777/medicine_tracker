import Colors from "@/constant/Colors";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 25,
        }}
      >
        <View>
          <Text style={styles.textHeader}>Let's Sign you in</Text>
          <Text style={styles.subHeader}>Welcome back</Text>
          <Text style={styles.subHeader}>You have been missed!</Text>
        </View>

        <View
          style={{
            marginTop: 25,
          }}
        >
          <Text>Email</Text>
          <TextInput placeholder="Email" style={styles.textInput} />
        </View>

        <View
          style={{
            marginTop: 25,
          }}
        >
          <Text>Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              color: "white",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createButton}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              color: Colors.PRIMARY,
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },
  subHeader: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 30,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
  },
  loginButton: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  createButton: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
