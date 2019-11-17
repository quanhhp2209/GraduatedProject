import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Icon, IconRegistry } from 'react-native-ui-kitten';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from './src/screens/dashboard';
import LoginScreen from './src/screens/login';
import SettingScreen from './src/screens/setting';
import NotificationScreen from './src/screens/notification';
import KidDetailScreen from './src/screens/infodetail';
import { mapping, light as lightTheme } from '@eva-design/eva';
import * as firebase from 'firebase';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider, connect } from 'react-redux'
import store from './src/store';
import 'firebase/firestore'
import { navigationService } from './src/services';

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

const DashboardIcon = (style) => (
  <Icon name='layout' fill='rgb(221, 97, 97)' />
);

const KidDetailsIcon = (style) => (
  <Icon name='person-outline' fill='rgb(221, 97, 97)' />
);

const NotificationsIcon = (style) => (
  <Icon name='bell-outline' fill='rgb(221, 97, 97)' />
);
const SettingsIcon = (style) => (
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
      <BottomNavigationTab icon={NotificationsIcon} />
      <BottomNavigationTab icon={SettingsIcon} />
    </BottomNavigation>
  );
}

const AuthStack = createStackNavigator({ Login: LoginScreen }, { headerMode: 'none' });
const AppStack = createBottomTabNavigator({
  Dashboard: DashboardScreen,
  KidDetail: KidDetailScreen,
  Notification: NotificationScreen,
  Setting: SettingScreen,
}, {
  initialRouteName: 'Dashboard',
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
        <AppContainer  ref={navigatorRef => {
          navigationService.setTopLevelNavigator(navigatorRef);
        }}/>
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: { backgroundColor: 'rgb(234, 195, 176)' },
  indicator: { backgroundColor: 'rgb(221, 97, 97)' },
})



