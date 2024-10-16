import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider from './AuthContext';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HealthcareFacilitiesScreen from './screens/HealthcareFacilitiesScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import ForumScreen from './screens/ForumScreen';
import PregnancyTimelineScreen from './screens/PregnancyTimelineScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Healthcare Facilities" component={HealthcareFacilitiesScreen} />
                    <Stack.Screen name="Appointment" component={AppointmentScreen} />
                    <Stack.Screen name="Forum" component={ForumScreen} />
                    <Stack.Screen name="Pregnancy Timeline" component={PregnancyTimelineScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
