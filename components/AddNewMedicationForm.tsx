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
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constant/Colors";
import { TypeList, WhenToTake } from "../constant/Options";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDateToText, formatTime } from "@/service/ConvertDateTime";

export default function AddNewMedicationForm() {
  const [formData, setFormData] = useState({
    type: null,
    name: "",
    dose: "",
    startDate: null,
    endDate: null,
    remainderTime: null,
  });

  const [showPickerModal, setShowPickerModal] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [showRemainderTime, setShowRemainderTime] = useState(false);

  const handleOnInputChange = (
    field: string,
    value: string | number | Date | Object
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePickerValueChange = (itemValue: string) => {
    handleOnInputChange("dose", itemValue);
    setShowPickerModal(false);
  };

  const showStartDate = () => {
    setOpenStartDatePicker(true);
  };

  const closeStartDate = () => {
    setOpenStartDatePicker(false);
  };

  const showEndDate = () => {
    setOpenEndDatePicker(true);
  };

  const closeEndDate = () => {
    setOpenEndDatePicker(false);
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
          <Text style={styles.input}>{formData.dose || "Select a time"}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View style={[styles.medicineGroup, { flex: 1 }]}>
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />

          <TouchableOpacity onPress={() => setOpenStartDatePicker(true)}>
            <Text style={styles.text}>
              {formData?.startDate
                ? formatDateToText(formData?.startDate)
                : "Start date"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.medicineGroup, { flex: 1 }]}>
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <TouchableOpacity onPress={() => setOpenEndDatePicker(true)}>
            <Text style={styles.text}>
              {formData?.endDate
                ? formatDateToText(formData?.endDate)
                : "End date"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.medicineGroup}>
        <Ionicons
          style={styles.icon}
          name="timer-outline"
          size={24}
          color="black"
        />
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setShowRemainderTime(true)}
        >
          <Text style={styles.input}>
            {formData?.remainderTime
              ? formData?.remainderTime
              : "Select a remainder time"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            fontSize: 17,
            color: "white",
            textAlign: "center",
          }}
        >
          Add New Medication
        </Text>
      </TouchableOpacity>

      {/* Picker Modal */}
      <Modal visible={showPickerModal} transparent={true} animationType="none">
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

      {/*  start date modal! */}
      <DateTimePickerModal
        isVisible={openStartDatePicker}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date: any) => {
          console.log({ date });
          handleOnInputChange("startDate", date);
          setOpenStartDatePicker(false);
        }}
        onCancel={closeStartDate}
      />
      {/* end date modal! */}
      <DateTimePickerModal
        minimumDate={new Date()}
        isVisible={openEndDatePicker}
        mode="date"
        onConfirm={(date: any) => {
          handleOnInputChange("endDate", date);
          setOpenEndDatePicker(false);
        }}
        onCancel={closeEndDate}
      />
      {/* remainder time! */}
      <DateTimePickerModal
        isVisible={showRemainderTime}
        mode="time"
        onConfirm={(time: any) => {
          handleOnInputChange("remainderTime", formatTime(time));
          setShowRemainderTime(false);
        }}
        onCancel={() => {
          setShowRemainderTime(false);
        }}
      />
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
  text: {
    fontSize: 15,
    padding: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
    marginTop: 25,
  },
});
