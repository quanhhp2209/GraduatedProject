import React from 'react';
import { DatePickerAndroid, StyleSheet, Text, View, Button, TouchableOpacity, Image, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import Constants from 'expo-constants';



const teacher = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Ms. Nguyen Thu Thao',
        email: 'thao@gmail.com',

    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Ms. Tran Bao Ngoc',
        email: 'ngoc@gmail.com',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Ms. Pham Huong Chi',
        email: 'chi@gmail.com',
    },
]
function Item({ title, email, }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.email}>{email}</Text>
        </View>
    );
}
export default class TeacherContacts extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Teacher Contacts',
      };

    render() {
        return (
            <ImageBackground source={require('../../../assets/background4.jpg')} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={teacher}
                    renderItem={({ item }) => <Item title={item.title} email={item.email} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 6
    },
    title: {
        fontSize: 20,
    },

    email: {
        fontSize: 15,
    }
})