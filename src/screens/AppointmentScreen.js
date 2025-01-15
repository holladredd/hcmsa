import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const AppointmentScreen = ({ route, navigation }) => {
  const [appointments, setAppointments] = useState([]);

  const handleUnbookAppointment = (appointmentId) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((item) => item.id !== appointmentId)
    );
    Alert.alert("Unbooked", "You have unbooked the appointment");
  };

  const handleAddNote = (appointmentId, note) => {
    const updatedAppointments = appointments.map((item) =>
      item.id === appointmentId ? { ...item, notes: note } : item
    );
    setAppointments(updatedAppointments);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* Next Appointment Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
        <View style={styles.appointmentBox}>
          <Text style={styles.detailText}>Date: October 20, 2024</Text>
          <Text style={styles.detailText}>Location: Sunshine Hospital</Text>
          <Text style={styles.detailText}>Doctor: Dr. Williams</Text>
          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={() => navigation.navigate("Appointment")}
          >
            <Text style={styles.buttonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.header}>Your Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
            <TextInput
              style={styles.input}
              placeholder="Add notes"
              value={item.notes}
              onChangeText={(text) => handleAddNote(item.id, text)}
            />
            <TouchableOpacity
              style={styles.unbookButton}
              onPress={() => handleUnbookAppointment(item.id)}
            >
              <Text style={styles.unbookButtonText}>Unbook Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#efebec",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#444",
  },
  appointmentBox: {
    backgroundColor: "#eef4f9",
    padding: 15,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  rescheduleButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  appointmentItem: {
    padding: 15,
    marginVertical: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  appointmentCard: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  input: {
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  unbookButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "#FF6347",
    borderRadius: 8,
  },
  unbookButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default AppointmentScreen;
