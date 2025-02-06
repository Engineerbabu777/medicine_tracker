import { auth } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { View, Text, Button, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  // handle signOut!
  const handleSignout = async () => {
    // REMOVE USER FROM LOCALSTORAGE!
    await AsyncStorage.removeItem("user");

    await signOut(auth);

    // REDIRECT TO LOGIN SCREEN!
    router.replace("/login/signIn");
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleSignout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
