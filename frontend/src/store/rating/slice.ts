import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserWithRecord } from '../../common/interfaces/interfaces';
import { ReducerName } from '../../common/enums/enums';
import { ActionType } from './common';

type State = {
  users: IUserWithRecord[];
};

const initialState: State = {
  users: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.ROOM,
  initialState,
  reducers: {
    [ActionType.SET_USERS]: (state, action: PayloadAction<IUserWithRecord[]>) => {
      state.users = action.payload;
    },
  },
});

export { reducer, actions };
