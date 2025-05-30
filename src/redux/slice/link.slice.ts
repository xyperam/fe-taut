import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import api from "@/lib/axios_utils";

export const addLink = createAsyncThunk(
  "profile/addLink",
  async (
    userData: {
      title: string;
      url: string;
      active: boolean;
      platform: string;
      type: string;
    },
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
type EditLinkPayload = {
  id: number;
  title: string;
  platform: string;
  url: string;
  active: boolean;
  type: string;
};

export const editLink = createAsyncThunk<LinkItem, EditLinkPayload>(
  "profile/editLink",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put("profile/link", data);
      return response.data.link;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (error.response && error.response.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Unknown Error");
    }
  }
);

export const deleteLink = createAsyncThunk<number, number>(
  "profile/deleteLink",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`profile/link/${id}`);
      return id;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Unknown Error");
    }
  }
);
export const updateHeaderImage = createAsyncThunk<
  { id: number; header_image_url: string },
  { id: number; file: Blob },
  { rejectValue: string }
>("profile/updateHeaderImage", async ({ id, file }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("header_image_url", file);

    const response = await api.post(
      `/profile/link/${id}/header-image`,
      formData
    );
    return { id, header_image_url: response.data.header_image_url };
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    if (error.response?.data?.error) {
      return rejectWithValue(error.response.data.error);
    }
    return rejectWithValue("Unknown error");
  }
});

export interface LinkItem {
  id: number;
  title: string;
  url: string;
  order?: number;
  active: boolean;
  platform: string;
  type?: string;
  imageUrl?: string;
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
      })
      .addCase(editLink.pending, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = false;
      })
      .addCase(editLink.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLink = action.payload as LinkItem;
        const index = state.links.findIndex(
          (link) => link.id === updatedLink.id
        );
        if (index !== -1) {
          state.links[index] = updatedLink;
        }

        state.success = false;
      })
      .addCase(editLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(deleteLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.loading = false;
        state.links = state.links.filter((link) => link.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(updateHeaderImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHeaderImage.fulfilled, (state, action) => {
        state.loading = false;
        const { id, header_image_url } = action.payload;
        const link = state.links.find((l) => l.id === id);
        if (link) {
          (link as any).imageUrl = header_image_url; // Tambahkan field ke state
        }
      })
      .addCase(updateHeaderImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLink } = linkSlice.actions;
export default linkSlice.reducer;
