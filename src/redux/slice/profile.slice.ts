import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/lib/axios_utils";
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      const data = response.data.profile;
      return {
        displayname: data.display_name,
        bio: data.bio,
        profilePicture: data.profil_picture,
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

interface ProfileState {
  profile: {
    displayname: string;
    bio: string;
    profilePicture: string;
  };
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProfileState = {
  profile: {
    displayname: "",
    bio: "",
    profilePicture: "",
  },
  loading: false,
  error: null,
  success: false,
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
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
