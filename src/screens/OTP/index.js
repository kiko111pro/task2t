import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login, verifyOTP} from '../../features/auth/auth.reducer';
import authService from '../../features/auth/auth.service';
import {post} from '../../features/services.common';
import {errorToast, successToast} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';

const OTP = ({route, navigation}) => {
  const {number} = route.params;
  const dispatch = useDispatch();

  const [otp, setOTP] = useState();
  const handleSubmit = () => {
    dispatch(verifyOTP({mobile: number, otp}));
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
        <Text style={styles.textTitle}>Submit OTP</Text>
      </View>

      <View style={{margin: 26}}>
        <Text>OTP sent to {number}</Text>

        <TextInput
          style={styles.textInput}
          value={otp}
          onChangeText={setOTP}
          placeholder="Enter OTP"
        />
      </View>

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

export default OTP;

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
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 40,
    // margin: 16,
  },
});
