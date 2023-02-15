import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { HttpError } from 'common/exceptions';
import { IUser } from 'common/interfaces';
import { DispatchFunction } from 'common/types';
import { gameApi } from 'services';
import { userToParticipant } from 'common/helpers';
import { actions } from './slice';
import { ActionType } from './common';

const loadText = createAsyncThunk(
  ActionType.SET_TEXT,
  async (roomId: number, { dispatch }) => {
    try {
      const { text } = await gameApi.getText(roomId);
      dispatch(actions.setText(text));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const loadParticipants = createAsyncThunk(
  ActionType.SET_PARTICIPANTS,
  async (roomId: number, { dispatch }) => {
    try {
      const users = await gameApi.getParticipants(roomId);
      dispatch(actions.setParticipants(users.map(userToParticipant)));
    } catch (error) {
      const httpError = error as HttpError;
      toast.error(httpError.message);
    }
  },
);

const loadCommentatorJoke = createAsyncThunk(
  ActionType.SET_TEXT,
  async (_, { dispatch }) => {
    try {
      const { joke } = await gameApi.getJoke();
      dispatch(actions.setCommentatorText(joke));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const addParticipant = (user: IUser): DispatchFunction => {
  return (dispatch: Dispatch): void => {
    dispatch(actions.addParticipant(userToParticipant(user)));
  };
};

const gameActions = {
  ...actions,
  loadText,
  loadCommentatorJoke,
  loadParticipants,
  addParticipant,
};

export { gameActions };
