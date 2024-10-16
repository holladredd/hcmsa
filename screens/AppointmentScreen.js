import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';

const AppointmentScreen = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch appointments from the backend API (Placeholder)
        const fetchAppointments = async () => {
            // Example API call
            // const response = await fetch('YOUR_API_URL/appointments');
            // const data = await response.json();
            // setAppointments(data);

            // Mock data for demonstration
            setAppointments([
                { id: '1', date: '2024-10-20', time: '10:00 AM', doctor: 'Dr. Smith' },
                { id: '2', date: '2024-10-22', time: '11:00 AM', doctor: 'Dr. Johnson' },
            ]);
        };

        fetchAppointments();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Appointments</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text>Date: {item.date}</Text>
                        <Text>Time: {item.time}</Text>
                        <Text>Doctor: {item.doctor}</Text>
                    </View>
                )}
            />
            <Button title="Schedule New Appointment" onPress={() => { /* Navigate to appointment scheduling */ }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    appointmentItem: {
        padding: 15,
        marginVertical: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
});

export default AppointmentScreen;
