import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default class MoreOptions extends React.Component<any> {

  static navigationOptions = {
    title: 'More Options',
  };


  constructor(props) {
    super(props);
  }

  gotoAbsenceRequests = () => {
    this.props.navigation.navigate('AbsenceRequests')
  }

  gotoTeacherContacts = () => {
    this.props.navigation.navigate('TeacherContacts')
  }

  gotoAlbums = () => {
    this.props.navigation.navigate('KidAlbum')
  }

  render() {
    return (
      <ImageBackground source={require('../../../assets/background2.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.moreButton} onPress={this.gotoAlbums}>
          <Text>Kid's Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton} onPress = {this.gotoAbsenceRequests}>
          <Text>Absence Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton} onPress = {this.gotoTeacherContacts}>
          <Text>Teacher Contacts</Text>
        </TouchableOpacity>
      </View >
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

  moreButton: {
    width: 200,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(221, 97, 97)',
    marginVertical: 4
  },
});
