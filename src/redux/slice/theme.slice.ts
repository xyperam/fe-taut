import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import api from "@/lib/axios_utils";

export const getTheme = createAsyncThunk(
  "profile/getTheme",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("user-theme");
      const data = response.data;
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Terjadi Kesalahan"
        );
      }
      return rejectWithValue("Unknown Error");
    }
  }
);

interface Theme {
  id: number;
  user_id: number;
  name: string;
  background: string;
  textColor: string;
  buttonColor: string;
  buttonBorderColor?: string;
  buttonShape?: "pill" | "rounded" | "square";
  fontFamily?: string;
  useBackgroundImage?: string;
  backgroundImageUrl?: string;
}

interface ThemeState {
  theme: Theme | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  isFetched: boolean;
}

const initialState: ThemeState = {
  theme: null,
  loading: false,
  error: null,
  success: false,
  isFetched: false,
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.theme = action.payload;
        state.success = true;
        state.isFetched = true;
      })
      .addCase(getTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "gagal mengambil data tema";
        state.success = false;
      });
  },
});

export default themeSlice.reducer;
