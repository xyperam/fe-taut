import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/lib/axios_utils";
import { profile } from "console";
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      const data = response.data.profile;
      return {
        username: data.username,
        displayname: data.display_name,
        bio: data.bio,
        profilePicture: data.profile_picture,
      };
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (error.response && error.response.data?.error) {
        return rejectWithValue(error.response?.data.error);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (
    { displayname, bio }: { displayname: string; bio: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put("/profile/edit", {
        display_name: displayname,
        bio,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (error.response && error.response.data?.error) {
        return rejectWithValue(error.response?.data.error);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "profile/updateProfilePicture",
  async ({ file }: { file: Blob }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profile_picture", file); // pastikan nama ini cocok dengan backend

      const response = await api.post("/profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (error.response && error.response.data?.error) {
        return rejectWithValue(error.response?.data.error);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

interface ProfileState {
  profile: {
    username: string;
    displayname: string;
    bio: string;
    profilePicture: string;
  };
  loading: boolean;
  error: string | null;
  success: boolean;
  isFetched: boolean;
}

const initialState: ProfileState = {
  profile: {
    username: "",
    displayname: "",
    bio: "",
    profilePicture: "",
  },
  loading: false,
  error: null,
  success: false,
  isFetched: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
        state.isFetched = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.displayname = action.payload.display_name;
        state.profile.bio = action.payload.bio;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.profilePicture =
          action.payload?.profile_picture || state.profile.profilePicture;
        state.success = true;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
