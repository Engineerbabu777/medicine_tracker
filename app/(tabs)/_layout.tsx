import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native"; // Import ActivityIndicator
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<null | boolean>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const userFromLocalStorage = await AsyncStorage.getItem("user");

        if (userFromLocalStorage) {
          // If user data exists in local storage, set it
          setUser(JSON.parse(userFromLocalStorage));
          setAuthenticated(true);
        } else if (user) {
          // If Firebase user exists, save it to local storage and set state
          const uid = user.uid;
          await AsyncStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setAuthenticated(true);
        } else {
          // No user is authenticated
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication state:", error);
        setAuthenticated(false);
      } finally {
        // Ensure loading is set to false after the check is complete
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authenticated === false) {
      router.push("/login");
    }
  }, [authenticated]);

  // Show a loading indicator while checking authentication state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </Text>
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Add New",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="plus-square" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="AddNew"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
