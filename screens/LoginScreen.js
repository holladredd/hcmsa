
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Image } from 'react-native';
// import { AuthContext } from '../AuthContext';

const LoginScreen = ({ navigation }) => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const { login } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                // value={email}
                // onChangeText={setEmail}
                />
            <TextInput
                style={styles.input}
                placeholder="Password"
                // value={password}
                // onChangeText={setPassword}
                secureTextEntry
                />
            <Button title="Login"  />
            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                Don't have an account? Register
            </Text>
              
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
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
    link: {
        marginTop: 10,
        color: 'blue',
        textAlign: 'center',
    },
});

export default LoginScreen;
