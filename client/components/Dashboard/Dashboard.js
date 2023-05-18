import * as React from 'react';
import { Text, Button, List } from 'react-native-paper';
import { StyleSheet, View, ImageBackground } from 'react-native';

const Dashboard = ({ navigation }) => {
  const [expense, setExpenses] = React.useState('$0.00');
  const transactions = [
    { id: 1, description: 'Transaction 1', amount: '$10.00' },
    { id: 2, description: 'Transaction 2', amount: '$20.00' },
    { id: 3, description: 'Transaction 3', amount: '$30.00' },
    { id: 4, description: 'Transaction 4', amount: '$40.00' },
    { id: 5, description: 'Transaction 5', amount: '$50.00' },
  ];

  return (
    <ImageBackground
      source={require('../../assets/Atlas.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>This month's expenses</Text>
        <Text style={styles.expenseText} variant="displayLarge">
          {expense}
        </Text>
        <Text style={styles.previousText}>Previous 5 transactions:</Text>
        <List.Section style={styles.transactionList}>
          {transactions.map((transaction) => (
            <List.Item
              key={transaction.id}
              title={transaction.description}
              description={transaction.amount}
              left={(props) => <List.Icon {...props} icon="currency-usd" />}
            />
          ))}
        </List.Section>
        <View style={styles.buttonContainer}>
          <Button
            icon="plus"
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('CreateExpense')}
          >
            Add an Expense
          </Button>
          <Button
            icon="view-agenda"
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('ViewExpense')}
          >
            View Expenses
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  expenseText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 32,
  },
  previousText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  transactionList: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginBottom: 16,
    width: '80%',
    height: 48,
    justifyContent: 'center',
  },
});

export default Dashboard;
