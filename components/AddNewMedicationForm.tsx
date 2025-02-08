import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constant/Colors";
import { TypeList } from "../constant/Options";

export default function AddNewMedicationForm() {
  const [formData, setFormData] = useState({});

  const handleOnInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.medicineGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput placeholder="Medicine name" style={styles.input} />
      </View>

      {/* TYpe Medicine! */}
      <FlatList
        style={{
          marginTop: 10,
        }}
        data={TypeList}
        horizontal={true}
        // indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={[styles.medicineGroup, { marginRight: 10 }]}>
              <Text style={{}}>{item?.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 25,
  },
  medicineGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 7,
  },

  input: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 10,
    borderColor: Colors.GRAY,
  },
});
