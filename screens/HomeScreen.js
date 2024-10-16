import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Antenatal Management System</Text>
            <Button title="View Appointments" onPress={() => navigation.navigate('Appointment')} />
            <Button title="Join Forum" onPress={() => navigation.navigate('Forum')} />
            <Button title="Track Pregnancy" onPress={() => navigation.navigate('PregnancyTimeline')} />
            <Button title="Healthcare Facilities" onPress={() => navigation.navigate('HealthcareFacilities')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
