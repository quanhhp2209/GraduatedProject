import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function Notification() {
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(234, 195, 176)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
