import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "console";


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async(userData: { username: string; email: string; password: string },{rejectWithValue})=>{
        try{
            const response = await axios.post('http://localhost:8080/api/register', userData);
            return response.data;
        }catch(error){
           if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.error || 'Terjadi kesalahan');
      }
      return rejectWithValue('Unknown error');
    }
    }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async(userData: {email : string;password: string},{rejectWithValue})=>{
    try{
      const response = await axios.post('http://localhost:8080/api/login', userData);
      return response.data;
    }catch(error){
      if (axios.isAxiosError(error)){
        return rejectWithValue(error.response?.data.error || 'Terjadi kesalahan');
      }
      return rejectWithValue('Unknown error');
  }
}
);
interface AuthState{
    authLogin:{
        token: string;
    };
    loading: boolean;
    error: string | null;
    success: boolean;
}
const initialState: AuthState = {
    authLogin: {
        token: ''
    },
    loading : false,
    error: null,
    success: false,
}

export const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.authLogin.token = action.payload
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Misalnya response ada token
        state.authLogin.token = action.payload.token || '';
      })
    .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
         state.error = typeof action.payload === 'string' ? action.payload : null;
        state.success = false;
    })
    .addCase(loginUser.pending,(state)=>{
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading = false;
      state.success = true;
      // Misalnya response ada token
      state.authLogin.token = action.payload.token || '';
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading = false;
      state.error = typeof action.payload === 'string' ? action.payload : null;
      state.success = false;
    })
  }
})

export default authSlice.reducer
export const { setToken } = authSlice.actions

