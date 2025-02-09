import Colors from "@/constant/Colors";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
type Props = {
  medicine: any;
  selectedDate?: string;
};

export default function MedicationCardItem({
  medicine,
  selectedDate = "",
}: Props) {

  const isTaken =
  medicine?.action && Array.isArray(medicine.action) && selectedDate
    ? medicine?.action.find((action: any) => action?.date === selectedDate)
        ?.type || "not_taken"
    : "not_taken"; 


  return (
    <View style={styles.container} key={medicine.id}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine.type.icon }}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {medicine.name}
          </Text>
          <Text style={{ fontSize: 17 }}>{medicine.whenToTake}</Text>
          <Text style={{ color: Colors.GRAY }}>
            {medicine.dose} {medicine.type.name}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {medicine?.remainderTime}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 5,
          padding: 7,
        }}
      >
        <Ionicons
          name={
            isTaken === "taken"
              ? "checkmark-circle"
              : isTaken === "missed"
              ? "close-circle"
              : "ellipse-outline"
          }
          size={24}
          color={
            isTaken === "taken"
              ? "green"
              : isTaken === "missed"
              ? "red"
              : "gray"
          }
        />
      </View>
    </View>
  );
}
``;
const styles = StyleSheet.create({
  imageContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 10,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: 10,
    // backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
