import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
// import { AuthContext } from "../../AuthContext";
import { useAuth } from "../../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { register } = useContext(AuthContext);
  const { signup, loading } = useAuth();

  const validateInputs = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      await signup(name, email, password);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  // const onRegister = async () => {
  //   if (!name || !email || !password) {
  //     Alert.alert("Error", "Please fill in all fields");
  //     return;
  //   }

  //   try {
  //     await signup(name, email, password);
  //     navigation.navigate("HomeScreen");
  //   } catch (error) {
  //     Alert.alert("Registration Failed", error.message);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        // value={name}
        // onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        // value={email}
        // onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        // value={password}
        // onChangeText={setPassword}
        secureTextEntry
      />

      {/* onPress={() => register(name, email, password)}  */}
      <TouchableOpacity
        style={{
          backgroundColor: "#4CAF50",
          Text: "#fff",
          padding: 10,
          flexDirection: "row",
          borderRadius: 15,
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>
          {loading ? "Creating Account..." : "Register"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
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
  link: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
});

export default RegisterScreen;
