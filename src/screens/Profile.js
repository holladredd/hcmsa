import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const Profile = () => {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [editing, setEditing] = useState(false);

  const navigation = useNavigation();
  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
    Alert.alert(
      "Profile Updated",
      "Your profile has been successfully updated."
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          // Logic for logging out the user can go here
          Alert.alert("Logged out", "You have been logged out.");
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileField}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={editing}
        />
      </View>

      <View style={styles.profileField}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={editing}
        />
      </View>

      <View style={styles.profileField}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          editable={editing}
        />
      </View>

      <TouchableOpacity
        style={editing ? styles.saveButton : styles.editButton}
        onPress={editing ? handleSave : handleEditToggle}
      >
        <Text style={styles.buttonText}>
          {editing ? "Save Changes" : "Edit Profile"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default Profile;
