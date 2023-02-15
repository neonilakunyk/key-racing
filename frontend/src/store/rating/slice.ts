import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums';
import { UserRatingInfo } from 'common/types';
import { ActionType } from './common';

type State = {
  users: UserRatingInfo[];
};

const initialState: State = {
  users: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.ROOM,
  initialState,
  reducers: {
    [ActionType.SET_USERS]: (
      state,
      action: PayloadAction<UserRatingInfo[]>,
    ) => {
      state.users = action.payload;
    },
  },
});

export { reducer, actions };
