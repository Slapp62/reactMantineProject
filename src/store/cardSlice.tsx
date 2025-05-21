import { TCards, TCardsArray } from "@/Types";
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
        addCard: (state, action:PayloadAction<TCards>) => {
            if (state.cards){
                state.cards.push(action.payload);
            }
        },
        editCard: (state, action:PayloadAction<{card:TCards}>) => {
            const updatedCard = action.payload.card;
            
            if (state.cards) {
                const index = state.cards?.findIndex((reduxCard) => reduxCard._id === updatedCard._id);
                    if (index !== -1){
                        state.cards[index] = updatedCard;
                    }
            }
        },
        removeCard: (state, action:PayloadAction<TCards>) => {
            if (state.cards){
                state.cards = state.cards?.filter((card) => 
                    card._id !== action.payload._id)
            }
        },
        addLike: (state, action:PayloadAction<{card:TCards; userID:string}>) => {
            const {card, userID} = action.payload;
            const thisGlobalCard = state.cards?.find((reduxCard) => reduxCard._id === card._id);

            const alreadyLiked = thisGlobalCard?.likes?.includes(userID);
            if (!alreadyLiked) {
                thisGlobalCard?.likes?.push(userID);
            }            
        },
        removeLike: (state, action:PayloadAction<{card:TCards; userID:string}>) => {
            const {card, userID} = action.payload;

            const thisGlobalCard = state.cards?.find((reduxCard) => reduxCard._id === card._id);
            const alreadyLiked = thisGlobalCard?.likes?.includes(userID);

            if (alreadyLiked && thisGlobalCard) {
                thisGlobalCard.likes = thisGlobalCard?.likes?.filter((likes) => likes !== userID)
            }
        }
    },
});

export const {setCardsSlice, addCard, editCard, removeCard, addLike, removeLike} = cardSlice.actions;
export default cardSlice.reducer;