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
        addLike: (state, action:PayloadAction<{card:TCards; userID:string}>) => {
            const {card, userID} = action.payload;

            const thisGlobalCard = state.cards?.find((reduxCard) => reduxCard._id === card._id);
            const alreadyLiked = thisGlobalCard?.likes.includes(userID);
            if (!alreadyLiked) {
                thisGlobalCard?.likes.push(userID);
            }
            console.log('liked pushed to redux');
            

        },
        removeLike: (state, action:PayloadAction<{card:TCards; userID:string}>) => {
            const {card, userID} = action.payload;

            const thisGlobalCard = state.cards?.find((reduxCard) => reduxCard._id === card._id);
            const alreadyLiked = thisGlobalCard?.likes.includes(userID);

            if (alreadyLiked && thisGlobalCard) {
                thisGlobalCard.likes = thisGlobalCard?.likes.filter((likes) => likes !== userID)
            }
        }
    },
});

export const {setCardsSlice, addLike, removeLike} = cardSlice.actions;
export default cardSlice.reducer;