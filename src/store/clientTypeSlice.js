import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClientTypes } from "../services/clientTypeService";

export const fetchClientTypes = createAsyncThunk(
  "clients/fetchClientTypes",
  async () => {
    return await getClientTypes();
  }
);

const clientTypeSlice = createSlice({
  name: "clientType",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClientTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchClientTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default clientTypeSlice.reducer;
