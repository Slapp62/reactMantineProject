import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBusinessWithUser, TJobseekerWithUser } from '@/Types';

interface UserState {
  user: TJobseekerWithUser | TBusinessWithUser | null;
  allUsers: TJobseekerWithUser[] | TBusinessWithUser[] | null;
  isLoggedIn: boolean;
  isAdminView: boolean;
}

const initialState: UserState = {
  user: null as TJobseekerWithUser | TBusinessWithUser | null,
  allUsers: null as TJobseekerWithUser[] | TBusinessWithUser[] | null,
  isLoggedIn: false,
  isAdminView: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TJobseekerWithUser | TBusinessWithUser>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setAllUsers(state, action: PayloadAction<TJobseekerWithUser[] | TBusinessWithUser[]>) {
      state.allUsers = action.payload;
    },
    updateUser(state, action: PayloadAction<TJobseekerWithUser | TBusinessWithUser>) {
      if (state.allUsers) {
        const index = state.allUsers.findIndex((user) => user.profileData._id === action.payload.userData._id);
        if (index !== -1) {
          state.allUsers[index] = action.payload;
        }
      }
    },
    clearUser(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    removeUser(state, action: PayloadAction<string>) {
      if (state.allUsers) {
        state.allUsers = state.allUsers.filter((user) => user.userData._id !== action.payload);
      }
    },
    toggleAdminView(state, action: PayloadAction<boolean>) {
      state.isAdminView = action.payload;
    },
    toggleFavorites(state, action: PayloadAction<string>){
      const jobseeker = state.user as TJobseekerWithUser;
      const favorites = jobseeker.profileData.favorites;
      const listingId = action.payload;

      if (favorites?.includes(listingId)){        
        jobseeker.profileData.favorites = favorites.filter((id) => id !== listingId)
      } else {
        favorites?.push(listingId);
      }
      
    }
  },
});

export const { setUser, setAllUsers, updateUser, clearUser, removeUser, toggleAdminView, toggleFavorites } =
  userSlice.actions;
export default userSlice.reducer;
