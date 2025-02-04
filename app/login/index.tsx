import Colors from "@/constant/Colors";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View>
        <View style={styles.imageView}>
          <Image
            source={require("./../../assets/images/login.png")}
            style={styles.image}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: -8,
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          Stay on Track, Stay Healthy!
        </Text>

        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 17,
            marginTop: 20,
          }}
        >
          Track your control of your health.Stay consistent and healthy
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color:Colors.PRIMARY
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageView: {
    display: "flex",
    alignItems: "center",
    marginTop: 40,
  },
  image: {
    width: 210,
    height: 460,
    borderRadius: 23,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 99,
    padding: 15,
    marginTop:25
  },
});
