import Toast from 'react-native-toast-message';

export const successToast = msg => {
  Toast.show({
    type: 'success',
    text1: msg,
    // text2: msg,
  });
};

export const errorToast = msg => {
  Toast.show({
    type: 'error',
    text1: msg,
    // text2: msg,
  });
};
