import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import moment from 'moment';
import React from 'react';
import { DatePickerAndroid, Image,  StyleSheet, Text, ImageBackground, TouchableOpacity, View, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CheckBox, Input } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import SafeAreaView from 'react-native-safe-area-view';

class KidProfile extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            avatarURL: props.kidProfile.avatarURL,
            fullname: props.kidProfile.fullname,
            nickname: props.kidProfile.nickname,
            studentID: props.kidProfile.studentID,
            date: new Date(props.kidProfile.dob),
            gender: props.kidProfile.gender,
            className: props.kidProfile.class,
            school: props.kidProfile.school
        };
    }

    static navigationOptions = {
        title: 'Kid Profile',
    };



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

    onUpdate = () => {
        this.props.updateKidProfile({
            ...this.state
        })
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
            <ImageBackground source={require('../../../assets/background5.jpg')} style={{width: '100%', height: '100%'}}>   
            <SafeAreaView style={styles.androidSafeArea}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <TouchableOpacity style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={this._pickImage}>
                        <Image source={{ uri: this.state.avatarURL }} style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: -1 }} />
                    </TouchableOpacity>
                    <Input
                        label='Full name'
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        returnKeyType='done'
                        value={this.state.fullname}
                        onChangeText={this.onNameChange}
                        labelStyle={{ color: '#000' }}
                        textStyle={{ color: '#000' }}
                    />
                    <Input
                        label='Nick name'
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        returnKeyType='done'
                        value={this.state.nickname}
                        onChangeText={this.onNicknameChange}
                        labelStyle={{ color: '#000' }}
                        textStyle={{ color: '#000' }}
                    />

                    <View style={{ width: '100%' }}>
                        <Text>Date of Birth</Text>
                        <TouchableOpacity style={styles.dateholder} onPress={this.onPickDate}>
                            <Text>{moment(this.state.date).format('DD/MM/YYYY')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%' }}>
                        <Text style={{ textAlign: 'left' }}>Gender</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <CheckBox
                                status='danger'
                                text='Male'
                                checked={this.state.gender === 'male'}
                                onChange={() => this.onGenderChange('male')}
                            />
                            <CheckBox
                                status='danger'
                                text='Female'
                                checked={this.state.gender === 'female'}
                                onChange={() => this.onGenderChange('female')}
                                disabled={true}
                            /></View>

                    </View>

                    <Input
                        label='StudentID'
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        returnKeyType='done'
                        value={this.state.studentID}
                        onChangeText={this.onIDChange}
                        labelStyle={{ color: '#000' }}
                        textStyle={{ color: '#000' }}
                        disabled={true}
                    />

                    <Input
                        label='Class'
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        returnKeyType='done'
                        value={this.state.className}
                        onChangeText={this.onClassChange}
                        labelStyle={{ color: '#000' }}
                        textStyle={{ color: '#000' }}
                        disabled={true}
                    />
                    <Input
                        label='School'
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        returnKeyType='done'
                        value={this.state.school}
                        onChangeText={this.onSchoolChange}
                        labelStyle={{ color: '#000' }}
                        textStyle={{ color: '#000' }}
                        disabled={true}
                    />

                    <TouchableOpacity style={styles.updateButton} onPress={this.onUpdate}>
                        <Text>Update</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
            </ImageBackground>
        )
    }
}

const mapProps = ({ kidProfile }: IRootState) => ({
    kidProfile
})

const mapDispatch: any = ({ userProfile: { login, updateKidProfile } }) => ({
    login: ({ email, password }) => login({ email, password }),
    updateKidProfile: ({
        avatarURL,
        fullname,
        nickname,
        studentID,
        date,
        gender,
        className,
        school
    }) => updateKidProfile({
        avatarURL,
        fullname,
        nickname,
        studentID,
        date,
        gender,
        className,
        school
    }),
})

export default connect(mapProps, mapDispatch)(KidProfile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'rgb(234, 195, 176)',
        paddingHorizontal: 16,
    },

    textInput: {
        borderRadius: 6,
        backgroundColor: '#EDEDED',
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
        backgroundColor: '#EDEDED',
        borderRadius: 6
    },

    contentContainer: {
        alignItems: `center`,
        justifyContent: `center`,
        flexGrow: 1
    },

    androidSafeArea: {
        flex: 1,
        // backgroundColor: npLBlue,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
})