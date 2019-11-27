import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Settings extends React.Component<any> {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
    super(props);
  }
  gotoParentProfile = () => {
    this.props.navigation.navigate('ParentProfile');
  }

  gotoKidProfile = () => {
    this.props.navigation.navigate('KidProfile');
  }
  
  gotoLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <ImageBackground source={require('../../../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingButton} onPress={this.gotoParentProfile}>
          <Text>Parent Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={this.gotoKidProfile}>
          <Text>Kid Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={this.gotoLogin}>
          <Text>LOG OUT</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgb(234, 195, 176)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },

  settingButton: {
    width: 200,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(221, 97, 97)',
    marginVertical: 4
  },
});
