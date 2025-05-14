import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    initialState: {
        authLogin: {
            token: ''
        },

        // global state lain
    },
    name: 'auth',
    reducers: {
        setToken: (state, action) => {
            state.authLogin.token = action.payload
        }

        // setState lain
    }
})

export default authSlice.reducer
export const { setToken } = authSlice.actions