import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth.slice'

const store = configureStore({
    reducer: {
        global: authReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;