import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { HttpError } from 'exceptions/exceptions';
import { IRoomCreation } from '../../common/interfaces/interfaces';
import { actions } from './slice';
import { ActionType } from './common';
import { roomApi } from '../../services/services';

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
  async (id: string, { dispatch }) => {
    try {
      const room = await roomApi.getRoom(id);
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
