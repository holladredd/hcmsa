import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useHome } from "../context/HomeContext";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "react-native-vector-icons";
const Header = () => {
  const { userDetails, notifications } = useHome();
  const { setIsAuthenticated, user } = useAuth();
  const navigation = useNavigation();
  const hasNotifications = notifications?.length === 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.username?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.header}>{user?.username}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Ionicons name="notifications" size={24} color="#4CAF50" />
        {hasNotifications && <View style={styles.notificationDot} />}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  header: {
    fontSize: 18,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  avatarContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  notificationContainer: {
    position: "relative",
    padding: 5,
  },
  notificationDot: {
    position: "absolute",
    right: 3,
    top: 3,
    width: 8,
    height: 8,
    backgroundColor: "#FF0000",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
