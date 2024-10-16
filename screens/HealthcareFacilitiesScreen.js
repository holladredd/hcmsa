import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';

const HealthcareFacilitiesScreen = () => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        // Fetch healthcare facilities from the backend API (Placeholder)
        const fetchFacilities = async () => {
            // Example API call
            // const response = await fetch('YOUR_API_URL/facilities');
            // const data = await response.json();
            // setFacilities(data);

            // Mock data for demonstration
            setFacilities([
                { id: '1', name: 'Health Clinic A', location: 'Ado, Ekiti' },
                { id: '2', name: 'Health Center B', location: 'Ado, Ekiti' },
            ]);
        };

        fetchFacilities();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Healthcare Facilities Nearby</Text>
            <FlatList
                data={facilities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.facilityItem}>
                        <Text>Name: {item.name}</Text>
                        <Text>Location: {item.location}</Text>
                    </View>
                )}
            />
            <Button title="Search Healthcare Facilities" onPress={() => { /* Implement search feature */ }} />
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
    facilityItem: {
        padding: 15,
        marginVertical: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
});

export default HealthcareFacilitiesScreen;
