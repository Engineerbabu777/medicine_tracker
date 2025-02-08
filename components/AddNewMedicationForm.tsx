import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constant/Colors";
import { TypeList } from "../constant/Options";

export default function AddNewMedicationForm() {
  const [formData, setFormData] = useState({
    type: null,
    name: "",
    dose:""
  });

  const handleOnInputChange = (
    field: string,
    value: string | number | Object
  ) => {
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
        <TextInput
          placeholder="Medicine name"
          style={styles.input}
          onChangeText={(text) => handleOnInputChange("name", text)}
        />
      </View>

      {/* TYpe Medicine! */}
      <FlatList
        style={{
          marginTop: 5,
        }}
        data={TypeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => handleOnInputChange("type", item)}
              style={[
                styles.medicineGroup,
                { marginRight: 10 },
                {
                  backgroundColor:
                    formData.type === item ? Colors.PRIMARY : "white",
                  borderColor: formData.type === item ? "white" : Colors.GRAY,
                  borderRightWidth: formData.type === item ? 2 : 1,
                },
              ]}
            >
              <Text
                style={{
                  color: formData.type === item ? "white" : "black",
                  fontWeight: formData.type === item ? "bold" : "normal",
                }}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

<View style={styles.medicineGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          placeholder="Dose Ex. 2ml, 5ml"
          style={styles.input}
          onChangeText={(text) => handleOnInputChange("dose", text)}
        />
      </View>
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
    marginTop: 10,
    backgroundColor:'white'
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
