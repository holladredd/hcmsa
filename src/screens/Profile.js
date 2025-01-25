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
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";

const Profile = () => {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [editing, setEditing] = useState(false);
  const { setIsAuthenticated } = useAuth();

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

  const handleLogout = async () => {
    try {
      // await removeToken();
      // navigation.navigate("Login");
      await setIsAuthenticated(false);
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
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
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Go Back Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   padding: 20,
  //   backgroundColor: "#f8f8f8",
  // },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // paddingTop: 50,
    backgroundColor: "#efebec",
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
