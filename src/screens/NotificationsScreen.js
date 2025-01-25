import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { useHome } from "../context/HomeContext";
import NotificationHeader from "../components/NotificationHeader";

const NotificationItem = ({ notification, onPress }) => (
  <TouchableOpacity
    style={[
      styles.notificationItem,
      !notification.read && styles.unreadNotification,
    ]}
    onPress={onPress}
  >
    <View style={styles.iconContainer}>
      <MaterialIcons
        name={notification.type === "appointment" ? "event" : "notifications"}
        size={24}
        color="#4CAF50"
      />
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.message}>{notification.message}</Text>
      <Text style={styles.time}>{notification.time}</Text>
    </View>
  </TouchableOpacity>
);

const NotificationsScreen = () => {
  const { notifications, markNotificationAsRead, refreshHomeData } = useHome();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleNotificationPress = (notification) => {
    markNotificationAsRead(notification.id);
    // Handle navigation based on notification type
    if (notification.type === "appointment") {
      navigation.navigate("Appointment");
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshHomeData().then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NotificationHeader />
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="notifications-none" size={48} color="#666" />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    paddingTop: 35,
    backgroundColor: "#efebec",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  unreadNotification: {
    backgroundColor: "#f0f8ff",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});

export default NotificationsScreen;
