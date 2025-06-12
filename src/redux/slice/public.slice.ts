import api from "@/lib/axios_utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "console";
import { boolean } from "yup";
export const getPublic = createAsyncThunk<any, string>(
  "public/get",
  async (username, { rejectWithValue }) => {
    try {
      const response = await api.get(`public/${username}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Terjadi kesalahan"
        );
      }
      return rejectWithValue("Terjadi kesalahan");
    }
  }
);

interface GetPublicState {
  loading: boolean;
  error: string | null;
  success: boolean;
  isFetched: boolean;
  data?: any;
}

const initialState: GetPublicState = {
  loading: false,
  error: null,
  success: false,
  isFetched: false,
};

export const getPublicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setPublic: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublic.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getPublic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isFetched = true;
        state.data = action.payload;
      })
      .addCase(getPublic.rejected, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isFetched = true;
        state.error = action.payload as string;
      });
  },
});

export default getPublicSlice.reducer;
