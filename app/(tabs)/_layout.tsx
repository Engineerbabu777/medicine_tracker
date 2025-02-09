import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native"; // Import ActivityIndicator
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalStorage, setLocalStorage } from "@/service/Storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function TabLayout() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<null | boolean>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const userFromLocalStorage: any = await getLocalStorage("user");
        console.log("from tab/:", { userFromLocalStorage });

        if (userFromLocalStorage) {
          // If user data exists in local storage, set it
          setUser(userFromLocalStorage);
          setAuthenticated(true);
        } else if (user) {
          // If Firebase user exists, save it to local storage and set state
          const uid = user.uid;
          await setLocalStorage("user", user);
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
          name="history"
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="history" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
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
