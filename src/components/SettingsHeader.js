import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-web";
import { EvilIcons } from "react-native-vector-icons";

export default function SettingsHeader() {
  return;
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      <EvilIcons name="chevron-left" size={30} color="#666666c5" />
      <Text style={styles.backButtonText}>Go Back</Text>
    </TouchableOpacity>
    <Text style={styles.header}>Settings</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <EvilIcons name="gear" size={27} color="#666666c0" />
    </TouchableOpacity>
  </View>;
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "#66666690",
    fontSize: 13,
  },
  header: {
    fontSize: 20,
    color: "#666666",
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
