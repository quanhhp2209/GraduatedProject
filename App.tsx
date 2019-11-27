import { light as lightTheme, mapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Icon, IconRegistry } from 'react-native-ui-kitten';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import AlbumDetailSreen from './src/screens/albumDetail';
import DashboardScreen from './src/screens/dashboard';
import ForgotPasswordScreen from './src/screens/forgotPassword';
import KidDetailScreen from './src/screens/infodetail';
import LoginScreen from './src/screens/login';
import MoreOptionsScreen from './src/screens/moreOptions';
import AbsenceRequestsScreen from './src/screens/moreOptions/absenceRequests';
import TeacherContactsScreen from './src/screens/moreOptions/teacherContacts';
import KidProfileScreen from './src/screens/profile/kidInfo';
import ParentProfileScreen from './src/screens/profile/parentInfo';
import SettingScreen from './src/screens/setting';
import KidAlbumScreen from './src/screens/moreOptions/kidAlbum';
import { navigationService } from './src/services';
import store from './src/store';


const firebaseConfig = {
  apiKey: "AIzaSyAUX3OmOPYGHshAT3p8_yhbTUNjDLSpZEQ",
  authDomain: "graduatedproject-c9985.firebaseapp.com",
  databaseURL: "https://graduatedproject-c9985.firebaseio.com",
  projectId: "graduatedproject-c9985",
  storageBucket: "",
  messagingSenderId: "1040966912755",
  appId: "1:1040966912755:web:4a22f6be4bee35221c8586",
  measurementId: "G-HR8S7Z6WDQ"
}

firebase.initializeApp(firebaseConfig);


const DashboardIcon = () => (
  <Icon name='layout' fill='rgb(221, 97, 97)' />
);

const KidDetailsIcon = () => (
  <Icon name='person-outline' fill='rgb(221, 97, 97)' />
);

const MoresIcon = () => (
  <Icon name='grid-outline' fill='rgb(221, 97, 97)' />
);
const SettingsIcon = () => (
  <Icon name='settings' fill='rgb(221, 97, 97)' />
);

export const BottomNavigationShowcase = (props) => {

  const onTabSelect = (selectedIndex) => {
    const selectedRoute = props.navigation.state.routes[selectedIndex];
    props.navigation.navigate(selectedRoute.routeName);
    // console.log(props.navigation.state.routes)
  };
  return (
    <BottomNavigation
      style={styles.bottomNavigation}
      indicatorStyle={styles.indicator}
      selectedIndex={props.navigation.state.index}
      onSelect={onTabSelect}>
      <BottomNavigationTab icon={DashboardIcon} />
      <BottomNavigationTab icon={KidDetailsIcon} />
      <BottomNavigationTab icon={MoresIcon} />
      <BottomNavigationTab icon={SettingsIcon} />
    </BottomNavigation>
  );
}

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen
  }, { headerMode: 'none' });
const DashboardStack = createStackNavigator(
  {
    Dashboard: { screen: DashboardScreen },
    AlbumDetail: { screen: AlbumDetailSreen },
  });
const KidDetailStack = createStackNavigator({ KidDetail: KidDetailScreen });
const MoreOptionsStack = createStackNavigator({
  MoreOptions: MoreOptionsScreen,
  AbsenceRequests: AbsenceRequestsScreen,
  TeacherContacts: TeacherContactsScreen,
  KidAlbum: KidAlbumScreen,
  AlbumDetail: AlbumDetailSreen,
});
const SettingStack = createStackNavigator({
  Setting: SettingScreen,
  ParentProfile: ParentProfileScreen,
  KidProfile: KidProfileScreen,
});


const AppStack = createBottomTabNavigator({
  DashboardStack: DashboardStack,
  KidDetailStack: KidDetailStack,
  MoreOptionsStack: MoreOptionsStack,
  SettingStack: SettingStack,

}, {
  initialRouteName: 'DashboardStack',
  tabBarComponent: BottomNavigationShowcase,

});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
)

export default function App() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <AppContainer ref={navigatorRef => {
          navigationService.setTopLevelNavigator(navigatorRef);
        }} />
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: { backgroundColor: 'rgb(234, 195, 176)' },
  indicator: { backgroundColor: 'rgb(221, 97, 97)' },
})



