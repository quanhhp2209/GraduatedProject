import React from 'react';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { LoadingOverlay } from '../../components';
import { IRootState } from '../../store';
// import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
class Login extends React.PureComponent<any> {
    state = {
        email: '',
        password: '',
        secureTextEntry: true,
    };

    onEmailChange = (email) => {
        this.setState({ email });
    };

    onPasswordChange = (password) => {
        this.setState({ password });
    };

    onIconPress = () => {
        const secureTextEntry = !this.state.secureTextEntry;
        this.setState({ secureTextEntry });
    };

    renderIcon = (style) => {
        const iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';
        return (
            <Icon {...style} name={iconName} />
        );
    };
    
    onLogin = async () => {
        Keyboard.dismiss()
        this.props.login({ email: this.state.email, password: this.state.password })
    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <LoadingOverlay isVisible={this.props.userProfile.isLoggingIn} />
                    <Image source={require('../../../assets/kindergarten.png')}></Image>
                    <Text style={styles.title}>KidsFuture</Text>
                    <Input
                        placeholder="Enter your username"
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={this.onEmailChange}
                        textStyle={{color: 'black'}}
                    />

                    <Input placeholder="Enter your password"
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        value={this.state.password}
                        icon={this.renderIcon}
                        secureTextEntry={this.state.secureTextEntry}
                        onIconPress={this.onIconPress}
                        onChangeText={this.onPasswordChange}
                        textStyle={{color: 'black'}}
                    />

                    <TouchableOpacity style={styles.resetButton}>
                        <Text style={styles.resetPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={this.onLogin}>
                        <Text>LOG IN</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView >

            </TouchableWithoutFeedback>

        );
    }
}

const mapProps = ({ userProfile }: IRootState) => ({
    userProfile
})

const mapDispatch: any = ({ userProfile: { login } }) => ({
    login: ({ email, password }) => login({ email, password }),
})

export default connect(mapProps, mapDispatch)(Login)


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
        color: `rgb(221, 97, 97)`
    },
    infoContainer: {
        flex: 1,
        backgroundColor: 'rgb(234, 195, 176)',
        paddingHorizontal: 16,
        alignItems: `center`,
        justifyContent: `center`
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
        backgroundColor: '#EDEDED',
    }
});
