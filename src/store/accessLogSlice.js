import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAccessLogs,
  registerEntry,
  registerExit,
} from "../services/accessLogService";

export const fetchAccessLogs = createAsyncThunk(
  "accessLogs/fetchAccessLogs",
  async (filters) => {
    return await getAccessLogs(filters);
  }
);

export const addEntry = createAsyncThunk(
  "accessLogs/registerEntry",
  async (log) => {
    return await registerEntry(log);
  }
);

export const addExit = createAsyncThunk(
  "accessLogs/registerExit",
  async (log) => {
    return await registerExit(log);
  }
);

const accessLogSlice = createSlice({
  name: "accessLog",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessLogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccessLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAccessLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addExit.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (log) => log.id === action.payload.id
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(addExit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default accessLogSlice.reducer;
