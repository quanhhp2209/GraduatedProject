import firebase from 'firebase';
import moment from 'moment';
import React from 'react';
import { DatePickerAndroid, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import { Input } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { showSuccess } from '../../core';
import { IRootState } from '../../store';
import { Wrapper, Album } from '../../components';

class AbsenceRequests extends React.Component<any, any> {

    static navigationOptions = {
        title: 'Album',
    };

    constructor(props) {
        super(props);
    }

    renderItem = ({ item }) => {
        return <View style={styles.activityContainer} key={item.id}>
            <Album album={item} />
        </View>
    }

    render() {
        return (
            <Wrapper isLoading={this.props.isFetchingAlbums}>
                <FlatList data={this.props.albums} renderItem={this.renderItem} style={styles.listContainer} keyExtractor={item => `kid-album-${item.id}`} />
            </Wrapper>
        );
    }
}

const mapProps = ({ activity }: IRootState) => ({
    albums: activity.albums,
    isFetchingAlbums: activity.isBusy
})

export default connect(mapProps)(AbsenceRequests)

const styles = StyleSheet.create({
    activityContainer: {
        marginTop: 16,
    },
    listContainer: {
        flex: 1
    }
})