import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./configs/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export default store;
