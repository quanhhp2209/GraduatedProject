import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

class AlbumBase extends React.PureComponent<any, any> {

    constructor(props) {
        super(props)
    }

    onDetail = () => {
        // console.log('this.props.album', this.props.album)
        this.props.setSelectedAlbum(this.props.album)
        this.props.navigation.navigate('AlbumDetail')
    }

    render() {
        const { album } = this.props
        return (
            <TouchableOpacity style={styles.container} onPress={this.onDetail}>
                <View style={styles.titleContainer}>
                    <Text>Album <Text style={styles.title}>{album.title}</Text></Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text>{album.content}</Text>
                </View>
                <View style={styles.imageRow}>
                    <Image source={{ uri: album.images[0] }} style={styles.bigImage} resizeMode="cover" borderRadius={4} />
                    <Image source={{ uri: album.images[1] }} style={styles.bigImage} resizeMode="cover" borderRadius={4} />
                </View>
                <View style={styles.imageRow}>
                    <Image source={{ uri: album.images[2] }} style={styles.smallImage} resizeMode="cover" borderRadius={4} />
                    <Image source={{ uri: album.images[3] }} style={styles.smallImage} resizeMode="cover" borderRadius={4} />
                    <View style={styles.smallImage}>
                        <Image source={{ uri: album.images[4] }} style={styles.smallImage} resizeMode="cover" borderRadius={4} />
                        {album.images.length > 5 && <View style={styles.remainImagesContainer}>
                            <Text style={styles.remainImages}>+{album.images.length - 5}</Text>
                        </View>}
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
}

const mapDispatch: any = ({ activity: { setSelectedAlbum } }) => ({
    setSelectedAlbum: (album) => setSelectedAlbum(album),
})

export const Album = withNavigation(connect(null, mapDispatch)(AlbumBase))

const bigImageSideWidth = (Dimensions.get('window').width - 24 - 24 - 8) / 2
const smallImageSideWidth = (Dimensions.get('window').width - 24 - 24 - 12) / 3

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        backgroundColor: '#fff',
        padding: 12
    },
    titleContainer: {
        borderColor: '#e5e5e5',
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    contentContainer: {
        paddingTop: 8
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8
    },
    bigImage: {
        width: bigImageSideWidth,
        height: bigImageSideWidth
    },
    smallImage: {
        width: smallImageSideWidth,
        height: smallImageSideWidth
    },
    title: {
        fontWeight: '900'
    },
    remainImagesContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    remainImages: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500'
    }
})
