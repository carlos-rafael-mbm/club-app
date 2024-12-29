import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") || null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  accessTokenExpiration: localStorage.getItem("accessTokenExpiration") || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      const {
        accessToken,
        refreshToken,
        username,
        role,
        accessTokenExpiration,
      } = action.payload;
      state.user = username;
      state.role = role;
      state.token = accessToken;
      state.refreshToken = refreshToken;
      state.accessTokenExpiration = accessTokenExpiration;

      localStorage.setItem("user", username);
      localStorage.setItem("role", role);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration);
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.token = null;
      state.refreshToken = null;
      state.accessTokenExpiration = null;

      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessTokenExpiration");
    },
    refreshAccessToken(state, action) {
      const { accessToken, accessTokenExpiration } = action.payload;
      state.token = accessToken;
      state.accessTokenExpiration = accessTokenExpiration;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration);
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
