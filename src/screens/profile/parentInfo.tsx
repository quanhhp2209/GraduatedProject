import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Avatar, Layout, Icon, Menu, Input } from 'react-native-ui-kitten';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
export default class ParentProfile extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            image: 'https://firebasestorage.googleapis.com/v0/b/graduatedproject-c9985.appspot.com/o/Users%2F53121590_2139412176104354_6852609411551068160_o.jpg?alt=media&token=97c5f51f-35d5-40fc-96de-80b003390890',
            fullname: '',
            relationship: '',
            email: '',
            address: '',
            phone: '',
        };
    }

    onNameChange = (fullname) => {
        this.setState({ fullname });
    };
    onRelationshipChange = (relationship) => {
        this.setState({ relationship });
    };
    onEmailChange = (email) => {
        this.setState({ email });
    };
    onAddressChange = (address) => {
        this.setState({ address });
    };
    onPhoneChange = (phone) => {
        this.setState({ phone });
    };


    render() {
        let { image } = this.state;
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Parent Profile</Text>
                <TouchableOpacity style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={this._pickImage}>
                    <Image source={{ uri: image }} style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: -1 }} />
                </TouchableOpacity>
                <Input
                    label='Full name'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    returnKeyType='done'
                    value={this.state.fullname}
                    onChangeText={this.onNameChange}
                />
                <Input
                    label='Relationship'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    returnKeyType='done'
                    value={this.state.relationship}
                    onChangeText={this.onRelationshipChange}
                />
                <Input
                    label='Email'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    keyboardType='email-address'
                    returnKeyType='done'
                    value={this.state.email}
                    onChangeText={this.onEmailChange}
                />
                <Input
                    label='Address'
                    size='small'
                    style={styles.textInput}
                    status='danger'

                    returnKeyType='done'
                    value={this.state.address}
                    onChangeText={this.onAddressChange}
                />
                <Input
                    label='Phone Number'
                    size='small'
                    style={styles.textInput}
                    status='danger'
                    keyboardType='phone-pad'
                    returnKeyType='done'
                    value={this.state.phone}
                    onChangeText={this.onPhoneChange}
                />

                <TouchableOpacity style={styles.updateButton}>
                    <Text>Update</Text>
                </TouchableOpacity>

            </ScrollView>
        )
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(234, 195, 176)',
        paddingHorizontal: 16,
        marginTop: 24
    },
    contentContainer: {
        alignItems: `center`,
        justifyContent: `center`,
        flexGrow: 1
    },
    title: {
        fontSize: 33,
        fontWeight: `bold`,
        color: `rgb(221, 97, 97)`
    },
    textInput: {
        borderRadius: 6,
        marginVertical: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },

    updateButton: {
        width: 200,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221, 97, 97)',
        marginVertical: 4
    },
})