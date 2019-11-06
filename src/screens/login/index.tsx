import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-ui-kitten';


export default class Login extends React.Component {
    state = {
        inputValue: '',
    };

    onInputValueChange = (inputValue) => {
        this.setState({ inputValue });
    };
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image source={require('../../../assets/kindergarten.png')}></Image>
                    <Text style={styles.title}>KidFuture</Text>
                    <Input placeholder="Enter your username"
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        value={this.state.inputValue}
                        onChangeText={this.onInputValueChange}
                    />

                    <Input placeholder="Enter your password"
                        size='small'
                        style={styles.textInput}
                        status='danger'
                        value={this.state.inputValue}
                        onChangeText={this.onInputValueChange}
                    />

                    <TouchableOpacity style={styles.loginButton}>
                        <Text>LOGIN</Text>
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
    textInput: {
        borderRadius: 6,
        marginVertical: 4
    }
});
