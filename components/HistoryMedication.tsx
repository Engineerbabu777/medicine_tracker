import { db } from "@/config/firebaseConfig";
import Colors from "@/constant/Colors";
import {
  getDateRangesToDisplay,
  getPreviousDateRangesToDisplay,
} from "@/service/ConvertDateTime";
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
  ActivityIndicator,
} from "react-native";
import MedicationCardItem from "./MedicationCardItem";
import EmptyState from "./EmptyState";
import { useRouter } from "expo-router";

export default function MedicationList() {
  const [medicationList, setMedicationList] = useState<any>([]);
  const [dateRangeList, setDateRangeList] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<any>(
    moment().subtract(1, "days").format("MM/DD/YYYY")
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getDateRangeList = () => {
    const dates = getPreviousDateRangesToDisplay();
    setDateRangeList(dates);
    console.log(dates);
  };

  const getMedicationList = async (date: any) => {
    setMedicationList([]);
    const user: User | null = await getLocalStorage("user");
    setIsLoading(true);
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

    setIsLoading(false);

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
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{ marginBottom: 0 }}>
      

          <View style={{ marginTop: 20 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dateRangeList}
              keyExtractor={(item, index) => `date-${index}`}
              renderItem={({ item }) => (
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
                          item.formattedDate === selectedDate
                            ? "white"
                            : "black",
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
                          item.formattedDate === selectedDate
                            ? "white"
                            : "black",
                      },
                    ]}
                  >
                    {item?.date}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      }
      data={medicationList}
      keyExtractor={(item, index) => `med-${index}`}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/action-modal",
              params: { ...item, selectedDate: selectedDate },
            });
          }}
        >
          <MedicationCardItem medicine={item} selectedDate={selectedDate} />
        </Pressable>
      )}
      ListEmptyComponent={
        isLoading ? (
          <View
            style={{
              flex: 1,
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          </View>
        ) : (<>
        
        <Text>No Medication</Text></>
        )
      }
    />
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
