import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const data = ['asd', 'asd', 'asd', 'asd']
export class NutritionActivity extends React.PureComponent<any> {
    render() {
        const { activity } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.menuContainer}>
                    <Text style={[styles.subTitle, { color: '#FFCA40' }]}>🍝  BREAKFAST</Text>
                    <View style={styles.activityContainer}>
                        <View style={styles.line} />
                        <View>
                            {activity.breakfast.map(i => <Text style={styles.activity}>{i}</Text>)}
                        </View>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    <Text style={[styles.subTitle, { color: '#65E83A' }]}>🍱  LUNCH</Text>
                    <View style={styles.activityContainer}>
                        <View style={styles.line} />
                        <View>
                            {activity.lunch.map(i => <Text style={styles.activity}>{i}</Text>)}
                        </View>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    <Text style={[styles.subTitle, { color: '#57CAFF' }]}>🍉  SNACK</Text>
                    <View style={styles.activityContainer}>
                        <View style={styles.line} />
                        <View>
                            {activity.snack.map(i => <Text style={styles.activity}>{i}</Text>)}
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

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
        fontWeight: '900',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    activityContainer: {
        flexDirection: 'row',
        paddingVertical: 6,
        marginLeft: 8
    },
    line: {
        height: '100%',
        borderWidth: 1,
        borderColor: '#DAEDFF',
        alignSelf: 'center'
    },
    activity: {
        paddingLeft: 18,
        paddingVertical: 4
    },
    menuContainer: {
        marginTop: 12
    }

})
