import React from 'react';
import { DatePickerAndroid, StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Input } from 'react-native-ui-kitten';
import moment from 'moment';
export default class AbsenceRequests extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            content: '',
        }
    }

    onContentChange = (content) => {
        this.setState = ({ content } as any);
    }

    onPickDate = async () => {
        try {
            const { action, year, month, day }: any = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.state.date,
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                this.setState({
                    date: new Date(year, month, day)
                })

            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style={{ width: '100%' }}>
                    <Text>Date of Birth</Text>
                    <TouchableOpacity style={styles.dateholder} onPress={this.onPickDate}>
                        <Text>{moment(this.state.date).format('DD/MM/YYYY')}</Text>
                    </TouchableOpacity>
                    <Input
                        label='Reason'
                        size='large'
                        style={styles.textInput}
                        status='danger'
                        returnKeyType='done'
                        value={this.state.fullname}
                        onChangeText={this.onContentChange}
                        labelStyle={{ color: '#000' }}
                        textStyle={{ color: '#000' }}
                        multiline
                    />
                    <TouchableOpacity style={styles.submitButton} >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'rgb(234, 195, 176)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },

    dateholder: {
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 6
    },

    textInput: {
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },

    submitButton: {
        width: 100,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221, 97, 97)',
        marginVertical: 4
    },
})