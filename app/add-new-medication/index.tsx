import AddMedicationHeader from "@/components/AddMedicationHeader";
import AddNewMedicationForm from "@/components/AddNewMedicationForm";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddNewMedication() {
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header! */}
        <AddMedicationHeader />

        {/* Your medication form here */}
        <AddNewMedicationForm />
      </ScrollView>
    </SafeAreaView>
  );
}
