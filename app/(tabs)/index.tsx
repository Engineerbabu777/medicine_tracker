import { Redirect } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function Index() {
  return (
    <View>
      <Text></Text>
      <Redirect href={"/login"} />
    </View>
  );
}
