import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBusiness } from '@/Types';

interface UserState {
  profile: TBusiness | null;
}

const initialState: UserState = {
  profile: null,
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
  },
});

export const { setBusinessProfile, clearBusinessProfile } = businessSlice.actions;
export default businessSlice.reducer;
