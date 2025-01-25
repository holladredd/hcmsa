import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons, Feather } from "react-native-vector-icons";
import { useHome } from "../context/HomeContext";
import { useAuth } from "../context/AuthContext";

export default function SettingsHeader() {
  //   const { userDetails } = useHome();
  const { setIsAuthenticated } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <EvilIcons name="chevron-left" size={30} color="#666666c5" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Settings</Text>
      <TouchableOpacity onPress={() => setIsAuthenticated(false)}>
        <Feather name="log-out" size={27} color="#FF0000c0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
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
});
