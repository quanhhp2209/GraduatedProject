import React from 'react';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { LoadingOverlay } from '../../components';
import { IRootState } from '../../store';
import firebase from 'firebase';
import { showError, showSuccess } from '../../core';
import SafeAreaView from 'react-native-safe-area-view';
// import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
class Login extends React.PureComponent<any> {
    state = {
        email: '',
    };

    onEmailChange = (email) => {
        this.setState({ email });
    };

    onForgotPassword = async () => {
        try {
            Keyboard.dismiss();
            await firebase.auth().sendPasswordResetEmail(this.state.email)
            showSuccess('Send email successfully')
        } catch (e) {
            showError(e.message)
        }

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <LoadingOverlay isVisible={this.props.userProfile.isLoggingIn} />
                    <Text style={styles.title}>Forgot password</Text>
                    <Input placeholder="Enter your email"
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        value={this.state.email}
                        onChangeText={this.onEmailChange}
                        textStyle={{ color: 'black' }}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={this.onForgotPassword}>
                        <Text>SEND EMAIL</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView >
            </TouchableWithoutFeedback>
        );
    }
}

const mapProps = ({ userProfile }: IRootState) => ({
    userProfile
})

export default connect(mapProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(234, 195, 176)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    title: {
        fontSize: 33,
        fontWeight: `bold`,
        color: `rgb(221, 97, 97)`,
        paddingBottom: 18,
        textAlign: 'left'
    },
    loginButton: {
        width: 329,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221, 97, 97)',
        marginVertical: 4
    },

    resetButton: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        paddingRight: 1,
        paddingTop: 4,
        marginVertical: 4
    },
    resetPasswordText: {
        color: 'rgb(221, 97, 97)'
    },
    textInput: {
        borderRadius: 6,
        marginVertical: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }
});
