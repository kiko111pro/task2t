import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../features/auth/auth.reducer';
import authService from '../../features/auth/auth.service';
import {post} from '../../features/services.common';
import {errorToast, successToast} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [number, setNumber] = useState('8118813148');

  const handleSubmit = async () => {
    if (isNaN(number)) {
      errorToast('Enter number only');
      return;
    }
    const data = await authService.login({mobile: number});
    if (data.isSuccessful) {
      successToast('OTP:' + data.data.otp);
      navigation.navigate('otp', {number});
    } else {
      errorToast('Error');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 250,
          borderWidth: 1,
          backgroundColor: '#0000FF',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 30,
        }}>
        <Text style={styles.textTitle}>Driver Login</Text>
      </View>

      <TextInput
        style={styles.textInput}
        value={number}
        onChangeText={setNumber}
        placeholder="Enter number"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#0000ff',
          width: 200,
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          alignSelf: 'center',
        }}>
        <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textTitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 80,
  },
  textInput: {
    color: '#000',
    borderWidth: 1,

    borderColor: '#777',
    marginTop: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 40,
    margin: 16,
  },
});
