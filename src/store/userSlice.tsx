import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCards, TUsers } from "@/Types";

interface UserState {
    user : TUsers | null;
    isLoggedIn: boolean;
    likedCards: Array<TCards>;
}

const initialState: UserState = {
    user: null as TUsers | null,
    isLoggedIn: false,
    likedCards: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(state, data:PayloadAction<TUsers>){
            state.isLoggedIn = true;
            state.user = data.payload;
        },
        clearUser(state){
            state.isLoggedIn = false;
            state.user = null;
        },
        addCard(state, data:PayloadAction<TCards>){
            state.likedCards.push(data.payload);
        },
        removeFavorite: (state, data: PayloadAction<TCards>) => {
            state.likedCards = state.likedCards.filter(card => card._id !== data.payload._id)
        }
    }
});

export const {setUser, clearUser, addCard, removeFavorite} = userSlice.actions;
export default userSlice.reducer;