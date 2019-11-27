import React from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';


class AlbumDetail extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Album Detail',
    };

    renderImage = ({ item }) => {
        return <View style={styles.imageContainer}><Image source={{ uri: item }} style={styles.image} resizeMode="cover" /></View>
    }

    render() {
        const { album } = this.props
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: album.images[0] }} style={styles.banner} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{album.title}</Text>
                    <Text>{album.content}</Text>
                </View>
                <FlatList data={album.images} renderItem={this.renderImage} numColumns={3} scrollEnabled={false} />
            </ScrollView>
        );
    }
}

const mapProps = state => ({
    album: state.activity.selectedAlbum
})

export default connect(mapProps)(AlbumDetail)

const bannerWidth = Dimensions.get('window').width

const imageAlbumWidth = Dimensions.get('window').width / 3

const styles = StyleSheet.create({
    banner: {
        width: bannerWidth,
        height: bannerWidth * 9 / 16
    },
    infoContainer: {
        paddingVertical: 12,
        paddingHorizontal: 8
    },
    title: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
        paddingBottom: 8
    },
    image: {
        flex: 1
    },
    imageContainer: {
        padding: 2,
        height: imageAlbumWidth,
        width: imageAlbumWidth
    },
    container: {
        paddingBottom: 12
    }
})
