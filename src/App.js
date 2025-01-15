import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import { TabNavigator } from "./navigation/TabNavigator";

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
