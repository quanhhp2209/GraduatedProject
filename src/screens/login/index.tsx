import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Input, Button, Icon } from 'react-native-ui-kitten';


export default class Login extends React.Component<any> {
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

    goToDashboard = () => {
        this.props.navigation.navigate('Dashboard')
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.infoContainer}>
                        <Image source={require('../../../assets/kindergarten.png')}></Image>
                        <Text style={styles.title}>KidFuture</Text>
                        <Input
                            placeholder="Enter your username"
                            placeholderTextColor='rgba(255, 255, 255, 0.8)'
                            size='small'
                            style={styles.textInput}
                            status='danger'
                            keyboardType='email-address'
                            returnKeyType='done'
                            value={this.state.email}
                            onChangeText={this.onEmailChange}
                        />
                        <Input
                            placeholder="Enter your password"
                            placeholderTextColor='rgba(255, 255, 255, 0.8)'
                            size='small'
                            style={styles.textInput}
                            status='danger'
                            value={this.state.password}
                            icon={this.renderIcon}
                            secureTextEntry={this.state.secureTextEntry}
                            onIconPress={this.onIconPress}
                            onChangeText={this.onPasswordChange}
                        />
                        <TouchableOpacity style={styles.resetButton}> 
                            <Text style={styles.resetPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={this.goToDashboard}>
                            <Text>LOG IN</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(234, 195, 176)',
        flexDirection: 'column'
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
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }
});
