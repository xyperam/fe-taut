import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import profileReducer from "./slice/profile.slice";
const store = configureStore({
  reducer: {
    global: authReducer,
    profile: profileReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
