import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import OTP from '../screens/OTP';

const RootShell = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen name="otp" component={OTP} options={{title: 'OTP'}} />
    </Stack.Navigator>
  );
};

export default RootShell;

const styles = StyleSheet.create({});
