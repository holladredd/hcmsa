import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    if (newPost) {
      setPosts([...posts, { id: Date.now().toString(), content: newPost }]);
      setNewPost("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.header}>Mother-to-Mother Support Forum</Text>
      <TextInput
        style={styles.input}
        placeholder="Share your experience..."
        value={newPost}
        onChangeText={setNewPost}
      />
      <Button title="Post" onPress={handleAddPost} color={"#4CAF50"} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // paddingTop: 50,
    backgroundColor: "#efebec",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  postItem: {
    padding: 15,
    marginVertical: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
});

export default ForumScreen;
