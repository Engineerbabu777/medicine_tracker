import { getLocalStorage, removeLocalStorage } from "@/service/Storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constant/Colors";
import EmptyState from "./EmptyState";
export default function Header() {
  const [user, setUser] = useState<any>(null);

  const getUserDetails = async () => {
    const user = await getLocalStorage("user");
    console.log("from header/:", { user });

    setUser(user);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("../assets/images/smiley.png")}
            style={{
              width: 45,
              height: 45,
            }}
          />
          <Text style={{ fontSize: 25, fontWeight: "black" }}>
            {user?.displayName || "User"} 👋
          </Text>
        </View>
        <Ionicons name="settings-outline" size={35} color={Colors.DARK_GRAY} />
      </View>

    </View>
  );
}
