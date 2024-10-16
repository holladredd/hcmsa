import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList } from 'react-native';

const ForumScreen = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    const handleAddPost = () => {
        if (newPost) {
            setPosts([...posts, { id: Date.now().toString(), content: newPost }]);
            setNewPost('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mother-to-Mother Support Forum</Text>
            <TextInput
                style={styles.input}
                placeholder="Share your experience..."
                value={newPost}
                onChangeText={setNewPost}
            />
            <Button title="Post" onPress={handleAddPost} />
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.postItem}>
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
    postItem: {
        padding: 15,
        marginVertical: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
});

export default ForumScreen;
