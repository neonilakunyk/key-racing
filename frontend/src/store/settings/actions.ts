import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { HttpError } from 'common/exceptions';
import { ToastMessage } from 'common/enums';
import { IGameSettings, ISecuritySettings } from 'common/interfaces';
import { settingsApi } from 'services';
import { actions } from './slice';
import { ActionType } from './common';

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
