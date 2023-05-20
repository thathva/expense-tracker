import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, View, ImageBackground } from 'react-native';
import axios from 'axios'

const ViewExpense = () => {
    const [transactions, setTransactions] = React.useState([])

    React.useEffect(() => {
        const config = {
          method: 'get',
          url: 'http://192.168.0.47:8000/view?userId=1',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        axios.request(config)
          .then((response) => {
            setTransactions(response.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return (
        <ImageBackground
            source={require('../../assets/Atlas.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <List.Section style={styles.transactionList}>
                    {transactions.map((transaction) => (
                        <List.Item
                            key={transaction.id}
                            title={transaction.expensename}
                            description={transaction.amount}
                            left={(props) => <List.Icon {...props} icon="currency-usd" />}
                        />
                    ))}
                </List.Section>
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
    transactionList: {
        width: '100%',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
});

export default ViewExpense;