import firebase from 'firebase';
import moment from 'moment';
import React from 'react';
import { DatePickerAndroid, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import { Input } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { showSuccess } from '../../core';
import { IRootState } from '../../store';

// function Item({ item }: any) {
//     return (
//         <View style={styles.item}>
//             <View style={styles.titleContainer}>
//                 <Text style={styles.content}>{item.content}</Text>
//                 <Text style={styles.date}>{item.timestamp}</Text>
//                 <Text style={styles.confirm}>Confirmed</Text>
//                 <Text style={styles.byTeacher}>By Nguyen Thu Thao</Text>
//             </View>
//         </View>
//     );
// }
class AbsenceRequests extends React.Component<any, any> {

    static navigationOptions = {
        title: 'Absence Requests',
    };

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            content: '',
        }
    }

    onContentChange = (content) => {
        this.setState({ content } as any);
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


    submitRequests = async () => {
        Keyboard.dismiss()
        await firebase.firestore().collection('AbsenceRequests').add({
            timestamp: moment(this.state.date).startOf('day').toISOString(),
            content: this.state.content,
            kidID: this.props.kidProfile.id
        })
        showSuccess('Submitted request successfully!')
        this.setState({ content: '' })
    }

    componentDidMount() {
        this.props.getAbsenceRequests()
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/background4.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'left' }}>Please select a date</Text>
                    <TouchableOpacity style={styles.dateholder} onPress={this.onPickDate}>
                        <Text>{moment(this.state.date).format('DD/MM/YYYY')}</Text>
                    </TouchableOpacity>
                    <Input
                        label='Reason'
                        size='large'
                        style={styles.textInput}
                        status='danger'
                        returnKeyType='done'
                        value={this.state.content}
                        onChangeText={this.onContentChange}
                        labelStyle={{ color: '#000' }}
                        textStyle={{ color: '#000' }}
                        multiline
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={this.submitRequests}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>

                {/* <View>
                    <FlatList
                        data={this.props.absenceRequests.all}
                        renderItem={({ item }) => <Item item={item} />} />
                </View> */}
            </ImageBackground>
        );
    }
}

const mapProps = ({ kidProfile }: IRootState) => ({
    kidProfile
})
const mapDispatch: any = ({ absenceRequests: { getAbsenceRequests } }) => ({
    getAbsenceRequests: () => getAbsenceRequests(),
})
export default connect(mapProps, mapDispatch)(AbsenceRequests)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'rgb(234, 195, 176)',
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 16
    },

    dateholder: {
        height: 40,
        width: '100%',
        backgroundColor: '#EDEDED',
        borderRadius: 6
    },

    textInput: {
        borderRadius: 6,
        backgroundColor: '#EDEDED',

    },

    submitButton: {
        width: 100,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221, 97, 97)',
        marginVertical: 4,
        alignSelf: 'center'
    },
})