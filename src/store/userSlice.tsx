import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUsers } from "@/Types";

interface UserState {
    user : TUsers | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null as TUsers | null,
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(state, data:PayloadAction<TUsers>){
            state.isLoggedIn = true;
            state.user = data.payload;
        },
        updateAccountStatus(state, data:PayloadAction<boolean>){
            if(state.user){state.user.isBusiness = data.payload}
        },
        clearUser(state){
            state.isLoggedIn = false;
            state.user = null;
        },
    }
});

export const {setUser, updateAccountStatus, clearUser } = userSlice.actions;
export default userSlice.reducer;