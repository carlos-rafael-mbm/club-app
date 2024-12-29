import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClients, addClient } from "../services/clientService";

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    return await getClients();
  }
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (client) => {
    return await addClient(client);
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default clientSlice.reducer;
