import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";

export default function MedicationList() {
  const [medicationList, setMedicationList] = useState([]);

  return (
    <ScrollView
      style={{
        marginTop: 25,
      }}
    >
      <View>
        <Image
          source={require("../assets/images/medication.jpeg")}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
          }}
        />
      </View>
    </ScrollView>
  );
}
