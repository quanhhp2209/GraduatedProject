import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Avatar, Layout, Icon, Menu } from 'react-native-ui-kitten'

export default class MoreOptions extends React.Component<any> {

  static navigationOptions = {
    title: 'More Options',
  };


  constructor(props) {
    super(props);
  }
//   gotoParentProfile = () => {
//     this.props.navigation.navigate('ParentProfile');
//   }

//   gotoKidProfile = () => {
//     this.props.navigation.navigate('KidProfile');
//   }
  
//   gotoLogin = () => {
//     this.props.navigation.navigate('Login');
//   }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.moreButton}>
          <Text>Kid's Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Text>Absence Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Text>Teacher Contact</Text>
        </TouchableOpacity>
      </View>
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
    width: 329,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(221, 97, 97)',
    marginVertical: 4
  },
});
