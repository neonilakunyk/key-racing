import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { HttpError } from 'exceptions/exceptions';
import { IUser } from 'common/interfaces/interfaces';
import { DispatchFunction } from 'common/types/types';
import { gameApi, jokeApi } from 'services/services';
import { userToParticipant } from 'helpers/helpers';
import { actions } from './slice';
import { ActionType } from './common';

const loadText = createAsyncThunk(
  ActionType.SET_TEXT,
  async (roomId: string, { dispatch }) => {
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
  async (roomId: string, { dispatch }) => {
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
      const { joke } = await jokeApi.getJoke();
      dispatch(actions.setCommentatorText(joke));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const addParticipant = (user: Omit<IUser, 'email'>): DispatchFunction => {
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
