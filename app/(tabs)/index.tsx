import Header from "@/components/Header";
import { auth } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { View, Text, Button, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <View
      style={{
        padding: 10,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        {/* HEADER! */}
        <Header />
      </SafeAreaView>
    </View>
  );
}
