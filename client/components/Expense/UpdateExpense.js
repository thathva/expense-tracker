import * as React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import ViewExpense from './ViewExpense';


const UpdateExpense = () => {
    return (
        <ImageBackground
            source={require('../../assets/Atlas.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View>
                <ViewExpense mode="update"/>
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

export default UpdateExpense;