import axios from 'axios';
import {getAuthHeaders, post, storeData} from '../services.common';

const language = async postData => {
  const url =
    'https://www.tatd.in/app-api/driver/trusted-driver/switch-language-api.php';
  const authHeaders = await getAuthHeaders();
  const data = await post(url, postData, authHeaders);
  if (data.isSuccessful) storeData('language', data.data.current_language);
  return data;
};

export const languageService = {language};
