import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import { StackNavigator } from "./navigation/StackNavigator";
import { HomeProvider } from "./context/HomeContext";

const App = () => {
  return (
    <AuthProvider>
      <HomeProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </HomeProvider>
    </AuthProvider>
  );
};

export default App;
