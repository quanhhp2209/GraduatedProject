import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const data = [{
    activity: 'abc',
    time: ' 7h30 - 7h45'
},
{
    activity: 'abc',
    time: ' 7h30 - 7h45'
},
{
    activity: 'abc',
    time: ' 7h30 - 7h45'
}]
export class LearnActivity extends React.PureComponent<any> {

    renderItem = (item) => {
        return <View key={item.time}>
            <View style={styles.timeContainer}>
                <View style={styles.circle} />
                <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.activityContainer}>
                <View style={styles.line} />
                <Text style={styles.activity}>{item.activity}</Text>
            </View>
        </View>
    }

    render() {
        const { activity } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{activity.name}</Text>
                <View style={styles.menuContainer}>
                    <Text style={styles.subTitle}>Morning</Text>
                    {activity.Morning.map(this.renderItem)}
                </View>
                <View style={styles.menuContainer}>
                    <Text style={styles.subTitle}>Afternoon</Text>
                    {activity.Afternoon.map(this.renderItem)}
                </View>
            </View>

        );
    }
}

const circleDiameter = 10

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        backgroundColor: '#fff',
        padding: 12
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    subTitle: {
        fontWeight: '500',
        paddingBottom: 8
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    time: {
        paddingLeft: 12,
        fontWeight: '700',
        color: '#57CAFF',
        fontSize: 13
    },
    circle: {
        width: circleDiameter,
        height: circleDiameter,
        borderRadius: circleDiameter / 2,
        backgroundColor: '#57CAFF'
    },
    activityContainer: {
        flexDirection: 'row',
        paddingVertical: 6,
        marginLeft: 4
    },
    line: {
        height: '100%',
        borderWidth: 1,
        borderColor: '#DAEDFF',
        alignSelf: 'center'
    },
    activity: {
        paddingLeft: 18,
        paddingVertical: 8
    },
    menuContainer: {
        marginTop: 12
    }

})
