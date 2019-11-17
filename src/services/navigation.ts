import { NavigationActions } from 'react-navigation';

let navigator;

const setTopLevelNavigator = (navigatorRef: any) => {
  navigator = navigatorRef;
}

const navigate = (routeName: string, params?: any) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

// add other navigation functions that you need and export them

export const navigationService = {
  navigate,
  setTopLevelNavigator,
};