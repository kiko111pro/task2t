/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AppShell from './navigation/AppShell';
import RootShell from './navigation/RootShell';
import store from './app/store';
import {checkLogin} from './features/auth/auth.reducer';

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const {loggedIn} = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(checkLogin());
  }, []);
  return (
    <NavigationContainer>
      {loggedIn ? <AppShell /> : <RootShell />}
    </NavigationContainer>
  );
};

export default AppWrapper;
