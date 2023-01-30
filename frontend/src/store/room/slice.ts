import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRoom } from '../../common/interfaces/interfaces';
import { ReducerName } from '../../common/enums/enums';
import { ActionType } from './common';

type State = {
  rooms: IRoom[];
  currentRoom: IRoom | null;
  isUpdatingCurrentRoom: boolean;
  isDeletingCurrentRoomLogo: boolean;
  shareRoomId: string;
  isLoading: boolean;
};

const initialState: State = {
  rooms: [],
  currentRoom: null,
  isUpdatingCurrentRoom: false,
  isDeletingCurrentRoomLogo: false,
  shareRoomId: '',
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.ROOM,
  initialState,
  reducers: {
    [ActionType.SET_ROOMS]: (state, action: PayloadAction<IRoom[]>) => {
      state.rooms = action.payload;
    },
    [ActionType.ADD_ROOM]: (state, action: PayloadAction<IRoom>) => {
      state.rooms = [...state.rooms, action.payload];
    },
    [ActionType.SET_SHARE_ROOM_ID]: (state, action: PayloadAction<string>) => {
      state.shareRoomId = action.payload;
    },
    [ActionType.TOGGLE_IS_LOADING]: (state) => {
      state.isLoading = !state.isLoading;
    },
    [ActionType.REMOVE_ROOM]: (state, action: PayloadAction<string>) => {
      state.rooms = state.rooms?.filter((room) => room.id !== action.payload);
    },
    [ActionType.SET_CURRENT_ROOM]: (state, action: PayloadAction<IRoom>) => {
      state.currentRoom = action.payload;
    },
    [ActionType.REMOVE_CURRENT_ROOM]: (state) => {
      state.currentRoom = null;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export { reducer, actions };
