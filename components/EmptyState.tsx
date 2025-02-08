import Colors from "@/constant/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function EmptyState() {
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 80,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/medicine.png")}
        style={{
          width: 120,
          height: 120,
        }}
      />
      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        No Medications!
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Colors.DARK_GRAY,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        You have 0 medications, Kindly setup a new one
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,

          marginTop: 30,
          padding: 15,
          borderRadius: 10,
          width: "100%",
        }}
        onPress={() => router.push("/add-new-medication")}
      >
        <Text
          style={{
            fontSize: 17,
            color: "white",
            textAlign: "center",
          }}
        >
          + Add New Medication
        </Text>
      </TouchableOpacity>
    </View>
  );
}
