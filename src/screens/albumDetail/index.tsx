import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ImageView from 'react-native-image-view';
import { connect } from 'react-redux';

class AlbumDetail extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Album Detail',
    };

    constructor(props) {
        super(props);
        this.state = {
            isVisibleShowImage: false,
            imageIndex: 0
        }
    }

    onShowImage = (imageIndex) => () => {
        this.setState({ isVisibleShowImage: true, imageIndex })
    }

    onCloseShowImage = () => {
        this.setState({ isVisibleShowImage: false, imageIndex: 0 })
    }

    renderImage = ({ item, index }) => {
        return <TouchableWithoutFeedback onPress={this.onShowImage(index)}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
            </View>
        </TouchableWithoutFeedback>
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
                <FlatList data={album.images} renderItem={this.renderImage} numColumns={3} scrollEnabled={false} keyExtractor={(item, index) => `${index}-${item}`} />

                <ImageView
                    images={album.images.map((i, index) => ({ source: { uri: i }, index }))}
                    imageIndex={this.state.imageIndex}
                    isSwipeCloseEnabled={false}
                    isPinchZoomEnabled={false}
                    isVisible={this.state.isVisibleShowImage}
                    animationType='fade'
                    onClose={this.onCloseShowImage}
                    renderFooter={(currentImage) => (
                        <View style={styles.footerImage}>
                            <Text style={styles.footerImageText}>{`${currentImage.index + 1}/${album.images.length}`}</Text>
                        </View>)}
                />
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
    },
    footerImageText: {
        color: '#fff'
    },
    footerImage: {
        paddingVertical: 24,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
