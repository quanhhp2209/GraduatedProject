import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Icon, IconRegistry } from 'react-native-ui-kitten';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from './src/screens/dashboard';
import LoginScreen from './src/screens/login';
import ForgotPasswordScreen from './src/screens/forgotPassword';
import SettingScreen from './src/screens/setting';
import MoreOptionsScreen from './src/screens/moreOptions';
import KidDetailScreen from './src/screens/infodetail';
import ParentProfileScreen from './src/screens/profile/parentInfo';
import KidProfileScreen from './src/screens/profile/kidInfo';
import { mapping, light as lightTheme } from '@eva-design/eva';
import * as firebase from 'firebase';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider, connect } from 'react-redux'
import store from './src/store';
import 'firebase/firestore'
import { navigationService } from './src/services';
import AlbumDetailSreen from './src/screens/albumDetail';


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



const AuthStack = createStackNavigator({ Login: LoginScreen, ForgotPassword: ForgotPasswordScreen }, { headerMode: 'none' });
const DashboardStack = createStackNavigator(
  {
    Dashboard: { screen: DashboardScreen },
    AlbumDetail: { screen: AlbumDetailSreen },
  });
const KidDetailStack = createStackNavigator({ KidDetail: KidDetailScreen });
const MoreOptionsStack = createStackNavigator({ MoreOptions: MoreOptionsScreen });
const SettingStack = createStackNavigator({ Setting: SettingScreen });

const AppStack = createBottomTabNavigator({
  DashboardStack: DashboardStack,
  KidDetailStack: KidDetailStack,
  MoreOptionsStack: MoreOptionsStack,
  SettingStack: SettingStack,
  ParentProfile: ParentProfileScreen,
  KidProfile: KidProfileScreen
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



