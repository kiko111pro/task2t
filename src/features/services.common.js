import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../app/store';
import {errorToast} from '../utils/helpers';

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('Error in reading data from async storage');
  }
};

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error in storing data to async storage');
  }
};

export const getAuthHeaders = () => ({
  Authorization: 'Bearer ' + getData('jwt'),
});
const success = resp => ({
  isSuccessful: true,
  data: resp.data,
  status: resp.status,
});

const Error = resp => {
  const status = resp.response?.status;

  if (status === 403 || status === 401) {
    errorToast('Expired');
    store.dispatch(logout());
  }

  return {
    data: (resp.response?.data).message || 'Unknown Error',
    status,
    isSuccessful: false,
  };
};

export const get = async (url, params, headers) => {
  try {
    const response = await axios.get(url, {params, headers});
    return success(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return Error(error);
    else
      return {
        isSuccessful: false,
        data: 'Unexpected Error!',
        status: 0,
      };
  }
};

export const post = async (url, data, headers, params) => {
  try {
    const response = await axios.post(url, data, {params, headers});
    console.log(response);
    return success(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return Error(error);
    else
      return {
        isSuccessful: false,
        data: 'Unexpected Error!',
        status: 0,
      };
  }
};
