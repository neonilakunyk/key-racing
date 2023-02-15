import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IParticipant } from 'common/interfaces';
import { ReducerName } from 'common/enums';
import {
  DEFAULT_PARTICIPANT,
  DEFAULT_SECONDS_BEFORE_GAME,
  DEFAULT_SECONDS_FOR_GAME,
} from 'common/constants';
import { ActionType } from './common';

type State = {
  text: string;
  participants: IParticipant[];
  isGameStarted: boolean;
  commentatorText: string;
  secondsBeforeGame: number;
  secondsForGame: number;
};

const initialState: State = {
  text: '',
  participants: [],
  isGameStarted: false,
  commentatorText: '',
  secondsBeforeGame: DEFAULT_SECONDS_BEFORE_GAME,
  secondsForGame: DEFAULT_SECONDS_FOR_GAME,
};

const { reducer, actions } = createSlice({
  name: ReducerName.ROOM,
  initialState,
  reducers: {
    [ActionType.SET_TEXT]: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    [ActionType.SET_COMMENTATOR_TEXT]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.commentatorText = action.payload;
    },
    [ActionType.SET_SECONDS_BEFORE_GAME]: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.secondsBeforeGame = action.payload;
    },
    [ActionType.SET_SECONDS_FOR_GAME]: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.secondsForGame = action.payload;
    },
    [ActionType.DECREASE_SECONDS_BEFORE_GAME]: (state) => {
      state.secondsBeforeGame -= 1;
    },
    [ActionType.DECREASE_SECONDS_FOR_GAME]: (state) => {
      state.secondsForGame -= 1;
    },
    [ActionType.SET_PARTICIPANTS]: (
      state,
      action: PayloadAction<IParticipant[]>,
    ) => {
      state.participants = action.payload;
    },
    [ActionType.TOGGLE_GAME_STARTED]: (state) => {
      state.isGameStarted = !state.isGameStarted;
    },
    [ActionType.ADD_PARTICIPANT]: (
      state,
      action: PayloadAction<IParticipant>,
    ) => {
      state.participants = [...state.participants, action.payload];
    },
    [ActionType.REMOVE_PARTICIPANT]: (state, action: PayloadAction<number>) => {
      state.participants = state.participants.filter(
        (participant) => participant.id !== action.payload,
      );
    },
    [ActionType.TOGGLE_IS_READY]: (state, action: PayloadAction<number>) => {
      state.participants = state.participants.map((participant) =>
        participant.id === action.payload
          ? { ...participant, isReady: !participant.isReady }
          : participant,
      );
    },
    [ActionType.SET_SPENT_SECONDS]: (
      state,
      action: PayloadAction<Pick<IParticipant, 'id' | 'spentSeconds'>>,
    ) => {
      state.participants = state.participants.map((participant) =>
        participant.id === action.payload.id
          ? { ...participant, spentSeconds: action.payload.spentSeconds }
          : participant,
      );
    },
    [ActionType.INCREASE_POSITION]: (state, action: PayloadAction<number>) => {
      state.participants = state.participants.map((participant) =>
        participant.id === action.payload
          ? { ...participant, position: ++participant.position }
          : participant,
      );
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
    [ActionType.PARTIAL_RESET]: (state) => {
      const newParticipants = state.participants.map(
        ({ id, fullName, photoUrl }) => ({
          id,
          fullName,
          photoUrl,
          ...DEFAULT_PARTICIPANT,
        }),
      );
      const newState = { ...initialState, participants: newParticipants };
      Object.assign(state, newState);
    },
  },
});

export { reducer, actions };
