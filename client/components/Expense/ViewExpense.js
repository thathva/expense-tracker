import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, View, ImageBackground } from 'react-native';

const ViewExpense = () => {
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