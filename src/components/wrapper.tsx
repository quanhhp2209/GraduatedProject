import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { LoadingOverlay } from '.';

export class Wrapper extends React.PureComponent<any> {
    render() {
        return (
            <Layout style={[styles.container, this.props.containerStyle]} level="4">
                <LoadingOverlay isVisible={this.props.isLoading} />

                <SafeAreaView style={[styles.content, this.props.contentStyle]}>
                    {this.props.children}
                </SafeAreaView>
            </Layout>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        flex: 1
    },
    content: {
        flex: 1
    }

})
