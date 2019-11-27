import Constants from 'expo-constants';
import React from 'react';
import { FlatList, ImageBackground, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { IRootState } from '../../store';

function Item({ item }: any) {
    const onCall = () => {
        Linking.openURL(`tel:${item.phone}`)
    }
    return (
        <View style={styles.item}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.email}>{item.phone}</Text>
            </View>
            <TouchableOpacity onPress={onCall} style={styles.phoneContainer}>
                <Icon name="phone-call-outline" width={32} height={32} fill='rgb(221, 97, 97)' />
            </TouchableOpacity>
        </View>
    );
}

class TeacherContacts extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Teacher Contacts',
    };

    componentDidMount() {
        this.props.getTeacherContacts()
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/background4.jpg')} style={{ width: '100%', height: '100%' }}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.props.teacher.all}
                        renderItem={({ item }) => <Item item={item} />}
                    />
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const mapProps = ({ teacher }: IRootState) => ({
    teacher
})

const mapDispatch: any = ({ teacher: { getTeacherContacts } }) => ({
    getTeacherContacts: () => getTeacherContacts(),
})

export default connect(mapProps, mapDispatch)(TeacherContacts)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: 'rgb(234, 195, 176)',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 6,
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
    },

    email: {
        fontSize: 15,
    },

    titleContainer: {
        flex: 1
    },
    phoneContainer: {
        alignItems: 'center'
    }
})