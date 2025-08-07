import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBusiness, TJobListing } from '@/Types';

interface UserState {
  profile: TBusiness | null;
  businessListings: TJobListing[] | null;
}

const initialState: UserState = {
  profile: null,
  businessListings: null,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setBusinessProfile(state, action: PayloadAction<TBusiness>) {
      state.profile = action.payload;
    },
    clearBusinessProfile(state) {
      state.profile = null;
    },
    setBusinessListings(state, action: PayloadAction<TJobListing[]>) {
      state.businessListings = action.payload;
    },
    removeListing: (state, action: PayloadAction<TJobListing>) => {
      if (state.businessListings) {
        state.businessListings = state.businessListings?.filter((listings) => listings._id !== action.payload._id);
      }
    },
  },
});

export const { setBusinessProfile, clearBusinessProfile, setBusinessListings, removeListing } = businessSlice.actions;
export default businessSlice.reducer;
