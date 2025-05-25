import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import api from "@/lib/axios_utils";

export const addLink = createAsyncThunk(
  "profile/addLink",
  async (
    userData: { title: string; url: string; active: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("profile/link", userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Terjadi kesalahan"
        );
      }
    }
    return rejectWithValue("Unknown error");
  }
);

export const getLinks = createAsyncThunk(
  "profile/getLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("profile/links");
      const data = response.data;
      const links = [...data.social_media, ...data.websites];
      return links;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (error.response && error.response.data?.error) {
        return rejectWithValue(error.response?.data.error);
      }
      return rejectWithValue("Unknown Error");
    }
  }
);

export interface LinkItem {
  id: number;
  title: string;
  url: string;
  order: number;
  active: boolean;
  platform: string;
  type?: string;
}

interface LinkState {
  links: LinkItem[]; // ← array!
  loading: boolean;
  error: string | null;
  success: boolean;
  isFetched: boolean;
}

const initialState: LinkState = {
  links: [],
  loading: false,
  error: null,
  success: false,
  isFetched: false,
};

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLink: (state, action) => {
      state.links = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addLink.fulfilled, (state, action) => {
        state.loading = false;
        state.links.push(action.payload);
        state.success = true;
        state.isFetched = true;
      })
      .addCase(addLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(getLinks.pending, (state) => {
        state.loading = false;
        state.error = null;
        state.success = false;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
        state.success = false;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { setLink } = linkSlice.actions;
export default linkSlice.reducer;
