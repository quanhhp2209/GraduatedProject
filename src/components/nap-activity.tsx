import React from 'react';
import {
    ActivityIndicator, StyleSheet, View,
    Text
} from 'react-native';

export class NapActivity extends React.PureComponent<any> {
    render() {
        const { activity } = this.props
        return (
            <View style={styles.container}>
                <Text>Sleep from</Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{activity.from}</Text>
                </View>
                <Text>to</Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{activity.to}</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 4,
        paddingVertical: 12
    },
    timeContainer: {
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#DAEDFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4
    },
    time: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#57CAFF'
    }
})
