import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUsers } from "@/Types";

interface UserState {
    user : TUsers | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(state, action:PayloadAction<TUsers>){
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        clearUser(state){
            state.isLoggedIn = false;
            state.user = null;
        }
    }
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;