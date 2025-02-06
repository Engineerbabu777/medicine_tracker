import Colors from "@/constant/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { ToastAndroid, Platform } from "react-native";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const handleAlreadyAccount = () => {
    router.push("/login/signIn");
  };

  const onCreateAccount = async () => {
    if (!email || !password) {
      Alert.alert("Please fill out all the fields");
      return;
    }

    try {
      console.log("Creating account!");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed up successfully
      console.log("Account created!");
      console.log(userCredential.user);
      // FOR ANDROID!
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Account has been created successfully",
          ToastAndroid.BOTTOM
        );
      } else {
        // FOR IOS!
        Alert.alert("Account has been created successfully");
      }

      router.push("/login/signIn");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      // console.error({ errorCode, errorMessage });

      if (errorCode === "auth/email-already-in-use") {
        // FOR ANDROID!
        if (Platform.OS === "android") {
          ToastAndroid.show("Email already in use", ToastAndroid.BOTTOM);
        } else {
          // FOR IOS!
          Alert.alert("Email already in use");
        }
      } else {
        Alert.alert("Error creating account", errorMessage);
      }
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 25,
        }}
      >
        <View>
          <Text style={styles.textHeader}>Create new account</Text>
        </View>

        <View
          style={{
            marginTop: 25,
          }}
        >
          <Text>Full Name</Text>
          <TextInput
            placeholder="Full Name"
            style={styles.textInput}
            value={fullName}
            onChangeText={(text: string) => setFullName(text)}
          />
        </View>

        <View
          style={{
            marginTop: 25,
          }}
        >
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
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
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onCreateAccount}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              color: "white",
            }}
          >
            Create account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleAlreadyAccount}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              color: Colors.PRIMARY,
            }}
          >
            Already account? Signin
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
