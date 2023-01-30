import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { HttpError } from 'exceptions/exceptions';
import { actions } from './slice';
import { ActionType } from './common';
import { userApi } from '../../services/services';

const loadUsers = createAsyncThunk(
  ActionType.SET_USERS,
  async (_: undefined, { dispatch }) => {
    try {
      const usersRating = await userApi.getUsersRating();
      dispatch(actions.setUsers(usersRating));
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  },
);

const ratingActions = {
  ...actions,
  loadUsers,
};

export { ratingActions };
