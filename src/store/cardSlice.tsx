import { TCards, TCardsArray } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CardState = {
    cards: TCardsArray | null;
    favoriteCards: TCardsArray | null;
}
const initialState:CardState = {
    cards: null as TCardsArray | null,
    favoriteCards: [],
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCardsSlice: (state, action:PayloadAction<TCardsArray>) => {
            state.cards = action.payload;
        },
        addFavorite: (state, action:PayloadAction<TCards>) => {
            state.favoriteCards?.push(action.payload);
        },
    },
});

export const {setCardsSlice, addFavorite} = cardSlice.actions;
export default cardSlice.reducer;