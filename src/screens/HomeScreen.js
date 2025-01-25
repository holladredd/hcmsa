import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import PTRView from "react-native-pull-to-refresh";
import { useHome } from "../context/HomeContext";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const {
    appointments,
    notifications,
    userDetails,
    loading,
    createAppointment,
    refreshHomeData,
  } = useHome();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // if (loading) {
  //   return <LoadingSpinner />;
  // }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Animated.ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileSection}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "light" }}>
              Welcome, Back{" "}
              {/* <Text style={{ fontSize: 15, fontWeight: "bold" }}>Jane Doe</Text> */}
            </Text>
            <Text style={styles.pregnancyInfo}>Weeks Pregnant: 24</Text>
          </View>
        </View>
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

        {/* Pregnancy Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pregnancy Timeline</Text>
          <View style={styles.progressBarContainer}>
            <Text style={styles.progressText}>24 weeks / 40 weeks</Text>
            <View style={styles.progressBar}>
              <View style={styles.progress}></View>
            </View>
          </View>
        </View>

        {/* Quick Actions: AI Assistant, Forum, Facility Search */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("Pregnancy Timeline")}
          >
            <Text style={styles.quickActionText}>AI Virtual Assistant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("Healthcare Facilities")}
          >
            <Text style={styles.quickActionText}>Find Healthcare Facility</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("Forum")}
          >
            <Text style={styles.quickActionText}>Mother Support Forum</Text>
          </TouchableOpacity>
        </View>

        {/* Pregnancy Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pregnancy Tips</Text>
          <Text style={styles.tipsText}>
            Eat nutritious meals and stay hydrated for a healthy pregnancy.
          </Text>
        </View>
        {/* Pregnancy Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pregnancy Tips</Text>
          <Text style={styles.tipsText}>
            Eat nutritious meals and stay hydrated for a healthy pregnancy.
          </Text>
        </View>

        {/* <Button
        title="View Appointments"
        onPress={() => navigation.navigate("Appointment")}
        />
        <Button title="Join Forum" onPress={() => navigation.navigate("Forum")} />
        <Button
        title="Track Pregnancy"
        onPress={() => navigation.navigate("PregnancyTimeline")}
        />
        <Button
        title="Healthcare Facilities"
        onPress={() => navigation.navigate("HealthcareFacilities")}
        /> */}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // paddingTop: 50,
    backgroundColor: "#efebec",
  },
  profileSection: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  // profilePic: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  header: {
    fontSize: 28,
    fontWeight: "semi-bold",
    marginTop: 10,
  },
  pregnancyInfo: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 20,
    elevation: 3,
  },
  detailText: { fontSize: 16, color: "#555" },
  button: {
    backgroundColor: "#3275a8",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  progressBarContainer: {
    paddingVertical: 10,
  },
  progressText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  progress: {
    height: "100%",
    width: "60%", // 60% Progress Example
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: "#4CAF50af",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  quickActionText: {
    color: "#fff",
    fontWeight: "600",
  },
  inputContainer: {
    padding: 5,
    // margin: 5,
    backgroundColor: "#fff",
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
  },

  tipsText: {
    fontSize: 16,
    color: "#555",
  },
});

export default HomeScreen;
