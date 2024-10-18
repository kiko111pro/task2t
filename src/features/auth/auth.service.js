import axios from 'axios';
import {getData, post, storeData} from '../services.common';

const login = async postData => {
  const url = 'https://www.tatd.in/app-api/driver/login/driver-login.php';
  const data = await post(url, postData);

  return data;
};

const verifyOTP = async postData => {
  const data = await post(
    'https://www.tatd.in/app-api/driver/login/verify-otp-login.php',
    postData,
  );
  if (data.isSuccessful) {
    storeData('jwt', data.data.jwt);
    // storage.set(storageKeys.loginDetails, JSON.stringify(res.data));
  }
  return data;
};

const checkLogin = async () => {
  const data = await getData('jwt');
  const language = await getData('language');
  console.log(data);
  if (data) return {loggedIn: true, jwt: data};
  return {loggedIn: false};
};

export default authService = {login, verifyOTP, checkLogin};
