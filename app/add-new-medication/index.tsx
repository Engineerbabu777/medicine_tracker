import AddMedicationHeader from "@/components/AddMedicationHeader";
import AddNewMedicationForm from "@/components/AddNewMedicationForm";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddNewMedication() {
  return (
    <SafeAreaView>
      {/* Header! */}
      <AddMedicationHeader />

      {/* Your medication form here */}
      <AddNewMedicationForm />
    </SafeAreaView>
  );
}
