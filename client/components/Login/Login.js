import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground   } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // handle login logic here
  };

  return (
    <ImageBackground source={require('../../assets/Atlas.png')} style={styles.container} resizeMode="cover">
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Login" />
        <Card.Content style={styles.content}>
          <TextInput
            label="Email"
            value={email}
            type='outlined'
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    padding: 30,
  },
  content: {
    padding: 42,
    alignItems: 'center',
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    marginTop: 16,
  },
});

export default Login;
