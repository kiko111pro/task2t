import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {languageService} from './language.service';
import {errorToast} from '../../utils/helpers';

const initialState = {
  currentLanguage: null,
};

export const languageChange = createAsyncThunk(
  'language/change',
  async (payload, thunkAPI) => {
    const data = await languageService.language(payload);

    console.log({data});

    if (data.isSuccessful) return data.data;

    errorToast(data);
    return thunkAPI.rejectWithValue(data.data);
  },
);

const languageSlice = createSlice({
  name: 'laanguage',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export default languageSlice.reducer;

export const {setLanguage} = languageSlice.actions;
