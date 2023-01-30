import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { HttpError } from 'exceptions/exceptions';
import { ToastMessage } from 'common/enums/enums';
import {
  IGameSettings,
  ISecuritySettings,
} from '../../common/interfaces/interfaces';
import { actions } from './slice';
import { ActionType } from './common';
import { settingsApi } from '../../services/services';

const loadSettings = createAsyncThunk(
  ActionType.SET_SETTINGS,
  async (_: undefined, { dispatch }) => {
    try {
      const settings = await settingsApi.getSettings();
      dispatch(actions.setSettings(settings));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const setGameSettings = createAsyncThunk(
  ActionType.SET_SETTINGS,
  async (payload: IGameSettings, { dispatch }) => {
    try {
      const gameSettings = await settingsApi.setGameSettings(payload);
      toast.success(ToastMessage.SETTINGS_UPDATED);
      dispatch(actions.updateGameSettings(gameSettings));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const setSecuritySettings = createAsyncThunk(
  ActionType.SET_SETTINGS,
  async (payload: ISecuritySettings, { dispatch }) => {
    try {
      dispatch(actions.toggleIsCheckboxDisabled());
      const securitySettings = await settingsApi.setSecuritySettings(payload);
      toast.success(ToastMessage.SETTINGS_UPDATED);
      dispatch(actions.updateSecuritySettings(securitySettings));
      dispatch(actions.toggleIsCheckboxDisabled());
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const settingsActions = {
  ...actions,
  loadSettings,
  setGameSettings,
  setSecuritySettings,
};

export { settingsActions };
