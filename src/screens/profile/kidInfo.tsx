import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, DatePickerIOS, DatePickerAndroid, Image } from 'react-native';
import { Avatar, Layout, Icon, Menu, Input, Datepicker } from 'react-native-ui-kitten'
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';


export default class KidProfile extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            image: 'https://firebasestorage.googleapis.com/v0/b/graduatedproject-c9985.appspot.com/o/Kids%2F60186920_2396887807044993_7247108784823205888_o.jpg?alt=media&token=b3ca1622-0658-4d95-81d3-e47e08e89b83',
            fullname: '',
            nickname: '',
            studentID: '',
            date: new Date(),
            gender: '',
            className: '',
            school: '',
        };
    }


    onNameChange = (fullname) => {
        this.setState({ fullname });
    };
    onNicknameChange = (nickname) => {
        this.setState({ nickname });
    };
    onIDChange = (studentID) => {
        this.setState({ studentID });
    };
    onSelect = (date) => {
        this.setState({ date });
    };
    onGenderChange = (gender) => {
        this.setState({ gender });
    };
    onClassChange = (className) => {
        this.setState({ className });
    };
    onSchoolChange = (school) => {
        this.setState({ school });
    };

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


    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }

    getPermissionAsync = async () => {
        if (Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Kid Profile</Text>
                <TouchableOpacity style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={this._pickImage}>
                    <Image source={{ uri: this.state.image }} style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: -1 }} />
                </TouchableOpacity>
                <Input
                    label='Full name'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    returnKeyType='done'
                    value={this.state.fullname}
                    onChangeText={this.onNameChange}
                    labelStyle={{color: '#000'}}
                />
                <Input
                    label='Nick name'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    returnKeyType='done'
                    value={this.state.nickname}
                    onChangeText={this.onNicknameChange}
                />
                <Input
                    label='StudentID'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    returnKeyType='done'
                    value={this.state.studentID}
                    onChangeText={this.onIDChange}
                />
                {/* <Datepicker
                    date={this.state.date}
                    icon={CalendarIcon}
                    onSelect={this.onSelect}
                    StyledComponentProps={{width: 100}}
                /> */}
                <View style={{ width: '100%' }}>
                    <Text>Date of Birth</Text>
                    <TouchableOpacity style={styles.dateholder} onPress={this.onPickDate}>
                        <Text>{moment(this.state.date).format('DD/MM/YYYY')}</Text>
                    </TouchableOpacity>
                </View>



                <Input
                    label='Gender'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    returnKeyType='done'
                    value={this.state.gender}
                    onChangeText={this.onGenderChange}
                />
                <Input
                    label='Class'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    returnKeyType='done'
                    value={this.state.className}
                    onChangeText={this.onClassChange}
                />
                <Input
                    label='School'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    returnKeyType='done'
                    value={this.state.school}
                    onChangeText={this.onSchoolChange}
                />

                <TouchableOpacity style={styles.updateButton}>
                    <Text>Update</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(234, 195, 176)',
        paddingHorizontal: 16,
        marginTop: 24
    },

    title: {
        fontSize: 33,
        fontWeight: `bold`,
        color: `rgb(221, 97, 97)`
    },
    textInput: {
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },

    updateButton: {
        width: 100,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221, 97, 97)',
        marginVertical: 4
    },

    dateholder: {
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 6
    },

    contentContainer: {
        alignItems: `center`,
        justifyContent: `center`,
        flexGrow: 1
    },
})