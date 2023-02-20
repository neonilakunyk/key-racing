import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { authApi, userApi } from 'services';
import { ILogin, IRegister } from 'common/interfaces';
import { LocalStorageVariable } from 'common/enums';
import { HttpError } from 'common/exceptions';
import {
  deleteTokensLocalStorage,
  setTokensLocalStorage,
} from 'common/helpers';
import { actions } from './slice';
import { ActionType } from './common';

const login = createAsyncThunk(
  ActionType.SET_USER,
  async (loginPayload: ILogin, { dispatch }): Promise<void> => {
    try {
      const userInfo = await authApi.loginUser(loginPayload);
      const { accessToken, refreshToken, ...user } = userInfo;
      setTokensLocalStorage({ accessToken, refreshToken });
      dispatch(actions.setUser(user));
    } catch (err) {
      const httpError = err as HttpError;
      dispatch(actions.setGeneralError(httpError.message));
    }
  },
);

const register = createAsyncThunk(
  ActionType.SET_USER,
  async (registerPayload: IRegister, { dispatch }): Promise<void> => {
    try {
      const userInfo = await authApi.registerUser(registerPayload);
      const { accessToken, refreshToken, ...user } = userInfo;
      setTokensLocalStorage({ accessToken, refreshToken });
      dispatch(actions.setUser(user));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const logout = createAsyncThunk(
  ActionType.REMOVE_USER,
  async (_: undefined, { dispatch }): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem(
        LocalStorageVariable.REFRESH_TOKEN,
      );
      deleteTokensLocalStorage();
      dispatch(actions.removeUser());
      if (refreshToken) await authApi.logout({ refreshToken });
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const loginGoogle = createAsyncThunk(
  ActionType.SET_USER,
  async (code: string, { dispatch }): Promise<void> => {
    try {
      const userInfo = await authApi.loginGoogle(code);
      const { accessToken, refreshToken, ...user } = userInfo;
      setTokensLocalStorage({ accessToken, refreshToken });
      dispatch(actions.setUser(user));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const loadUser = createAsyncThunk(
  ActionType.SET_USER,
  async (_: undefined, { dispatch }): Promise<void> => {
    try {
      const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
      if (token) {
        const user = await userApi.getCurrentUserInfo();
        dispatch(actions.setUser(user));
      }
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const authActions = {
  ...actions,
  login,
  register,
  logout,
  loginGoogle,
  loadUser,
};

export { authActions };
