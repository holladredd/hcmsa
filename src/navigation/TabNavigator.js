import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigator } from "./StackNavigator";
import HealthcareFacilitiesScreen from "../screens/HealthcareFacilitiesScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import ForumScreen from "../screens/ForumScreen";
import PregnancyTimelineScreen from "../screens/PregnancyTimelineScreen";
import { FullWindowOverlay } from "react-native-screens";

const Tab = createBottomTabNavigator();
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

export function TabNavigator() {
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
          display: "flex",
          bottom: 10,
          left: 10,
          right: 10,
          height: 50,
          width: FullWindowOverlay,
          borderColor: "#b0afae",
          borderWidth: 1,

          marginHorizontal: "auto", // Centers the entire bar
          alignItems: "center",
          borderRadius: 20,
          elevation: 0,
        },
        tabBarItemStyle: {
          padding: 5,
          alignItems: "center",
          justifyContent: "center", // Centers individual tab items
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={({ route }) => ({
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
