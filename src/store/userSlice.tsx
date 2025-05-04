import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCards, TUsers } from "@/Types";

interface UserState {
    user : TUsers | null;
    isLoggedIn: boolean;
    likedCards: Array<TCards>;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
    likedCards: []
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
        },
        addCard(state, action:PayloadAction<TCards>){
            state.likedCards.push(action.payload);
        }
    }
});

export const {setUser, clearUser, addCard} = userSlice.actions;
export default userSlice.reducer;