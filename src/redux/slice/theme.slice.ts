import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

export const updateUserTheme = createAsyncThunk(
  "profile/updateUserTheme",
  async (payload: Partial<Theme>, { rejectWithValue }) => {
    try {
      const response = await api.patch("user-theme", payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Terhadi kesalahan"
        );
      }
      return rejectWithValue("Unknown Error");
    }
  }
);
export interface Theme {
  id: number;
  user_id: number;
  name: string;
  avatarBorder: string;
  backgroundType: "flat" | "gradient";
  background: string;
  textColor: string;
  buttonColor: string;
  buttonBorderColor?: string;
  buttonShape?: string;
  fontFamily?: string;
  useBackgroundImage?: boolean;
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
    setTheme: (state, action: PayloadAction<Theme>) => {
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
        state.theme = action.payload.theme;
        state.success = true;
        state.isFetched = true;
      })
      .addCase(getTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "gagal mengambil data tema";
        state.success = false;
        state.isFetched = false;
      })
      //update tema
      .addCase(updateUserTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserTheme.fulfilled, (state, action) => {
        console.log("UPDATED THEME PAYLOAD:", action.payload);
        state.loading = false;
        state.theme = action.payload.theme;
        state.success = true;
        state.isFetched = true;
      })
      .addCase(updateUserTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Gagal update tema";
        state.success = false;
      });
  },
});
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
