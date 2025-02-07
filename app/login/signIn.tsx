import { auth } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import { setLocalStorage } from "@/service/Storage";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCreateAccount = () => {
    router.push("/login/signup");
  };

  const onSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Please fill out all the fields");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Show success message
      if (Platform.OS === "android") {
        ToastAndroid.show("Signed in successfully!", ToastAndroid.SHORT);
      } else {
        Alert.alert("Signed in success");
      }

      setLocalStorage("user", user)

      // Navigate to Home screen
      router.replace("/(tabs)");
    } catch (error: any) {
      let errorMessage = error.message;
      if (errorMessage === "auth/invalid-credentials") {
        errorMessage = "Invalid email or password";
      }

      // Show error message
      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      } else {
        Alert.alert(errorMessage);
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
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={(value: string) => setEmail(value)}
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
            onChangeText={(value: string) => setPassword(value)}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onSignIn}>
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

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateAccount}
        >
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
