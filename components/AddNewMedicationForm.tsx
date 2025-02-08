import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constant/Colors";
import { TypeList, WhenToTake } from "../constant/Options";
import { Picker } from "@react-native-picker/picker";

export default function AddNewMedicationForm() {
  const [formData, setFormData] = useState({
    type: null,
    name: "",
    dose: "",
  });

  const [showPickerModal, setShowPickerModal] = useState(false);

  const handleOnInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePickerValueChange = (itemValue) => {
    handleOnInputChange("dose", itemValue);
    setShowPickerModal(false);
  };

  return (
    <View style={{ padding: 25 }}>
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

      {/* Type Medicine! */}
      <FlatList
        style={{ marginTop: 5 }}
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

      <View style={styles.medicineGroup}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={24}
          color="black"
        />
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setShowPickerModal(true)}
        >
          <Text style={styles.input}>
            {formData.dose || "Select a time"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Picker Modal */}
      <Modal
        visible={showPickerModal}
        transparent={true}
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={() => setShowPickerModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Picker
            selectedValue={formData.dose}
            onValueChange={handlePickerValueChange}
            style={{ width: "100%" }}
          >
            {WhenToTake.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "white",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});