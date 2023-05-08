import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';


export default function Homepage({ navigation }) {
    return (
      <ImageBackground source={require('../../assets/Atlas.png')} style={styles.container} resizeMode="cover">
        <Text variant="headlineLarge" style={styles.text}>Welcome to a new way of managing expenses!</Text>
        <View style={styles.spacer} />
        <Button mode="contained-tonal" style={styles.button} onPress={() => navigation.navigate('Login')}>
          Login
        </Button>
        <Button mode="contained-tonal" style={styles.button} onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Button>
      </ImageBackground>
    );
  }


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginVertical: 50,
    },
    spacer: {
      height: 20,
    },
    button: {
      alignItems: 'center',
      marginTop: 10,
      justifyContent: 'center',
      width: '50%',
      backgroundColor: '#FEAC5E'
    }
  });