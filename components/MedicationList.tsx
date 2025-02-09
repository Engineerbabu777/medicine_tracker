import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import { getDateRangesToDisplay } from "@/service/ConvertDateTime";
import { getLocalStorage } from "@/service/Storage";
import { User } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import MedicationCardItem from "./MedicationCardItem";

export default function MedicationList() {
  const [medicationList, setMedicationList] = useState<any>([]);
  const [dateRangeList, setDateRangeList] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<any>(
    moment().format("MM/DD/YYYY")
  );

  const getDateRangeList = () => {
    const dates = getDateRangesToDisplay();
    setDateRangeList(dates);
    console.log(dates);
  };

  const getMedicationList = async (date: any) => {
    const user: User | null = await getLocalStorage("user");

    const medicationRef = collection(db, "medications");
    const q = await query(
      medicationRef,
      where("userEmail", "==", user?.email),
      where("dates", "array-contains", date)
    );

    const docs = await getDocs(q);
    const medications = docs.docs.map((doc: DocumentData) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMedicationList(medications);
  };

  // FETCH DATA BASED ON THE SELECTED DATE
  useEffect(() => {
    getMedicationList(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    getDateRangeList();
  }, []);

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

      <View
        style={{
          marginTop: 20,
        }}
      >
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dateRangeList}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <Pressable
              style={[
                styles.dateGroup,
                {
                  backgroundColor:
                    item.formattedDate === selectedDate
                      ? Colors.PRIMARY
                      : Colors.LIGHT_GRAY_BORDER,
                },
              ]}
              onPress={() => setSelectedDate(item?.formattedDate)}
            >
              <Text
                style={[
                  styles.day,
                  {
                    color:
                      item.formattedDate === selectedDate ? "white" : "black",
                  },
                ]}
              >
                {item?.day}
              </Text>
              <Text
                style={[
                  styles.date,
                  {
                    color:
                      item.formattedDate === selectedDate ? "white" : "black",
                  },
                ]}
              >
                {item?.date}
              </Text>
            </Pressable>
          )}
        />

        <FlatList
          data={medicationList}
          renderItem={({ item }) => <MedicationCardItem medicine={item} />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: "flex",
    marginRight: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold",
  },
  selectedDate: {
    backgroundColor: Colors.PRIMARY,
    color: "white",
    borderRadius: 10,
  },
});
