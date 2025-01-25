import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  SafeAreaView,
  Animated,
  RefreshControl,
} from "react-native";
import Header from "../components/Header";

const HealthcareFacilities = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // List of healthcare facilities
  const facilities = [
    { id: "1", name: "General Hospital" },
    { id: "2", name: "City Clinic" },
    { id: "3", name: "Healthcare Center" },
    { id: "4", name: "Wellness Clinic" },
  ];

  // Function to handle booking an appointment
  const handleBookAppointment = (facility) => {
    setSelectedFacility(facility);
    setModalVisible(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  // Function to confirm the booking
  const confirmBooking = () => {
    if (selectedFacility) {
      const newAppointment = {
        id: selectedFacility.id,
        name: selectedFacility.name,
        date: "Pending", // Set a default value for date
      };
      setAppointments((prev) => [...prev, newAppointment]);
      setModalVisible(false);
      Alert.alert(
        "Success",
        `Appointment booked with ${selectedFacility.name}`
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View>
        <Text style={styles.title}>Healthcare Facilities</Text>
        <FlatList
          data={facilities}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.facilityCard}>
              <Text style={styles.facilityName}>{item.name}</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBookAppointment(item)}
              >
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Modal for confirming booking */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Confirm appointment with {selectedFacility?.name}?
              </Text>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmBooking}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Navigate to Upcoming Appointments */}
        <TouchableOpacity
          style={styles.upcomingButton}
          onPress={() => navigation.navigate("Appointment", { appointments })}
        >
          <Text style={styles.upcomingButtonText}>
            View Upcoming Appointments
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 36,
    backgroundColor: "#efebec",
  },
  profileSection: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  facilityCard: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  facilityName: {
    fontSize: 18,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  upcomingButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
  upcomingButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default HealthcareFacilities;
