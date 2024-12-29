import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRoles } from "../services/roleService";

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  return await getRoles();
});

const roleSlice = createSlice({
  name: "role",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default roleSlice.reducer;
