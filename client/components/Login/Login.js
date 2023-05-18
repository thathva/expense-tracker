import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground   } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import axios from 'axios'
import Toast from 'react-native-toast-message'

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    navigation.navigate('Dashboard');
    const data = {
      'username': username,
      'password': password
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    axios.post('http://10.0.0.47:8000/login', data, config).then(response => {
      if(response.status == 200) {
        navigation.navigate('Dashboard');
      }
    }).catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Some error occured!'
      });
    })
    
  };
 
  return (
    <ImageBackground source={require('../../assets/Atlas.png')} style={styles.container} resizeMode="cover">
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Login" />
        <Card.Content style={styles.content}>
          <TextInput
            label="Email"
            value={username}
            type='outlined'
            onChangeText={name => setUsername(name)}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={name => setPassword(name)}
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
