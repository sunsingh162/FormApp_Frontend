import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./configuration/authSlice";
import modalReducer from "./pages/modalSlice";
import themeReducer from "./configuration/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    theme: themeReducer
  },
});

export default store;
