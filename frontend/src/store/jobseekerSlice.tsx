import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TJobseeker } from '@/Types';

interface UserState {
  profile: TJobseeker | null;
}

const initialState: UserState = {
  profile: null,
};

const jobseekerSlice = createSlice({
  name: 'jobseeker',
  initialState,
  reducers: {
    setJobseekerProfile(state, action: PayloadAction<TJobseeker>) {
      state.profile = action.payload;
    },
    clearJobseekerProfile(state) {
      state.profile = null;
    },
    toggleFavorites(state, action: PayloadAction<string>) {
      const favorites = state.profile?.favorites;
      const listingId = action.payload;

      if (favorites?.includes(listingId) && state.profile) {
        state.profile.favorites = favorites.filter((id) => id !== listingId);
      } else {
        favorites?.push(listingId);
      }
    },
  },
});

export const { toggleFavorites, setJobseekerProfile, clearJobseekerProfile } =
  jobseekerSlice.actions;
export default jobseekerSlice.reducer;
