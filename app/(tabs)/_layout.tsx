import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import Index from ".";
import Profile from "./Profile";
import AddNew from "./AddNew";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
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
