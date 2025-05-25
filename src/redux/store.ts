import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import profileReducer from "./slice/profile.slice";
import linkReducer from "./slice/link.slice";
const store = configureStore({
  reducer: {
    global: authReducer,
    profile: profileReducer,
    link: linkReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
