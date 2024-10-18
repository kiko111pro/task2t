import {configureStore} from '@reduxjs/toolkit';
import auth from '../features/auth/auth.reducer';
import {languageChange} from '../features/language/language.reducer';

const store = configureStore({
  reducer: {
    auth: auth,
    language: languageChange,
  },
});

export default store;
