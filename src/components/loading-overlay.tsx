import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface IProps {
    isVisible: boolean;
}

export class LoadingOverlay extends React.PureComponent<IProps> {
    render() {
        const { isVisible } = this.props
        if (!isVisible) return null
        return (
            <View style={styles.container}>
                <ActivityIndicator animating size="large" />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})
