import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageView: {
    display:"flex",
    alignItems: "center",
    marginTop: 40,
  },
  image: {
    width: 210,
    height: 460,
    borderRadius: 23,
  },
});
