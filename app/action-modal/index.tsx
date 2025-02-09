import MedicationCardItem from "@/components/MedicationCardItem";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ActionModalMedication() {
  const medicine = useLocalSearchParams();
  const router = useRouter();

  const updateToTaken = async () => {
    try {
      const medicationId = medicine.id;
      const medicationRef = doc(db, "medications", medicationId as any);

      await updateDoc(medicationRef, {
        action: arrayUnion({
          type: "taken",
          timestamp: new Date().toISOString(),
          date: medicine?.selectedDate,
        }),
      });

      console.log("Medication updated successfully!");
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };
  const updateToMissed = async () => {
    try {
      const medicationId = medicine.id;
      const medicationRef = doc(db, "medications", medicationId as any);

      await updateDoc(medicationRef, {
        action: arrayUnion({
          type: "missed",
          timestamp: new Date().toISOString(),
          date: medicine?.selectedDate,
        }),
      });

      console.log("Medication updated successfully!");
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/notification.gif")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <Text style={{ fontSize: 18 }}>{medicine?.selectedDate}</Text>
      <Text style={{ fontSize: 38, fontWeight: "bold" }}>
        {medicine?.remainderTime}
      </Text>
      <Text style={{ fontSize: 18 }}>Its time to take</Text>

      <MedicationCardItem medicine={medicine} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={updateToMissed}>
          <Ionicons name="close-outline" size={24} color="red" />
          <Text style={{ fontSize: 18, color: "red" }}>Missed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.successButton} onPress={updateToTaken}>
          <Ionicons name="checkmark-outline" size={24} color="white" />
          <Text style={{ fontSize: 18, color: "white" }}>Taken</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          bottom: 25,
        }}
      >
        <Ionicons name="close-circle" size={56} color={Colors.GRAY} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
  },
  closeButton: {
    padding: 15,
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  successButton: {
    padding: 15,
    flexDirection: "row",
    gap: 6,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: Colors.GREEN,
  },
});
