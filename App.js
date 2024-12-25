import React from "react";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import AuthProvider from "./AuthContext";
import HomeScreen from "./screens/HomeScreen";
import HealthcareFacilitiesScreen from "./screens/HealthcareFacilitiesScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import ForumScreen from "./screens/ForumScreen";
import PregnancyTimelineScreen from "./screens/PregnancyTimelineScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import Profile from "./screens/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("Login") ||
    routeName?.includes("SignUp") ||
    routeName?.includes("Profile")
  ) {
    return "none";
  }
};

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#4CAF50",
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 10,
          right: 10,
          height: 60,
          borderColor: "#b0afae",
          borderWidth: 2,
          alignItems: "center",
          borderRadius: 15,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getRouteName(route),
            position: "absolute",
            bottom: 15,
            left: 10,
            right: 10,
            height: 60,
            borderColor: "#b0afae",
            borderWidth: 2,
            alignItems: "center",
            borderRadius: 15,
            elevation: 0,
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name={"home"} color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Healthcare Facilities"
        component={HealthcareFacilitiesScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name={"healing"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name={"paperclip"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Forum"
        component={ForumScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name={"forum"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pregnancy Timeline"
        component={PregnancyTimelineScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name={"target"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

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
