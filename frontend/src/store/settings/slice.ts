import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGameSettings, ISecuritySettings, ISettings } from '../../common/interfaces/interfaces';
import { ReducerName } from '../../common/enums/enums';
import { ActionType } from './common';

type State = {
  isUserVisibleInRating: boolean;
  secondsForGame: number;
  secondsBeforeGame: number;
  isCheckboxDisabled: boolean;
};

const initialState: State = {
  isUserVisibleInRating: true,
  secondsForGame: 0,
  secondsBeforeGame: 0,
  isCheckboxDisabled: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.ROOM,
  initialState,
  reducers: {
    [ActionType.SET_SETTINGS]: (state, action: PayloadAction<ISettings>) => {
      const { isUserVisibleInRating, secondsForGame, secondsBeforeGame } =
        action.payload;
      state.isUserVisibleInRating = isUserVisibleInRating;
      state.secondsForGame = secondsForGame;
      state.secondsBeforeGame = secondsBeforeGame;
    },
    [ActionType.UPDATE_GAME_SETTINGS]: (state, action: PayloadAction<IGameSettings>) => {
      const { secondsForGame, secondsBeforeGame } = action.payload;
      state.secondsForGame = secondsForGame;
      state.secondsBeforeGame = secondsBeforeGame;
    },
    [ActionType.UPDATE_SECURITY_SETTINGS]: (state, action: PayloadAction<ISecuritySettings>) => {
      const { isUserVisibleInRating } = action.payload;
      state.isUserVisibleInRating = isUserVisibleInRating;
    },
    [ActionType.TOGGLE_IS_CHECKBOX_DISABLED]: (state) => {
      state.isCheckboxDisabled = !state.isCheckboxDisabled;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export { reducer, actions };
