import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@/Types';

interface UserState {
  currentUser: TUser | null;
  isLoggedIn: boolean;
  isAdminView: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  isAdminView: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } =
  authSlice.actions;
export default authSlice.reducer;
