import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList } from 'react-native';

const PregnancyTimelineScreen = () => {
    const [timelineEvents, setTimelineEvents] = useState([]);
    const [newEvent, setNewEvent] = useState('');

    const handleAddEvent = () => {
        if (newEvent) {
            setTimelineEvents([...timelineEvents, { id: Date.now().toString(), content: newEvent }]);
            setNewEvent('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Personalized Pregnancy Timeline</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a milestone..."
                value={newEvent}
                onChangeText={setNewEvent}
            />
            <Button title="Add Event" onPress={handleAddEvent} />
            <FlatList
                data={timelineEvents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.eventItem}>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    eventItem: {
        padding: 15,
        marginVertical: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
});

export default PregnancyTimelineScreen;
