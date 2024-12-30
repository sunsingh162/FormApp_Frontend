import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./configs/authSlice";
import modalReducer from "./configs/modalSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer
  },
});

export default store;
