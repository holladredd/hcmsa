import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.header}>Dredd</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image
          source={require("../assets/favicon.png")}
          style={styles.image}
          onPres
        />
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
    padding: 5,
  },
  header: {
    fontSize: 25,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
});
