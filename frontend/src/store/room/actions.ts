import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { HttpError } from 'common/exceptions';
import { IRoomCreation } from 'common/interfaces';
import { roomApi } from 'services';
import { actions } from './slice';
import { ActionType } from './common';

const loadRooms = createAsyncThunk(
  ActionType.SET_ROOMS,
  async (_: undefined, { dispatch }) => {
    try {
      dispatch(actions.toggleIsLoading());
      const rooms = await roomApi.getRooms();
      dispatch(actions.setRooms(rooms));
      dispatch(actions.toggleIsLoading());
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const createRoom = createAsyncThunk(
  ActionType.SET_SHARE_ROOM_ID,
  async (payload: IRoomCreation, { dispatch }) => {
    try {
      const room = await roomApi.create(payload);
      dispatch(actions.setShareRoomId(room.id));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const loadRoom = createAsyncThunk(
  ActionType.SET_CURRENT_ROOM,
  async (roomId: number, { dispatch }) => {
    try {
      const room = await roomApi.getRoom(roomId);
      dispatch(actions.setCurrentRoom(room));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const roomActions = {
  ...actions,
  loadRooms,
  loadRoom,
  createRoom,
};

export { roomActions };
