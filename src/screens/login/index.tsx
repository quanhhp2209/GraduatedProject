import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image source={require('../../../assets/kindergarten.png')}></Image>
                    <Text style={styles.title}>KidFuture</Text>
                    <Input
                        placeholder="Enter your username"
                        size='small'
                        style={styles.textInput}
                        status='primary'
                        value={this.state.email}
                        onChangeText={this.onEmailChange}
                    />

                    <Input placeholder="Enter your password"
                        size='small'
                        style={styles.textInput}
                        status='primary'
                        value={this.state.password}
                        icon={this.renderIcon}
                        secureTextEntry={this.state.secureTextEntry}
                        onIconPress={this.onIconPress}
                        onChangeText={this.onPasswordChange}
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={this.goToDashboard}>
                        <Text>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetButton}>
                        <Text style={styles.resetPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(234, 195, 176)',
        paddingHorizontal: 16,
        alignItems: `center`,
        justifyContent: `center`
    },
    title: {
        fontSize: 33,
        fontWeight: `bold`,
        color: `rgb(221, 97, 97)`
    },
    loginButton: {
        width: 325,
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
        paddingRight: 8,
        paddingTop: 4
    },
    resetPasswordText: {
        // color: '#fff'
    },
    textInput: {
        borderRadius: 6,
        marginVertical: 4
    }
});
