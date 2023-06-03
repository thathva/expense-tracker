import * as React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import ViewExpense from './ViewExpense';


const DeleteExpense = () => {
    return (
        <ImageBackground
            source={require('../../assets/Atlas.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View>
                <ViewExpense mode="delete"/>
            </View>

        </ImageBackground>
    )
}

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
})

export default DeleteExpense;