import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import profileReducer from "./slice/profile.slice";
import linkReducer from "./slice/link.slice";
import themeReducer from "./slice/theme.slice";
import publicReducer from "./slice/public.slice";
const store = configureStore({
  reducer: {
    global: authReducer,
    profile: profileReducer,
    link: linkReducer,
    theme: themeReducer,
    public: publicReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
