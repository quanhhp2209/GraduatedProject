import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Dimensions,
    Platform
} from 'react-native';


var screen = Dimensions.get('window');
export default class EditModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal
                ref={"parentModel"}
                style={styles.editModal}
                position='center'
                backdrop={true}
                onClosed={() => {
                    alert("Updated parent profile sucessfully!")
                }}

            >
                <Text>Parent Profile</Text>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    editModal: {
        justifyContent: 'center',
        borderRadius: Platform.OS === 'android' ? 30 : 0,
        shadowRadius: 10,
        width: screen.width - 20,
        height: 300
    }
})