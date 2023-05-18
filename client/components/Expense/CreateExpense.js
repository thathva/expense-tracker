import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';

const CreateExpense = () => {
  const [checked, setChecked] = React.useState('Credit');
  return (
    <ImageBackground
      source={require('../../assets/Atlas.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
        <TextInput label="Name" style={styles.input} />
        <TextInput label="Year" keyboardType="numeric" style={styles.input} />
        <TextInput label="Month" keyboardType="numeric" style={styles.input} />
        <TextInput label="Day" keyboardType="numeric" style={styles.input} />
        <TextInput label="Category" style={styles.input} />
        <TextInput label="Amount" keyboardType="numeric" style={styles.input} />
        <View style={styles.radioContainer}>
          <Text>Credit</Text>
          <RadioButton
            value="Credit"
            status={checked === 'Credit' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Credit')}
          />
        </View>
        <View style={styles.radioContainer}>
          <Text>Debit</Text>
          <RadioButton
            value="Debit"
            status={checked === 'Debit' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Debit')}
          />
        </View>
        <Button mode="contained" onPress={() => console.log('Submit pressed')}>
          Submit
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default CreateExpense;