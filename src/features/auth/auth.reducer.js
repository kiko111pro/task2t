import {createAsyncThunk, createSlice, isFulfilled} from '@reduxjs/toolkit';
import authService from '../auth/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  loggedIn: null,
  userData: null,
  loading: false,
  isError: false,
  errorMsg: null,
  language: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    const data = await authService.login(payload);
    if (data.isSuccessful) return data.data;

    return thunkAPI.rejectWithValue(data.data);
  },
);

export const verifyOTP = createAsyncThunk(
  'auth/otp',
  async (payload, thunkAPI) => {
    const data = await authService.verifyOTP(payload);

    console.log('Data in reducer', data);

    if (data.isSuccessful) return data.data;
  },
);
export const checkLogin = createAsyncThunk(
  'auth/checkLogin',
  async (_, thunkAPI) => {
    console.log('I ran');
    const resp = await authService.checkLogin();
    console.log({resp});
    return resp;
  },
);

export const logout = createAsyncThunk('logout', async () => {
  AsyncStorage.clear();
  return {
    loggedIn: false,
  };
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(verifyOTP.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
        state.errorMsg = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isError = true;
        state.errorMsg = action.payload;
      })

      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loggedIn = true;
        state.jwt = action.payload.jwt;

        console.log('JWT TOKEN:::', action.payload.jwt);
      });

    builder.addCase(checkLogin.fulfilled, (state, action) => {
      state.jwt = action.payload.jwt;
      state.loggedIn = action.payload.loggedIn;
    });

    builder.addCase(logout.fulfilled, state => {
      state.loggedIn = false;
    });
  },
});

export default authSlice.reducer;
