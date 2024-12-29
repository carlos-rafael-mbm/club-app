import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await getUsers();
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  return await addUser(user);
});

export const editUser = createAsyncThunk("users/editUser", async (user) => {
  return await updateUser(user);
});

export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
  await deleteUser(id);
  return id;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload.id);
      });
  },
});

export default userSlice.reducer;
