import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import roleReducer from "./roleSlice";
import clientReducer from "./clientSlice";
import clientTypeReducer from "./clientTypeSlice";
import accessLogReducer from "./accessLogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    client: clientReducer,
    clientType: clientTypeReducer,
    accessLog: accessLogReducer,
  },
});

export default store;
