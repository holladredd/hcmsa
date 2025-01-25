import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useHome } from "../context/HomeContext";
import { useAuth } from "../context/AuthContext";
import { EvilIcons } from "react-native-vector-icons";

const ProfileHeader = () => {
  const { userDetails } = useHome();
  const { setIsAuthenticated, user } = useAuth();
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
      <Text style={styles.header}>Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <EvilIcons name="gear" size={27} color="#666666c0" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

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
});
