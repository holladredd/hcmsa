import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, EvilIcons } from "react-native-vector-icons";

const NotificationHeader = () => {
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
      <Text style={styles.header}>Notifications</Text>
      <View style={styles.rightSpace} />
    </View>
  );
};

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
    fontWeight: "bold",
    color: "#4CAF50",
  },
  rightSpace: {
    width: 34, // Matches back button width for centering
  },
});

export default NotificationHeader;
