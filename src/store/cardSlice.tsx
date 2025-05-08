import { TCardsArray } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CardState = {
    cards: TCardsArray | null;
}
const initialState:CardState = {
    cards: null as TCardsArray | null,
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCardsSlice: (state, action:PayloadAction<TCardsArray>) => {
            state.cards = action.payload;
        },
    },
});

export const {setCardsSlice} = cardSlice.actions;
export default cardSlice.reducer;