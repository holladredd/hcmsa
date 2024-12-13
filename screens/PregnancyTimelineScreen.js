import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const PregnancyTimelineScreen = () => {
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");

  const handleAddEvent = () => {
    if (newEvent) {
      setTimelineEvents([
        ...timelineEvents,
        { id: Date.now().toString(), content: newEvent },
      ]);
      setNewEvent("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.header}>Personalized Pregnancy Timeline</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a milestone..."
        value={newEvent}
        onChangeText={setNewEvent}
      />
      <Button title="Add Event" onPress={handleAddEvent} color={"#4CAF50"} />
      <FlatList
        data={timelineEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text>{item.content}</Text>
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
    // paddingTop: 50,
    backgroundColor: "#efebec",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  eventItem: {
    padding: 15,
    marginVertical: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
});

export default PregnancyTimelineScreen;
