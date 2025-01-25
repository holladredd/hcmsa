import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Animated,
  //   ScrollView,
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { useAuth } from "../context/AuthContext";
import SettingsHeader from "../components/SettingsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
// import { SafeAreaView } from "react-native-web";

const SettingItem = ({ icon, title, value, onPress, type = "toggle" }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <MaterialIcons name={icon} size={24} color="#666" />
      <Text style={styles.settingText}>{title}</Text>
    </View>
    {type === "toggle" ? (
      <Switch
        value={value}
        onValueChange={onPress}
        trackColor={{ false: "#767577", true: "#4CAF50" }}
        thumbColor={value ? "#fff" : "#f4f3f4"}
      />
    ) : (
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    )}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <SettingsHeader />
      <Animated.ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.section}>
          <SettingItem
            icon="person"
            title="Edit Profile"
            type="link"
            onPress={() => {}}
          />
          <SettingItem
            icon="lock"
            title="Change Password"
            type="link"
            onPress={() => {}}
          />
          <SettingItem
            icon="language"
            title="Language"
            type="link"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.section}>
          <SettingItem
            icon="notifications"
            title="Push Notifications"
            value={notifications}
            onPress={() => setNotifications(!notifications)}
          />
          <SettingItem
            icon="nights-stay"
            title="Dark Mode"
            value={darkMode}
            onPress={() => setDarkMode(!darkMode)}
          />
          <SettingItem
            icon="mail"
            title="Email Updates"
            value={emailUpdates}
            onPress={() => setEmailUpdates(!emailUpdates)}
          />
        </View>

        <Text style={styles.sectionTitle}>Help & Support</Text>
        <View style={styles.section}>
          <SettingItem
            icon="help"
            title="Help Center"
            type="link"
            onPress={() => {}}
          />
          <SettingItem
            icon="privacy-tip"
            title="Privacy Policy"
            type="link"
            onPress={() => {}}
          />
          <SettingItem
            icon="description"
            title="Terms of Service"
            type="link"
            onPress={() => {}}
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  versionContainer: {
    padding: 20,
    alignItems: "center",
  },
  versionText: {
    color: "#666",
    fontSize: 14,
  },
});

export default SettingsScreen;
