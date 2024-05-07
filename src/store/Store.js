import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/Auth";

const store = configureStore({
  reducer: {
    authReducer,
  },
});

export default store;
