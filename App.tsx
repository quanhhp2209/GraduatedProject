import React from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from './src/screens/dashboard';
import LoginScreen from './src/screens/login';
import { mapping, light as lightTheme } from '@eva-design/eva';
import * as firebase from 'firebase';


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

const AuthStack = createStackNavigator({ Login: LoginScreen }, {headerMode: 'none'});
const AppStack = createStackNavigator({ Dashboard: DashboardScreen });

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
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <AppContainer />
    </ApplicationProvider>

  );
}



