import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground   } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import axios from 'axios'
import Toast from 'react-native-toast-message'


const Signup = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  const handleRegister = () => {
    const data = {
      'username': username,
      'password': password
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    axios.post('http://10.0.0.47:8000/register', data, config).then(response => {
      if(response.status == 200) {
        Toast.show({
          type: 'info',
          text1: 'Registration successful!'
        });
      }
      navigation.navigate('Dashboard');
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
        <Card.Title title="Signup" />
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
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={name => setConfirmPassword(name)}
            secureTextEntry
            style={styles.input}
          />
          {passwordsMatch ? '' : <Text>Passwords do not match!</Text>}
          <Button mode="contained" onPress={handleRegister} style={styles.button}>
            Signup
          </Button>
        </Card.Content>
      </Card>
      <Toast
        position='bottom'
        bottomOffset={20}
      />
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
    borderRadius: 16,

  },
  button: {
    marginTop: 16,
  },
});

export default Signup;
