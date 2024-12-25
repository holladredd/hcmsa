import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();

  const onLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={onLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
        Don't have an account? Register
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
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
});

export default LoginScreen;
