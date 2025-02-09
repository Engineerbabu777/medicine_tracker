import MedicationList from "@/components/HistoryMedication";
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  return (
      <View style={styles.container}>
        <SafeAreaView>
          <Image
            source={require("../../assets/images/med-history.png")}
            style={styles.image}
          />

          <Text style={styles.header}>Medical History</Text>

          {/* <Text>History</Text> */}
          <MedicationList />
        </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    padding: 25,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
